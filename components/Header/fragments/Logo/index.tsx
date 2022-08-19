import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../../public/assets/swift.svg";
import styles from "../../../../styles/Header.module.css";
function Logo() {
  return (
    <li>
      <Link href="/" className={styles.logoContainer}>
        <Image src={logo} alt="logo" width="50px" height="50px" />
        <span className={styles.headerTextContainer}>
          <strong>Swift</strong> Hands
        </span>
      </Link>
    </li>
  );
}
export default Logo;
