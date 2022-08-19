import React from 'react'
import {EditableTextAreaFragmentInterface} from "../../../../../interfaces";
function EditableTextAreaFragment({
    isTextGeneratedByUserCorrect,
    userGeneratedText,
    updateWordFtn
}:EditableTextAreaFragmentInterface) {
  return (
    <textarea
    style={{
      boxShadow: isTextGeneratedByUserCorrect
        ? "1px 1px 7px 5px rgb(82, 82, 137)"
        : "1px 1px 7px 5px rgb(255, 111, 140)",
    }}
    placeholder="Paste in your text here"
    value={userGeneratedText}
    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateWordFtn(e)}
  > 
  </textarea>
  )
}

export default EditableTextAreaFragment