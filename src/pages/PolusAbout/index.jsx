import React from 'react';
import { classList } from '../../utils';
import styles from './About.module.css';
import appStyles from '../../Polus.module.css';

import screenshot from '../../assets/images/screenshot.png';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

function About() {
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h1 className={classList(appStyles.h1)}>About</h1>
        <p className={styles.subheading}>
          Polus is a personal planner designed to help you keep track of your time
          throughout the day, week, and month across multiple devices
        </p>
        <img className={styles.screenshot} src={screenshot} alt="Polus screenshot" />

        {/* Add socials */}

        {/* <p className='col subheading'>
          Coming soon to iOS and Android devices
        </p> */}

        {/* <span className='col d-flex justify-content-center' style={{ fontSize: '5rem' }}>
          <i className="fab fa-apple"></i>
        </span>
        <span className='col d-flex justify-content-center' style={{ fontSize: '5rem' }}>
          <i className="fab fa-android"></i>
        </span> */}
      </div>
      <Footer />
    </>
  );
}

export default About;
