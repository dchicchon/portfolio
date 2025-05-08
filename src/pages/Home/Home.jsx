import { CrystalComponent } from 'crystals';
import styles from './Home.module.css';
import { Link } from 'wouter';
import { ABOUT, PROJECTS } from '../../utils/mainRoutes';
const Home = () => {
  return (
    <div id={styles.home}>
      <div className={styles.wrapper}>
        <div>
          <CrystalComponent
            width={200}
            height={200}
            red={210}
            green={119}
            blue={95}
            // bgRed={31}
            // bgGreen={33}
            // bgBlue={34}
            bgRed={255}
            bgGreen={255}
            bgBlue={225}
          />
          <Link to={ABOUT.to}>
            <h2 className={styles.linkAbout}>About</h2>
          </Link>
        </div>
        <div>
          <CrystalComponent
            width={200}
            height={200}
            red={210}
            green={200}
            blue={95}
            // bgRed={31}
            // bgGreen={33}
            // bgBlue={34}
            bgRed={255}
            bgGreen={255}
            bgBlue={225}
          />

          <Link to={PROJECTS.to}>
            <h2
              className={styles.linkProject}
              style={{
                textAlign: 'center',
              }}
            >
              Projects
            </h2>
          </Link>
        </div>
        <div>
          <CrystalComponent
            width={200}
            height={200}
            red={100}
            green={119}
            blue={200}
            // bgRed={31}
            // bgGreen={33}
            // bgBlue={34}
            bgRed={255}
            bgGreen={255}
            bgBlue={225}
          />
          <Link to={'/activity'}>
            <h2 className={styles.linkActivity}>Activity</h2>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
