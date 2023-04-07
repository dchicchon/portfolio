import { Link } from 'react-router-dom'
import { projectMap } from '../../utils/projectRoutes'
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
    if (iconPath) {
        iconPath().then(res => {
            setImage(res.default);
        });
    }
    return (
        <Link className={classList(styles.project, appStyles.background_gray)} to={project}>
            {icon && <img src={icon} loading='lazy' className={styles.project_icon} alt="project icon" />}
            <div className={styles.project_details}>
                <h3 className={appStyles.h2}>{title}</h3>
                <p className={styles.project_description}>{description}</p>
            </div>
        </Link>
    )
}

const Projects = () => {
    return (
        <div className={appStyles.main_page}>
            <div className={classList(styles.projects_page, appStyles.background_dark)}>
                <div className={styles.project_list}>
                    {Object.keys(projectMap).map((project, i) => (
                        <ProjectCard key={i} project={project} />
                    ))}
                </div>
            </div>
        </div >

    )
}

export default Projects;
