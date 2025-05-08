import { useEffect } from 'react';
import { CV as cvPath } from '../../utils/mainRoutes';
import { Link } from 'wouter';
import { classList } from '../../utils';

import appStyles from '../../App.module.css';
import styles from './About.module.css';

const About = () => {
  useEffect(() => {
    document.title = 'About > Danny';
  }, []);

  return (
    <div className={appStyles.main_page}>
      <div className={styles.about}>
        <div className={styles.wrapper}>
          <p
            className={classList(
              styles.blurb,
              appStyles.h3,
              appStyles.line_height_adjust
            )}
          >
            I'm a software engineer based in the San Francisco Bay Area. I enjoy working
            on projects involving art, productivity, music, and really just about anything
            else that might catch my interest in the moment.
          </p>
          <div className={classList(styles.about_info, appStyles.h3)}>
            <div>
              <h2>More Info</h2>
              <Link to={cvPath.to}>
                <p className={styles.link}>CV</p>
              </Link>
              Github:{' '}
              <a className={styles.link} href="https://github.com/dchicchon">
                @dchicchon
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
