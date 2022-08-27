import React from "react";
import { DESKTOP_SCREEN_WIDTH } from "../../../../../../constants";
import {SingleWordFragmentInterface} from "../../../../../../interfaces";
import EditingStateFragment from "./fragments/EditingStateFragment";
function SingleWordFragment({
  currentWordObject,
  word,
  childKey,
  currentRenderedDivIndex,
  setCurrentWordIndex,
  isCurrentWordInTypedWords,
  widthFromWindow,
  isCurrentTypedWordIncorrect
}:SingleWordFragmentInterface) {


  return (
  
     <p
     onClick={() => setCurrentWordIndex(childKey,currentWordObject,currentRenderedDivIndex)}
      key={childKey}
      style={{
        maxHeight: "25px",
        cursor: "pointer",
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
