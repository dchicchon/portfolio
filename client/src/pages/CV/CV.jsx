import Guide from '../../components/Guide/Guide'
import { ABOUT, HOME, PROJECTS } from '../../utils/mainRoutes';
import { classList } from '../../utils';

import appStyles from '../../App.module.css'
import styles from './CV.module.css';
import { useEffect } from 'react';

const CV = () => {
    useEffect(() => {
        document.title = 'CV > Danny'
    }, [])

    return (
        <div className={appStyles.main_page}>
            <Guide links={[HOME]} />
            <div className={classList(styles.cv, appStyles.background_dark)}>
                <h1>CV</h1>
                <h2>Work Experience</h2>
                <p>Software Developer - Itential, 2022 - Present</p>
                <p>Software Instructional Staff - 2U Education, 2020 - 2021</p>
                <h2>Education</h2>
                <p>Fullstack Developer Certificate - UC Berkeley Extension, 2019</p>
                <p>B.S. Biology - UC Santa Cruz, 2017</p>

            </div>
            <Guide links={[ABOUT, PROJECTS]} startRight />
        </div>
    )
}

export default CV;