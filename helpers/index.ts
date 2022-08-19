import {
  DESKTOP_SCREEN_WIDTH,
  TABLET_SCREEN_WIDTH,
  MOBILE_SCREEN_WIDTH,
} from "../constants";

export const getNumberOfWordsOnDiv = (widthFromWindow: number) => {
  if (widthFromWindow >= DESKTOP_SCREEN_WIDTH) {
    return 8;
  } else if (
    widthFromWindow < DESKTOP_SCREEN_WIDTH &&
    widthFromWindow >= TABLET_SCREEN_WIDTH
  ) {
    return 6;
  } else if (
    widthFromWindow < TABLET_SCREEN_WIDTH &&
    widthFromWindow >= MOBILE_SCREEN_WIDTH
  ) {
    return 5;
  } else if (widthFromWindow < MOBILE_SCREEN_WIDTH) {
    return 3;
  } else {
    return 0;
  }
};

export const getChunkedWords = (
  widthFromWindow: number,
  textToDivide: string
): string[][] => {
  const numberOfWords = getNumberOfWordsOnDiv(widthFromWindow);
  const words = textToDivide.split("|");
  const chunkedWords = [];
  let singleChunk = [];
  const newWords = [...words];
  if (numberOfWords > newWords.length) return [words];
  while (newWords.length >= numberOfWords) {
    for (var i = 0; i < numberOfWords; i++) {
      singleChunk.push(newWords[0]);
      newWords.shift();
    }
    chunkedWords.push(singleChunk);
    singleChunk = [];
  }
  const remainingWords = newWords.splice(0);
  if (remainingWords.length > 0) chunkedWords.push(remainingWords);

  return chunkedWords;
};

export const convertTimeInSecondsToClockTime = (seconds: number) =>{
   const minutes = Math.floor(seconds / 60); // get minutes 
  const remainingSeconds = Math.floor(seconds % 60); // get remaining seconds
   

  return `${minutes === 0 ? "00" :minutes < 10 ? "0" + minutes :minutes }:${remainingSeconds === 0 ? "00" : remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds}`;
}

export const validateUserGeneratedTextWithSpecialCharacters = (text: string) => {
  const regex = /[@_=+*]/;
  return regex.test(text);
}