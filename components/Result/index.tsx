import React, { useEffect, useState } from "react";
import styles from "../../styles/Result.module.css";
import Image from "next/image";
import success from "../../public/assets/success.svg";
import { useRouter } from "next/router";
import TimeOptionsButton from "../TestBlock/fragments/TimeOptionsButton";
import Cookie from "js-cookie";
import { COOKIE_HIGH_SCORE } from "../../constants";
import HighScoreModal from "./fragments/HighScoreModal";
function Result() {
  const router = useRouter();

  const wordsPerMinuteArray = router.query.wordsPerMinuteArray as string;
  const cwpm = router.query.cwpm as string;
  const totalWords = router.query.totalWords as string;
  const incorrectLetters = router.query.incorrectletters as string;
  const [isNewHighScore, setIsNewHighScore] = useState(false);
  const [accuracyPercentage, setAccuracyPercentage] = React.useState(0);
  const [typingSpeed, setTypingSpeed] = React.useState(0);
  const [incorrectLettersFromParams, setIncorrectLettersFromParams] =
    useState("");
  // useEffect(() => {
  //   if (wordsPerMinuteArray !== undefined && totalWords !== undefined) {
  //     const wpmArray = JSON.parse(wordsPerMinuteArray) as number[];
  //     const averageOfNumbersInwpmArray =
  //       wpmArray.reduce((a, b) => a + b, 0) / wpmArray.length;
  //     setAccuracyPercentage(
  //       Math.round((parseInt(cwpm) / parseInt(totalWords)) * 100)
  //     );
  //     setTypingSpeed(Math.round(averageOfNumbersInwpmArray));

  //     // Set High Score
  //     const highScore = Cookie.get(COOKIE_HIGH_SCORE);
  //     if (!highScore) {
  //       setIsNewHighScore(true);
  //       Cookie.set(
  //         COOKIE_HIGH_SCORE,
  //         `${Math.round(averageOfNumbersInwpmArray)}`
  //       );
  //     } else {
  //       if (parseInt(highScore) < Math.round(averageOfNumbersInwpmArray)) {
  //         // Set new high score
  //         // console.log('new high score')
  //         setIsNewHighScore(true);
  //         Cookie.set(
  //           COOKIE_HIGH_SCORE,
  //           `${Math.round(averageOfNumbersInwpmArray)}`
  //         );
  //       } else {
  //         // console.log('no new high score')
  //         // console.log(parseInt(highScore))
  //         // console.log(Math.round(averageOfNumbersInwpmArray))
  //         setIsNewHighScore(false);
  //       }
  //     }
  //   }

  //   if (incorrectLetters !== undefined){
  //     // console.log(incorrectLetters)
  //     setIncorrectLettersFromParams(incorrectLetters)
  //   }
  // }, [cwpm, incorrectLetters, totalWords, wordsPerMinuteArray,isNewHighScore]);

  useEffect(() => {
    if (localStorage) {
      if (wordsPerMinuteArray !== undefined && totalWords !== undefined) {
        const wpmArray = JSON.parse(wordsPerMinuteArray) as number[];
        const averageOfNumbersInwpmArray =
          wpmArray.reduce((a, b) => a + b, 0) / wpmArray.length;
        setAccuracyPercentage(
          Math.round((parseInt(cwpm) / parseInt(totalWords)) * 100)
        );
        setTypingSpeed(Math.round(averageOfNumbersInwpmArray));

        // Set High Score
        const highScore = localStorage.getItem(COOKIE_HIGH_SCORE);
        if (!highScore) {
          setIsNewHighScore(true);
        } else {
          if (parseInt(highScore) <= Math.round(averageOfNumbersInwpmArray)) {
            console.log("high score exists but is less");
            console.log(parseInt(highScore));
            console.log(Math.round(averageOfNumbersInwpmArray));
            setIsNewHighScore(true);
          } else {
            setIsNewHighScore(false);
            console.log("high score exists but is more, so no modal");
            console.log(parseInt(highScore));
            console.log(Math.round(averageOfNumbersInwpmArray));
          }
        }
        localStorage.setItem(
          COOKIE_HIGH_SCORE,
          `${Math.round(averageOfNumbersInwpmArray)}`
        );
      }
    }
    if (incorrectLetters !== undefined) {
      // console.log(incorrectLetters)
      setIncorrectLettersFromParams(incorrectLetters);
    }
  }, [cwpm, incorrectLetters, totalWords, wordsPerMinuteArray]);
  return (
    <>
      {isNewHighScore && (
        <HighScoreModal
          typingSpeed={typingSpeed}
          setIsNewHighScore={setIsNewHighScore}
        />
      )}
      <div className={styles.resultContainer}>
        <Image src={success} alt="success" width={100} height={100} />
        <h1>Success</h1>
        <div className={styles.resultBlock}>
          <h2>Accuracy</h2>
          <span></span>
          <p>{accuracyPercentage}%</p>
        </div>
        <div>
          <h2>Typing Speed</h2>
          <p>{typingSpeed} WPM</p>
        </div>

        <div>
          <h2>No Of Points:</h2>
          <p>
            {cwpm} correct words out of {parseInt(totalWords)} total words{" "}
          </p>
        </div>
        <div>
          <h2>Top 3 Incorrect letters</h2>
          <p>
            {incorrectLettersFromParams === ""
              ? "No incorrect letters. Good Job!"
              : `The letters ${incorrectLettersFromParams.split("").join(",")}`}
          </p>
        </div>
        <div className={styles.resultBlock}>
          <TimeOptionsButton
            label={"Take the test again"}
            className={styles.resultbutton}
            onClickHandler={() => router.push("/")}
          />
        </div>
      </div>
    </>
  );
}

export default Result;
