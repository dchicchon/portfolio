import Guide from '../../components/Guide/Guide'
import { Link } from 'react-router-dom'
import { projectMap } from '../../utils/projectRoutes'
import { HOME, ABOUT, PROJECTS } from '../../utils/mainRoutes'
import { classList } from '../../utils'

// styes
import styles from './Projects.module.css';
import appStyles from '../../App.module.css';
import { useEffect, useState } from 'react'


const ProjectCard = ({ project }) => {

    useEffect(() => {
        document.title = 'Projects > Danny'
    })
    const [icon, setImage] = useState('');
    const { description, title, icon: iconPath } = projectMap[project];
    console.log(iconPath);
    console.log(title);
    if (iconPath) {
        console.log('iconPath');
        iconPath.then(res => {
            console.log('found icon');
            console.log(res.default);
            setImage(res.default);
        });
    }
    return (
        <Link className={classList(styles.project, appStyles.background_gray)} to={project}>
            {icon && <img src={icon} className={styles.project_icon} alt="project icon" />}
            <div className={styles.project_details}>
                <h2 className={appStyles.h2}>{title}</h2>
                <p className={styles.project_description}>{description}</p>
            </div>
        </Link>
    )
}

const Projects = () => {
    return (
        <div className={appStyles.main_page}>
            <Guide links={[HOME]} />
            <div className={classList(styles.projects_page, appStyles.background_dark)}>
                <div className={styles.project_list}>
                    {Object.keys(projectMap).map((project, i) => (
                        <ProjectCard key={i} project={project} />
                    ))}
                </div>
            </div>
            <Guide links={[ABOUT, PROJECTS]} startRight />
        </div >

    )
}

export default Projects;
