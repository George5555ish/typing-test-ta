import React from "react";
import { TimeOptionsButtonInterface } from "../../../interfaces";
function TimeOptionsButton({
  onClickHandler,
  className,
  label,
  style
}: TimeOptionsButtonInterface) {
  return (
    <p onClick={onClickHandler} className={className} style={style}>
      {label}
    </p>
  );
}

export default TimeOptionsButton;
