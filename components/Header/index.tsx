import type { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import Logo from "./fragments/Logo";
import styles from "../../styles/Header.module.css";
const Header: NextPage = () => {
  return (
    <nav className={styles.headerNav}>
      <ul className={styles.headerContainer}>
        <Logo />
        <li>
          <p className={styles.logoContainer}>
            Improve Your Typing Skills
          </p>
        </li>
      </ul>
    </nav>
  );
};
export default Header;
