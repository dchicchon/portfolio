import Guide from '../../components/Guide/Guide'
import { ABOUT, HOME, PROJECTS } from '../../utils/mainRoutes';
import { classList } from '../../utils';
import meIcon from '../../assets/images/me.jpeg'
import linkedInIcon from '../../assets/images/linkedin48.png'
import unsplashIcon from '../../assets/images/unsplash48.png'
import youtubeIcon from '../../assets/images/youtube48.png'

import appStyles from '../../App.module.css'
import styles from './About.module.css';

// Link socials, maybe a blurb
// maybe add in that cool dithering thing I did on my face?

const IconLink = ({ link, imgSrc, alt }) => {
    return (
        <li className={styles.icon}>
            <a href={link} rel='noreferrer' target='_blank'>
                <img className={styles.icon_image} src={imgSrc} alt={alt} />
            </a>
        </li>
    )
}

const ImageWrapper = ({ height, width, imgSrc, alt }) => {
    const imageStyle = {
        width,
        height
    }
    return (
        <div style={imageStyle}>
            <img className={styles.my_image} src={imgSrc} alt={alt} />
        </div>
    )
}
const About = () => {
    return (
        <div className={appStyles.main_page}>
            <Guide links={[HOME]} />
            <div className={classList(styles.about, appStyles.background_dark)}>
                <div className={styles.about_main}>
                    <ImageWrapper height='100%' width='100%' imgSrc={meIcon} alt="me" />
                    <div className={styles.about_description}>
                        <p className={classList(styles.blurb, appStyles.h3, appStyles.line_height_adjust)}>
                            Hello! My name is Danny, I'm a software engineer based in the San Francisco Bay Area. I
                            enjoy working on projects involving generative art, productivity, and music.
                        </p>
                        <ul className={styles.about_links}>
                            <IconLink link='https://www.linkedin.com/in/dchicchon/' alt='linkedin profile' imgSrc={linkedInIcon} />
                            <IconLink link='https://unsplash.com/@dchicchon' alt='unsplash profile' imgSrc={unsplashIcon} />
                            <IconLink link='https://www.youtube.com/channel/UCn_jWCVuLEWOLYUGN6kijRQ' alt='youtube profile' imgSrc={youtubeIcon} />
                        </ul>
                    </div>

                </div>
                <div className={styles.about_poweredby}>
                    <a target="_blank" href="https://icons8.com/icon/19318/youtube">YouTube</a>,{" "}
                    <a target="_blank" href="https://icons8.com/icon/V38ByuqzN46N/unsplash">Unsplash</a>, and {" "}
                    <a target="_blank" href="https://icons8.com/icon/13930/linkedin">LinkedIn</a> icons by <a target="_blank" href="https://icons8.com">Icons8</a>
                </div>
            </div>
            <Guide links={[ABOUT, PROJECTS]} startRight />
        </div>
    )
}

export default About;