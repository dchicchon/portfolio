import appStyles from '../../App.module.css';
import { classList } from '../../utils';
import styles from './CV.module.css';
import { useEffect } from 'react';

const CV = () => {
  useEffect(() => {
    document.title = 'CV > Danny';
  }, []);

  return (
    <div className={appStyles.main_page}>
      <div className={styles.cv}>
        <div className={classList(styles.wrapper, appStyles.h3)}>
          <h2>Work Experience</h2>
          <p>
            Software Engineer -{' '}
            <a className={styles.link} href="https://www.itential.com/">
              Itential
            </a>{' '}
            - January 2022 - October 2024
          </p>
          <p>
            Software Instructional Staff -{' '}
            <a className={styles.link} href="https://2u.com/">
              2U Education
            </a>
            , August 2019 - August 2021
          </p>
          <h2>Education</h2>
          <p>Fullstack Developer Certificate - UC Berkeley Extension, 2019</p>
          <p>B.S. Biology - UC Santa Cruz, 2017</p>
        </div>
      </div>
    </div>
  );
};

export default CV;
