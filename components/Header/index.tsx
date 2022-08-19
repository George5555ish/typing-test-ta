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
          <Link href="/" className={styles.logoContainer}>
            Improve Your Typing Skills
          </Link>
        </li>
      </ul>
    </nav>
  );
};
export default Header;
