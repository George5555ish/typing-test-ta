import { toast } from "react-toastify";
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

export const sendNotificationToastMessage = (msg: string) => {
   toast(msg);
}

export const unChunkCurrentWords = (chunkedWords: string[][]): string[] => {
  const unChunkedWords: string[] = [];

  chunkedWords.forEach((chunkedWord) => {
    chunkedWord.forEach((word) => {
      unChunkedWords.push(word)
    })
  })
  return unChunkedWords
}

export const  getMaxOccurringChar =(str: string) =>
{
  let ASCII_SIZE = 256;
    // Create hash map to keep the count of individual
    // characters and initialize each as 0
    let count = new Array(ASCII_SIZE);
    if(str.length < 2) return str;
    for (let i = 0; i < ASCII_SIZE; i++)
    {
        count[i] = 0;
    }
 
    // Construct character count array from the input
    // string.
    let len = str.length;
    for (let i = 0; i < len; i++)
    {
        count[str[i].charCodeAt(0)] += 1;
    }
  
    let max = -1;   // Initialize max count
    let result = ' ';   // Initialize result
     
    // Traversing through the string and maintaining
    // the count of each character
    for (let i = 0; i < len; i++)
    {
        if (max < count[str[i].charCodeAt(0)])
        {
            max = count[str[i].charCodeAt(0)];
            result = str[i];
        }
    }
    return result;
}

export const getIncorrectLettersFromTypedWords = (chunkedWords: {
  word: string;
  isTypedWordCorrect: boolean;
  currentDiv: number;
  noOfTypedWords: number;
}[]): string => {
  let stringifiedWords = '';
  let incorrectLetters = '';
  const incorrectWords = chunkedWords.filter(word => word.isTypedWordCorrect === false);
  incorrectWords.forEach((incorrectWord) => {
    stringifiedWords = stringifiedWords + incorrectWord.word;
  })

  stringifiedWords = stringifiedWords.split('').sort().join('');
  let noOfWordsFound = 0;
  while (noOfWordsFound < 3){
 

    const maxLetter = getMaxOccurringChar(stringifiedWords);
    incorrectLetters = incorrectLetters + maxLetter;
    if (stringifiedWords.length > 1){
      stringifiedWords = stringifiedWords.split('').filter(x => x !== maxLetter).join('')
    }
    noOfWordsFound++;
  }

  return incorrectLetters;

}