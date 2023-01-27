import Guide from '../../components/Guide/Guide'
import { Link } from 'react-router-dom'
import { projectMap } from '../../utils/projectRoutes'
import { HOME, ABOUT, PROJECTS } from '../../utils/mainRoutes'
import styles from './Projects.module.css';
import appStyles from '../../App.module.css';

const ProjectCard = ({ project }) => {
    const { description } = projectMap[project];
    const title = project[0].toUpperCase() + project.slice(1);
    return (
        <div className={styles.project}>
            <Link to={project}>
                <h2>{title}</h2>
            </Link>
            <p className={styles.project_description}>{description}</p>
        </div>
    )
}

const Projects = () => {
    return (
        <div className={appStyles.main_page}>
            <Guide links={[HOME]} />
            <div id={styles.project_list}>
                {Object.keys(projectMap).map((project, i) => (
                    <ProjectCard key={i} project={project} />
                ))}
            </div>
            <Guide links={[ABOUT, PROJECTS]} startRight />
        </div >

    )
}

export default Projects;
