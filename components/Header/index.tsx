import type { GetStaticProps, NextPage } from "next";
import Logo from "./fragments/Logo";
import styles from "../../styles/Header.module.css";
const Header: NextPage = () => {
  return (
    <nav className={styles.headerNav}>
      <ul className={styles.headerContainer}>
        <Logo />
        <li>
          <a href="/" className={styles.logoContainer}>
            Improve Your Typing Skills
          </a>
        </li>
      </ul>
    </nav>
  );
};
export default Header;
