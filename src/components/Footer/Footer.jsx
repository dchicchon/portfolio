import React from 'react';
import styles from './Footer.module.css';
import { Link } from 'wouter';
import polusIcon from '../../assets/images/polus_icon.png';

function Footer() {
  return (
    <footer id={styles.polus_footer}>
      <nav className={styles.footer_nav}>
        <div className={styles.footer_nav_col}>
          <h4>Company</h4>
          <Link to="/about">About</Link>
        </div>
        <div className={styles.footer_nav_col}>
          <h4>Support</h4>
          <Link to="privacy">Privacy</Link>
          <Link to="terms">Terms</Link>
        </div>
      </nav>
      <img className={styles.footer_logo} src={polusIcon} alt="Polus Icon" />
    </footer>
  );
}

export default Footer;
