import { CV as cvPath } from '../../utils/mainRoutes';
import { Link } from 'react-router-dom';
import { classList } from '../../utils';

import meIcon from '../../assets/images/me.jpeg'
import appStyles from '../../App.module.css'
import styles from './About.module.css';
import { useEffect } from 'react';


const ImageWrapper = ({ imgSrc, alt }) => {
    return (
        <div className={styles.image_wrapper}>
            <img className={styles.my_image} loading='lazy' src={imgSrc} alt={alt} />
        </div>
    )
}

const About = () => {

    useEffect(() => {
        document.title = 'About > Danny'
    }, [])

    return (
        <div className={appStyles.main_page}>
            <div className={classList(styles.about, appStyles.background_dark)}>
                <h1>About</h1>
                <div className={styles.about_main}>
                    <ImageWrapper imgSrc={meIcon} alt="me" />
                    <div className={styles.about_description}>
                        <p className={classList(styles.blurb, appStyles.h3, appStyles.line_height_adjust)}>
                            Hello! My name is Danny, I'm a software engineer based in the San Francisco Bay Area. I
                            enjoy working on projects involving art, productivity, music, and really just about anything else
                            that might catch my interest in the moment.
                        </p>
                        <div className={styles.about_info}>
                            <div>
                                <h2>More Info</h2>
                                <Link to={cvPath.to}>
                                    <p className={appStyles.link}>CV</p>
                                </Link>
                            </div>
                            <div>
                                <h2>Get in touch</h2>
                                <p>
                                    Email: danielchicchon@gmail.com
                                    <br />
                                    Youtube: <a className={appStyles.link} href="https://www.youtube.com/channel/UCn_jWCVuLEWOLYUGN6kijRQ">@CodeBits</a>
                                    <br />
                                    LinkedIn: <a className={appStyles.link} href="https://www.linkedin.com/in/dchicchon/">@danielchicchon</a>
                                    <br />
                                    Unsplash: <a className={appStyles.link} href="https://unsplash.com/@dchicchon">@danielchicchon</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About;