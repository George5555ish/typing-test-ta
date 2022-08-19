import React from 'react'
import { TabButtonInterface } from '../../../interfaces'

function TabButton({className, onClickHandler, label}: TabButtonInterface) {
  return (
    <button
    className={
        className
    }
    onClick={onClickHandler}
  >
    {label}
  </button>
  )
}

export default TabButton