import React, {useState, useEffect} from 'react'
import { EditingStateFragmentInterface } from '../../../../../../../interfaces'
import styles from "../../../../../../../styles/fragment-styles/EditingStateFragment.module.css"
import TimeOptionsButton from '../../../../../fragments/TimeOptionsButton'
function EditingStateFragment({
    cancelWordEditFtn, 
    saveNewWordFtn,
    isCurrentWordInTypedWords
}: EditingStateFragmentInterface) {
    const [textAreaValue, setTextAreaValue] = useState('')

    useEffect(() => {
        return setTextAreaValue(isCurrentWordInTypedWords?.word || '')
    }, [isCurrentWordInTypedWords?.word],)
  return (
    <div className={styles.editingStageContainer}>
      
 <textarea cols={7} rows={1} draggable={false} value={textAreaValue} onChange={(e) => setTextAreaValue(e.target.value)} /> 
  
 <div className={styles.editStageButtons}>
            <TimeOptionsButton className={styles.editStageButton} onClickHandler={() => saveNewWordFtn(textAreaValue,isCurrentWordInTypedWords) } label={'Save'} style={{color: "#fff"}} />
            <TimeOptionsButton className={styles.editStageButtonCancel} onClickHandler={() => cancelWordEditFtn() } label={'Cancel'} style={{color: "#fff"}}  />

        </div>
    </div>
   
  )
}

export default EditingStateFragment