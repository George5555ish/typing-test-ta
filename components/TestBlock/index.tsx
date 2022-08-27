import type { GetStaticProps, NextPage } from "next";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  DESKTOP_SCREEN_WIDTH,
  USE_DEFAULT_GENERATED_TEXT,
  USE_USER_GENERATED_TEXT,
} from "../../constants";
import {
  getNumberOfWordsOnDiv,
  getChunkedWords,
  convertTimeInSecondsToClockTime,
  validateUserGeneratedTextWithSpecialCharacters,
  getIncorrectLettersFromTypedWords,
} from "../../helpers";
import { useWindowSize } from "../../hooks/getWindowDimensions";
import useInterval from "../../hooks/useInterval";
import refreshIcon from "../../public/assets/refresh.svg";
import styles from "../../styles/TestBlock.module.css";
import { defaultText } from "../../utils/default-text";
import TabButton from "./fragments/TabButton";
import SettingsContainer from "./components/SettingsContainer";
import TypingContainer from "./components/TypingContainer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const TestBlock: NextPage = () => {
  // #############################################################################
  // #############################################################################
  // ############################# USE STATES ####################################
  // #############################################################################
  // #############################################################################

  const [currentTimeInSeconds, setCurrentTimeInSeconds] = useState(60);
  const [currentTime, setCurrentTime] = useState(
    convertTimeInSecondsToClockTime(currentTimeInSeconds)
  );
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const [noOfWordsTypedOnCurrentDiv, setNoOfWordsTypedOnCurrentDiv] =
    useState(0);
  const [noOfWordsByScreenSize, setNoOfWordsByScreenSize] = useState(0);
  const [divScrollValue, setDivScrollValue] = useState(0);
  const [divScrollFactor, setDivScrollFactor] = useState(0.012);
  const [words, setWords] = useState<string[][]>([]);
  const [stringedWords, setStringedWords] = useState<string>("");
  const [isCustomTimerEnabled, setIsCustomTimerEnabled] = useState(false);
  const [customTimer, setCustomTimer] = useState(6);
  const [isCurrentTabUserGenerated, setIsCurrentTabUserGenerated] = useState(false);
  const [isCurrentTypedWordIncorrect, setIsCurrentTypedWordIncorrect] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [switchWordsToUserGenText, setSwitchWordsToUserGenText] = useState(false);
  const [userGeneratedText, setUserGeneratedText] = useState("");
  const [textBoxErrorMsg, setTextBoxErrorMsg] = useState("");
  const [currentWordObject, setCurrentWordObject] = useState<{
    word: string;
    currentDiv: number;
  }>({ word: "", currentDiv: 0 });
  const [sixtySecondCountdown, setSixtySecondCountdown] = useState(0);
  const [wordsTypedPerMinute, setWordsTypedPerMinute] = useState(0);
  const [correctWordsTypedPerMinute, setCorrectWordsTypedPerMinute] = useState(0);
  const [wordsPerMinuteArray, setWordsPerMinuteArray] = useState<number[]>([]);
  const [startTimer, setStartTimer] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [allTypedWords, setAllTypedWords] = useState<
    {
      word: string;
      isTypedWordCorrect: boolean;
      currentDiv: number;
      noOfTypedWords: number;
    }[]
  >([]);
  const [isTextGeneratedByUserCorrect, setIsTextGeneratedByUserCorrect] =
    useState(true);

  // #############################################################################
  // #############################################################################
  // ############################# HOOKS #########################################
  // #############################################################################
  // #############################################################################

  const { width: widthFromWindow } = useWindowSize();
  const router = useRouter();

  // ##############################################################################
  // ##############################################################################
  // ############################# USE EFFECTS ####################################
  // ##############################################################################
  // ##############################################################################

  useEffect(() => {
    const allWords = allTypedWords.map((word) => word.word);
    const unchunkedWords = [];
    words.forEach((wordArr) => {
      unchunkedWords.push(...wordArr);
    });
    if (allWords.length === unchunkedWords.length) {
      // console.log(allTypedWords.length);
      // console.log(words.length);
      // console.log(allTypedWords);
      // console.log(words);
      setIsTimerRunning(false);
      if (allTypedWords.length > 0) {
        router.push(
          `/result?wordsPerMinuteArray=${JSON.stringify([
            ...wordsPerMinuteArray,
            wordsTypedPerMinute,
          ])}&cwpm=${correctWordsTypedPerMinute}&totalWords=${
            stringedWords.split("|").length
          }`
        );
      }
    }
  }, [
    allTypedWords,
    correctWordsTypedPerMinute,
    router,
    stringedWords,
    words,
    words.length,
    wordsPerMinuteArray,
    wordsTypedPerMinute,
  ]);
  useEffect(() => {
    const paragraphToType = switchWordsToUserGenText
      ? userGeneratedText
          .split(" ")
          .filter((x) => x !== "")
          .join("|")
      : defaultText;
    const isTextValid =
      validateUserGeneratedTextWithSpecialCharacters(userGeneratedText);

    if (isTextValid && userGeneratedText !== "") {
      setIsTextGeneratedByUserCorrect(false);
      setTextBoxErrorMsg("Special characters are not allowed (@ _ = + *)");
      return;
    }
    const chunkedArray = getChunkedWords(widthFromWindow, paragraphToType);
    const NO_OF_WORDS = getNumberOfWordsOnDiv(widthFromWindow);
    setStringedWords(paragraphToType);
    setWords([...chunkedArray]);
    setNoOfWordsByScreenSize(NO_OF_WORDS);
  }, [switchWordsToUserGenText, userGeneratedText, widthFromWindow]);

  useEffect(() => {
    const newTime = convertTimeInSecondsToClockTime(currentTimeInSeconds);
    setCurrentTime(newTime);
  }, [currentTimeInSeconds]);
  useEffect(() => {

    const createLocalStorageHighScore = () => {
      if (localStorage) {
        const highScore =  localStorage.getItem('wpm'); 
    
        if (highScore == undefined){
              localStorage.setItem('wpm','0');
              localStorage.setItem('newHighScore', 'true')
        }  
      }  
    }
    createLocalStorageHighScore()
  }, []);
  
  useEffect(() => {
    const paragraphToType = switchWordsToUserGenText
      ? userGeneratedText
          .split(" ")
          .filter((x) => x !== "")
          .join("|")
      : defaultText;
    const isTextValid =
      validateUserGeneratedTextWithSpecialCharacters(userGeneratedText);

    if (isTextValid && userGeneratedText !== "") {
      setIsTextGeneratedByUserCorrect(false);
      return;
    }
    const chunkedArray = getChunkedWords(widthFromWindow, paragraphToType);
    const firstWord = chunkedArray[0][0];
    setCurrentWordObject({ word: firstWord, currentDiv: 0 });
    setWords([...chunkedArray]);
    setStringedWords(paragraphToType);
  }, [
    switchWordsToUserGenText,
    userGeneratedText,
    widthFromWindow,
    isTimerRunning,
  ]);

  // #############################################################################
  // #############################################################################
  // ############################# HELPER FUNCTIONS ##############################
  // #############################################################################
  // #############################################################################

  const updateCountdownTimer = () => {
    setCurrentTimeInSeconds((prevTime) => prevTime - 1);
    const newTime = convertTimeInSecondsToClockTime(currentTimeInSeconds);
    setCurrentTime(newTime);
    setSixtySecondCountdown((prevCountdown) => prevCountdown + 1);
    if (sixtySecondCountdown + 1 === 60) {
      setSixtySecondCountdown(0);
      setWordsPerMinuteArray((prevArray) => [
        ...prevArray,
        wordsTypedPerMinute,
      ]);
    }
    if (currentTimeInSeconds < 1) {
      setStartTimer(false);

      const incorrectLetters = getIncorrectLettersFromTypedWords(allTypedWords)
      router.push(
        `/result?wordsPerMinuteArray=${JSON.stringify([
          ...wordsPerMinuteArray,
          wordsTypedPerMinute,
        ])}&cwpm=${correctWordsTypedPerMinute}&totalWords=${
          stringedWords.split("|").length
        }&incorrectletters=${incorrectLetters}`
      );
    }
  };
  useInterval(updateCountdownTimer, startTimer, 1000);
  const moveToNextDiv = () => {
    const nextWord = words[currentWordObject.currentDiv + 1][0];
    setCurrentWordObject({
      ...currentWordObject,
      word: nextWord,
      currentDiv: currentWordObject.currentDiv + 1,
    });
    setNoOfWordsTypedOnCurrentDiv(0);
  };
  const moveToNextWord = () => {
    const nextWord =
      words[currentWordObject.currentDiv][noOfWordsTypedOnCurrentDiv + 1];
    setCurrentWordObject({ ...currentWordObject, word: nextWord });
  };
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const isLastWordOfValueAnEmptyString = value.split(" ").pop() === "";
    if (!startTimer) {
      setStartTimer(true);
      setIsTimerRunning(true);
    }
    if (isLastWordOfValueAnEmptyString && value.length >= 1) {
      // we reset the input
      setInputValue("");
      const isTypedWordCorrect = currentWordObject.word === value.trim();
      if (isTypedWordCorrect) {
        // to measure accuracy
        setWordsTypedPerMinute((prevWordsTyped) => prevWordsTyped + 1);
        setCorrectWordsTypedPerMinute(
          (prevCorrectWordsTyped) => prevCorrectWordsTyped + 1
        );
      } else {
        setWordsTypedPerMinute((prevWordsTyped) => prevWordsTyped + 1);
      }
      setAllTypedWords([
        ...allTypedWords,
        {
          word: value.trim(),
          isTypedWordCorrect,
          currentDiv: currentWordObject.currentDiv,
          noOfTypedWords: noOfWordsTypedOnCurrentDiv,
        },
      ]);
      setNoOfWordsTypedOnCurrentDiv(noOfWordsTypedOnCurrentDiv + 1);
      if (noOfWordsTypedOnCurrentDiv + 1 == noOfWordsByScreenSize) {
        // scroll to the next div or next line (in px)
        setDivScrollValue((currentWordObject.currentDiv + 1) * -50);
        setDivScrollFactor((prevFactor) => prevFactor + 0.012);
        // update currentDiv
        moveToNextDiv();
      } else {
        moveToNextWord();
      }

      return;
    }
    const isTypedValueInCurrentWord = currentWordObject.word.includes(value);
    setInputValue(value);
    if (isTypedValueInCurrentWord) {
      setIsCurrentTypedWordIncorrect(false);
    } else {
      setIsCurrentTypedWordIncorrect(true);
    }
  };

  const updateUsergeneratedText = () => {
    if (userGeneratedText.length < noOfWordsByScreenSize * 4) {
      setIsTextGeneratedByUserCorrect(false);
      setSwitchWordsToUserGenText(false);
      setTextBoxErrorMsg(
        "Sentence should be at least " + noOfWordsByScreenSize * 4 + " words"
      );
      return;
    } else {
      setTextBoxErrorMsg("");
      setSwitchWordsToUserGenText(true);
      switchTabs(USE_DEFAULT_GENERATED_TEXT);
    }
  };

  const switchTabs = (tabtoSwitchTo: string) => {
    if (tabtoSwitchTo === USE_DEFAULT_GENERATED_TEXT) {
      setIsCurrentTabUserGenerated(false);
    } else if (tabtoSwitchTo === USE_USER_GENERATED_TEXT) {
      setIsCurrentTabUserGenerated(true);
    }
  };
  const handleSaveTimeSettings = () => {
    setIsInputDisabled(false);
    setCurrentTimeInSeconds(customTimer * 60);
  };

  const resetTimer = () => {
    setStartTimer(false);
    setIsTimerRunning(false);
    setCurrentTimeInSeconds(60);
    setAllTypedWords([]);
    setDivScrollValue(0);
    setNoOfWordsTypedOnCurrentDiv(0);
  };

  const updateWordFtn = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserGeneratedText(e.target.value);
    setIsTextGeneratedByUserCorrect(true);
  };
  return (
    <div className={styles.testContainer}>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <SettingsContainer
        switchTabs={switchTabs}
        isCustomTimerEnabled={isCustomTimerEnabled}
        isInputDisabled={isInputDisabled}
        currentTimeInSeconds={currentTimeInSeconds}
        isCurrentTabUserGenerated={isCurrentTabUserGenerated}
        isTimerRunning={isTimerRunning}
        customTimer={customTimer}
        defaultTimeHandler={(seconds: number) => {
          setIsInputDisabled(false);
          setCurrentTimeInSeconds(seconds);
          setIsCustomTimerEnabled(false);
        }}
        customTimeHandler={() => {
          setCurrentTimeInSeconds(0);
          setIsInputDisabled(true);
          setIsCustomTimerEnabled(!isCustomTimerEnabled);
        }}
        handleSliderInput={(e) => {
          const target = e.target as HTMLInputElement;
          setCustomTimer(parseInt(target.value));
        }}
        saveHandler={() => handleSaveTimeSettings()}
      />

      <TypingContainer
        divScrollValue={divScrollValue}
        words={words}
        allTypedWords={allTypedWords}
        setAllTypedWords={setAllTypedWords}
        currentWordObject={currentWordObject}
        isCurrentTabUserGenerated={isCurrentTabUserGenerated}
        isCurrentTypedWordIncorrect={isCurrentTypedWordIncorrect}
        widthFromWindow={widthFromWindow}
        isTextGeneratedByUserCorrect={isTextGeneratedByUserCorrect}
        userGeneratedText={userGeneratedText}
        textBoxErrorMsg={textBoxErrorMsg}
        isInputDisabled={isInputDisabled}
        inputValue={inputValue}
        currentTimeInSeconds={currentTimeInSeconds}
        customTimer={customTimer}
        isCustomTimerEnabled={isCustomTimerEnabled}
        handleOnChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
          handleOnChange(e);
        }}
        resetTimerHandler={() => resetTimer()}
        updateUsergeneratedTextHandler={() => updateUsergeneratedText()}
        updateWordFtn={updateWordFtn}
        currentTime={currentTime}
      />
    </div>
  );
};

export default TestBlock;
