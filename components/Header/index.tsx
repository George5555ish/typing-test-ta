import type { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import Logo from "./fragments/Logo";
import styles from "../../styles/Header.module.css";
import { useEffect, useState } from "react";
import {COOKIE_HIGH_SCORE} from "../../constants"
import Cookie from "js-cookie";
const Header: NextPage = () => {

  useEffect(() => {
 
    const highScore = Cookie.get(COOKIE_HIGH_SCORE);
    if (!highScore){
          Cookie.set(COOKIE_HIGH_SCORE, '0')
    } else {
      setHighScore(parseInt(highScore))
    }

  }, []);

  const [highScore, setHighScore] = useState(0)
  const [isNewHighScore, setIsNewHighScore] = useState('false')
  return (
    <nav className={styles.headerNav}>
      <ul className={styles.headerContainer}>
        <Logo />
        <li>
          <p className={styles.logoContainer}>
            High Score: {highScore} WPM
          </p>
        </li>
      </ul>
    </nav>
  );
};
export default Header;
