import React from "react";
import { TimeOptionsButtonInterface } from "../../../interfaces";
function TimeOptionsButton({
  onClickHandler,
  className,
  label,
}: TimeOptionsButtonInterface) {
  return (
    <p onClick={onClickHandler} className={className}>
      {label}
    </p>
  );
}

export default TimeOptionsButton;
