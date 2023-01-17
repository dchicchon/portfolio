import Guide from '../../components/Guide/Guide'
import { Link } from 'react-router-dom'
import { projectMap } from '../../utils/projectRoutes'
import { HOME, ABOUT, PROJECTS } from '../../utils/routes'
import styles from './Projects.module.css'

const ProjectCard = ({ route }) => {
    return (
        <div className={styles.project}>
            <Link to={route}>
                <h2>{route}</h2>
            </Link>
        </div>
    )
}

const Projects = () => {
    return (
        <div id={styles.projects}>
            <Guide links={[HOME]} />
            <div id={styles.project_list}>
                {Object.keys(projectMap).map((route, i) => (
                    <ProjectCard key={i} route={route} />
                ))}
                {/* <Project link={POLUS} /> */}
                {/* <Project link={LINEGRID} /> */}
            </div>
            <Guide links={[ABOUT, PROJECTS]} startRight />
        </div >

    )
}

export default Projects;
