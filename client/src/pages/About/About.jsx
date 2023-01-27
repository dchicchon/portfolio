
import Guide from '../../components/Guide/Guide'
import { ABOUT, HOME, PROJECTS } from '../../utils/mainRoutes';
import appStyles from '../../App.module.css'

// Link socials, maybe a blurb
// maybe add in that cool dithering thing I did on my face?
const About = () => {
    return (
        <div className={appStyles.main_page}>
            <Guide links={[HOME]} />
            <Guide links={[ABOUT, PROJECTS]} />
        </div>
    )
}

export default About;