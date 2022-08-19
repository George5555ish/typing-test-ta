import React, {useEffect} from 'react'
import styles from "../../styles/Result.module.css";
import Image from 'next/image';
import success from "../../public/assets/success.svg";
import { useRouter } from 'next/router';
function Result() {

  const router = useRouter()
   
  const wordsPerMinuteArray = router.query.wordsPerMinuteArray as string;
  const cwpm = router.query.cwpm as string;
  const totalWords = router.query.totalWords as string;


  const [accuracyPercentage, setAccuracyPercentage] = React.useState(0);
  const [typingSpeed, setTypingSpeed] = React.useState(0);
  useEffect(() => {
      if (wordsPerMinuteArray !== undefined && totalWords !== undefined) {
        const wpmArray = JSON.parse(wordsPerMinuteArray) as number[];
        const averageOfNumbersInwpmArray = wpmArray.reduce((a, b) => a + b, 0) / wpmArray.length;
        setAccuracyPercentage(Math.round((parseInt(cwpm) / parseInt(totalWords)) * 100))
        setTypingSpeed(Math.round(averageOfNumbersInwpmArray));
      }
  }, [cwpm, totalWords, wordsPerMinuteArray])
  return (
    <div className={styles.resultContainer}>
      <Image src={success} alt="success" width={100} height={100} />
        <h1>Success</h1>
         <div  className={styles.resultBlock}>
            <h2>Accuracy</h2>
            <span></span>
            <p>{accuracyPercentage}%</p>
         </div>
         <div>
            <h2>Typing Speed</h2>
            <p>{typingSpeed} WPM</p>
         </div>

         <div>
            <h2>No Of Points:</h2>
            <p>{cwpm} correct words out of {parseInt(totalWords)} total words </p>
         </div>
    </div>
  )
}

export default Result