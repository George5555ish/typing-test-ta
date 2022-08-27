import React, { useState } from "react";
import Image from "next/image";
import styles from "../../../../styles/component-styles/TypingContainer.module.css";
import { TypingContainerInterface } from "../../../../interfaces";
import refreshIcon from "../../../../public/assets/refresh.svg";
import { DESKTOP_SCREEN_WIDTH } from "../../../../constants";
import EditableTextAreaFragment from "./fragments/EditableTextAreaFragment";
import InputTextFragment from "./fragments/InputTextFragment";
import TimeOptionsButton from "../../fragments/TimeOptionsButton";
import SingleWordFragment from "./fragments/SingleWordFragment";
import {
  sendNotificationToastMessage,
  unChunkCurrentWords,
} from "../../../../helpers";
import EditingStateFragment from "./fragments/SingleWordFragment/fragments/EditingStateFragment";
function TypingContainer({
  divScrollValue,
  words,
  currentWordObject,
  isCurrentTabUserGenerated,
  isCurrentTypedWordIncorrect,
  widthFromWindow,
  isTextGeneratedByUserCorrect,
  userGeneratedText,
  textBoxErrorMsg,
  isInputDisabled,
  inputValue,
  handleOnChange,
  resetTimerHandler,
  allTypedWords,
  setAllTypedWords,
  updateUsergeneratedTextHandler,
  updateWordFtn,
  currentTime,
}: TypingContainerInterface) {
  const [indexOfCurrentWord, setIndexOfCurrentWord] = useState(0);
  const [divIndexOfCurrentWord, setDivIndexOfCurrentWord] = useState(0);
  const [isAwordCurrentlyEdited, setIsAwordCurrentlyEdited] = useState(false);

  const setCurrentWordIndex = (
    key: number,
    currentWordObject: {
      word: string;
      currentDiv: number;
    },
    divIndex: number
  ) => {
    console.log(words);

    const isClickedWordTyped = allTypedWords.filter(
      (word) => word.currentDiv === divIndex && word.noOfTypedWords === key
    );
    if (isClickedWordTyped.length === 0) {
      sendNotificationToastMessage("Word not typed yet");
      return;
    }
    const isTypedWordCorrect =
      words[divIndex][key] === isClickedWordTyped[0].word;
    if (isTypedWordCorrect) {
      sendNotificationToastMessage("Word already typed correctly!");
      return;
    }
    setIndexOfCurrentWord(key);
    setIsAwordCurrentlyEdited(true);
    setDivIndexOfCurrentWord(divIndex);
  };

  const cancelWordEditFtn = () => {
    setIndexOfCurrentWord(0);
    setIsAwordCurrentlyEdited(false);
    setDivIndexOfCurrentWord(0);
  };

  const saveNewWordFtn = (
    newTypedWord: string,
    isCurrentWordInTypedWords:
      | {
          word: string;
          isTypedWordCorrect: boolean;
          currentDiv: number;
          noOfTypedWords: number;
        }
      | undefined
  ) => {
    
    const newAllTypedWordsArray = allTypedWords.map((typedWord) => {
      if (
        isCurrentWordInTypedWords?.currentDiv === typedWord.currentDiv &&
        isCurrentWordInTypedWords.noOfTypedWords === typedWord.noOfTypedWords
      ) {
        console.log( words[isCurrentWordInTypedWords.currentDiv][
          isCurrentWordInTypedWords.noOfTypedWords
        ] === typedWord.word)
        console.log( words[isCurrentWordInTypedWords.currentDiv][
          isCurrentWordInTypedWords.noOfTypedWords
        ])
        console.log(  typedWord.word)
        return {
          ...typedWord,
          isTypedWordCorrect:
            words[isCurrentWordInTypedWords.currentDiv][
              isCurrentWordInTypedWords.noOfTypedWords
            ] === newTypedWord,
          word: newTypedWord,
        };
      }
      return typedWord;
    });
    setAllTypedWords(newAllTypedWordsArray)
    cancelWordEditFtn()
  };
  return (
    <div className={styles.typingContainer}>
      <div>
        <h3>Default Text</h3>
      </div>
      <div className={styles.generatedTextContainer}>
        {!isCurrentTabUserGenerated ? (
          <div
            className={styles.genText}
            style={{ transform: `translateY(${divScrollValue}px)` }}
          >
            {words.map((wordArray, index) => {
              return (
                <div key={index} className={styles.singleDivGenText}>
                  {wordArray.map((word, key) => {
                    const isCurrentWordInTypedWords = allTypedWords.find(
                      (wordObject) =>
                        wordObject.currentDiv === index &&
                        wordObject.noOfTypedWords === key
                    );
                    // console.log(isCurrentWordInTypedWords)
                    return key === indexOfCurrentWord &&
                      isAwordCurrentlyEdited &&
                      index === divIndexOfCurrentWord ? (
                      <EditingStateFragment
                        cancelWordEditFtn={cancelWordEditFtn}
                        saveNewWordFtn={saveNewWordFtn}
                        isCurrentWordInTypedWords={isCurrentWordInTypedWords}
                      />
                    ) : (
                      <SingleWordFragment
                        key={key}
                        childKey={key}
                        word={word}
                        currentRenderedDivIndex={index}
                        setCurrentWordIndex={setCurrentWordIndex}
                        isCurrentWordInTypedWords={isCurrentWordInTypedWords}
                        widthFromWindow={widthFromWindow}
                        isCurrentTypedWordIncorrect={
                          isCurrentTypedWordIncorrect
                        }
                        currentWordObject={currentWordObject}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        ) : (
          <div className={styles.userGeneratedDiv}>
            <EditableTextAreaFragment
              isTextGeneratedByUserCorrect={isTextGeneratedByUserCorrect}
              userGeneratedText={userGeneratedText}
              updateWordFtn={updateWordFtn}
            />
            <p onClick={() => updateUsergeneratedTextHandler()}>Save</p>
            {!isTextGeneratedByUserCorrect && <span>{textBoxErrorMsg}</span>}
          </div>
        )}
      </div>
      <p>Start typing to start the timer</p>
      <div className={styles.textBoxContainer}>
        <InputTextFragment
          isInputDisabled={isInputDisabled}
          inputValue={inputValue}
          handleOnChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleOnChange(e)
          }
        />

        <div className={styles.resultsContainer}>
          <TimeOptionsButton
            className={styles.refreshIcon}
            onClickHandler={() => resetTimerHandler()}
            label={<Image src={refreshIcon} alt="refreshIcon" />}
          />
          <TimeOptionsButton
            className={styles.timeBox}
            label={currentTime}
            onClickHandler={() => {}}
          />
        </div>
      </div>
    </div>
  );
}

export default TypingContainer;
