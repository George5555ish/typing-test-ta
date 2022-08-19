import React from "react";
import { DESKTOP_SCREEN_WIDTH } from "../../../../../constants";
import {SingleWordFragmentInterface} from "../../../../../interfaces";
function SingleWordFragment({
  currentWordObject,
  word,
  isCurrentWordInTypedWords,
  widthFromWindow,
  isCurrentTypedWordIncorrect,
  key
}:SingleWordFragmentInterface) {
  return (
    <p
      key={key}
      style={{
        color:
          currentWordObject.word === word
            ? "#fff"
            : isCurrentWordInTypedWords
            ? isCurrentWordInTypedWords.isTypedWordCorrect
              ? "#0B1846"
              : "crimson"
            : "#bbb",
        backgroundColor:
          currentWordObject.word === word
            ? isCurrentTypedWordIncorrect
              ? "red"
              : "#0B1846"
            : "",
        fontSize: widthFromWindow >= DESKTOP_SCREEN_WIDTH ? "1.3rem" : "1rem",
      }}
    >
      {word}
    </p>
  );
}

export default SingleWordFragment;
