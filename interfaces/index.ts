export interface TabButtonInterface {
    className: string;
    onClickHandler: () => void;
    label: string;
}

export interface TimeOptionsButtonInterface {
    className: string;
    onClickHandler: () => void;
    label: string | JSX.Element;
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
    key: number;
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