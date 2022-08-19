import React from "react";
import Image from "next/image";
import styles from "../../../../styles/component-styles/TypingContainer.module.css";
import { TypingContainerInterface } from "../../../../interfaces";
import refreshIcon from "../../../../public/assets/refresh.svg";
import { DESKTOP_SCREEN_WIDTH } from "../../../../constants";
import EditableTextAreaFragment from "./fragments/EditableTextAreaFragment";
import InputTextFragment from "./fragments/InputTextFragment";
import TimeOptionsButton from "../../fragments/TimeOptionsButton";
import SingleWordFragment from "./fragments/SingleWordFragment";
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
  updateUsergeneratedTextHandler,
  updateWordFtn,
  currentTime,
}: TypingContainerInterface) {
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
                    return (
                      <SingleWordFragment
                        key={key}
                        word={word}
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
