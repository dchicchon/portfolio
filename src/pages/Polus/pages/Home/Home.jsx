import { useEffect } from "react";
import polusIcon from "../../assets/images/polus_icon.png";
import styles from "./Home.module.css";
import appStyles from '../../Polus.module.css'

function Home() {
    useEffect(() => {
        document.title = "Polus";
    }, []);

    return (
        <div id={styles.polus}>
            <main className={styles.hero}>
                <img className={styles.hero_icon} src={polusIcon} alt="Polus Icon" />
                <h2 className={appStyles.h2}>Polus</h2>
                <p>A chrome extension to help plan your day</p>
            </main>
            <main className={styles.video_section}>
                {/* VIDEO */}
                <div id={styles.polus_video_wrapper}>
                    <iframe id={styles.polus_video} title='polus_video' src="https://www.youtube.com/embed/25f_hLEdLds" allowFullScreen></iframe>
                </div>
                <section id={styles.link}>
                    <a
                        id={styles.link_tag}
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://chrome.google.com/webstore/detail/polus/meajimhgfmioppbkoppphhkbcmapfngh?hl=en&authuser=0"
                    >
                        + Add Polus to Chrome
                    </a>
                </section>
            </main>
        </div>
    );
}

export default Home;
