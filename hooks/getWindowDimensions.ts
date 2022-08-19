import { useEffect, useState } from "react";
import { debounce } from "lodash";

const getWindowDimensions = () => {
  if (typeof window !== "undefined") {
    const { innerWidth: width, innerHeight: height } = window;
  return { width, height }; 
  } else {
    return { width: 0, height: 0 };
  }
 
};

export function useWindowSize(delay = 200) {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    const debouncedHandleResize = debounce(handleResize, delay);
    window.addEventListener("resize", debouncedHandleResize);
    return () => window.removeEventListener("resize", debouncedHandleResize);
  }, [delay]);

  return windowDimensions;
}