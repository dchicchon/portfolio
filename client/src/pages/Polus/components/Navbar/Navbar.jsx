import React from "react";
import {
  Link,
} from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar() {

  return (
    <header className={styles.nav}>
      <Link className={styles.nav_link} to=''>Home</Link>
      <Link className={styles.nav_link} to='about'>About</Link>
      <Link className={styles.nav_link} to='privacy'>Privacy</Link>
      <Link className={styles.nav_link} to='terms'>Terms</Link>
    </header>
  );
}

export default Navbar;
