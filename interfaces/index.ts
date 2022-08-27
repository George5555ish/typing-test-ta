import { Dispatch, SetStateAction } from "react";

export interface TabButtonInterface {
    className: string;
    onClickHandler: () => void;
    label: string;
}

export interface TimeOptionsButtonInterface {
    className: string;
    onClickHandler: () => void;
    label: string | JSX.Element;
    style?: {}
}


export interface SettingsContainerInterface {
   
    defaultTimeHandler: (seconds: number) => void;
    customTimeHandler: () => void;
    saveHandler: () => void;
    isTimerRunning: boolean;
    isCurrentTabUserGenerated: boolean;
    currentTimeInSeconds: number;
    customTimer: number;
    isInputDisabled: boolean;
    isCustomTimerEnabled: boolean;
    switchTabs: (str: string) => void;
    handleSliderInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface TypingContainerInterface {
    setAllTypedWords: Dispatch<SetStateAction<{
        word: string;
        isTypedWordCorrect: boolean;
        currentDiv: number;
        noOfTypedWords: number;
    }[]>>
    divScrollValue: number;
    words: string[][];
    allTypedWords:  {
        word: string;
        isTypedWordCorrect: boolean;
        currentDiv: number;
        noOfTypedWords: number;
      }[];
    currentWordObject:{
        word: string;
        currentDiv: number;
      }
      isCurrentTabUserGenerated: boolean;
      isCurrentTypedWordIncorrect: boolean;
      widthFromWindow: number;
      isTextGeneratedByUserCorrect: boolean;
      userGeneratedText: string;
      textBoxErrorMsg: string;
      isInputDisabled: boolean;
      inputValue: string;
    currentTimeInSeconds: number;
    customTimer: number; 
    isCustomTimerEnabled: boolean;
    handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
    resetTimerHandler: () => void;
    updateUsergeneratedTextHandler: () => void;
    updateWordFtn: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    currentTime: string;
}

export interface SingleWordFragmentInterface{
    childKey: number; 
    word: string;
    isCurrentWordInTypedWords:{
        word: string;
        isTypedWordCorrect: boolean;
        currentDiv: number;
        noOfTypedWords: number;
    } | undefined;
    widthFromWindow: number;
    isCurrentTypedWordIncorrect: boolean;
    currentWordObject:{
        word: string;
        currentDiv: number;
      } 
    setCurrentWordIndex: (key: number,currentWordObject:{
        word: string;
        currentDiv: number;
      },divIndex: number) => void;
      currentRenderedDivIndex: number;
}

export interface EditableTextAreaFragmentInterface {
    isTextGeneratedByUserCorrect: boolean;
    userGeneratedText: string;
    updateWordFtn: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export interface InputTextFragmentInterface {
    isInputDisabled: boolean;
    inputValue: string;
    handleOnChange:(e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface EditingStateFragmentInterface {
    cancelWordEditFtn: () => void;
    saveNewWordFtn: (word: string,isCurrentWordInTypedWords:{
        word: string;
        isTypedWordCorrect: boolean;
        currentDiv: number;
        noOfTypedWords: number;
    } | undefined) => void;
    isCurrentWordInTypedWords: {
        word: string;
        isTypedWordCorrect: boolean;
        currentDiv: number;
        noOfTypedWords: number;
    } | undefined
}

export interface HighScoreModalInterace {
    typingSpeed: number;
    setIsNewHighScore:Dispatch<SetStateAction<boolean>>
}