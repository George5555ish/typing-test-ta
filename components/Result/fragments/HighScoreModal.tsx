import React, {useState, useEffect} from "react";
import Image from "next/image"
import { HighScoreModalInterace } from "../../../interfaces";
import HighScoreImage from "../../../public/assets/highscoreanimation.gif"
import styles from "../../../styles/fragment-styles/HighScoreModalFragment.module.css";
import TimeOptionsButton from "../../TestBlock/fragments/TimeOptionsButton";
function HighScoreModal({
  typingSpeed,
  setIsNewHighScore,
}: HighScoreModalInterace) {

  const [isPageHydrated, setIsPageHydrated] = useState(false)

  useEffect(() => {
    if (!isPageHydrated){
      setIsPageHydrated(true)
    }
  },[isPageHydrated])
  return (
    <div className={styles.highScoreModalContainer}>
      <div className={styles.highScoreModalCard}>
        <Image src={HighScoreImage} alt="highscoreimage" width="200px" height="200px" />
        <h2>New High Score!</h2>
        <h3>{typingSpeed} WPM (words per minute )</h3>
        <TimeOptionsButton
          label={"Close"}
          className={styles.resultbutton}
          onClickHandler={() => setIsNewHighScore(false)}
          style={{
            background: "rgb(106, 77, 120)",
            boxShadow: "1px 1px 7px 5px rgb(66, 66, 93)",
            padding: "10px",
            color: "#fff",
            borderRadius: "10px",
            fontFamily:"Verdana",
            cursor: "pointer"
          }}
        />
      </div>
    </div>
  );
}

export default HighScoreModal;
