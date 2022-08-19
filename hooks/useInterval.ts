import { useRef, useEffect } from "react";

export default function useInterval(callback: () => void, restartTimer: boolean, delay: number) {

    //this useInterval function will be called whenever the parent component renders.
    // on render, savedCallback.current gets set to whatever the callback is, if the callback 
    // has changed

  const savedCallback = useRef(() => {});
//   console.log("called")

  useEffect(() => {
    if (savedCallback){
        savedCallback.current = callback;
    } 
  }, [callback]);

  /**
   * Likewise, the set interval is set off,
   * and if delay is 
  */
  useEffect(() => {
    function updateTimer() {
      savedCallback.current();
    }
    if (delay !== null && restartTimer) {
      let id = setInterval(updateTimer, delay);
      return () => {
          console.log("clearEed!")
        clearInterval(id);
      }
    }
  }, [delay,restartTimer]);
}