import React from 'react'
import {InputTextFragmentInterface} from "../../../../../interfaces";

function InputTextFragment({isInputDisabled,inputValue,handleOnChange}:InputTextFragmentInterface) {
  return (
    <input
    placeholder="Type here"
    draggable="false"
    disabled={isInputDisabled}
    value={inputValue}
    style={{
      cursor: isInputDisabled ? "not-allowed" : "text",
    }}
    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleOnChange(e)}
  />
  )
}

export default InputTextFragment