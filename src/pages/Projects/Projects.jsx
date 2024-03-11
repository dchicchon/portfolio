import { Link } from 'react-router-dom';
import { projectsList } from '../../utils/projectsList';
import { classList } from '../../utils';

import styles from './Projects.module.css';
import appStyles from '../../App.module.css';
import { useEffect } from 'react';
import { ga } from '../../utils/firebase';

const ProjectCard = ({ project }) => {
  const { description, title, repo, site, internal } = project;

  const ProjectLink = () => {
    if (internal) {
      return <Link to={site}>Project</Link>;
    }
    return (
      <a
        onClick={() => {
          ga(`project visit: ${title}`);
        }}
        href={site}
        target="_blank"
        rel="noreferrer"
      >
        Project
      </a>
    );
  };


  const RepoLink = () => {
    if (!repo) return;
    return (
      <a
        onClick={() => {
          console.log('repo visit');
          ga(`repo visit: ${title}`);
        }}
        target="_blank"
        rel="noreferrer"
        href={repo}
      >
        Repository
      </a>
    );
  };

  return (
    <div className={classList(styles.project, appStyles.background_gray)}>
      <div className={styles.project_details}>
        <h3 className={appStyles.h2}>{title}</h3>
        <p className={styles.project_description}>{description}</p>
        <ProjectLink />
        {'    '}
        <RepoLink />
      </div>
    </div>
  );
};

const Projects = () => {
  useEffect(() => {
    document.title = 'Projects > Danny';
  });
  return (
    <div className={appStyles.main_page}>
      <div className={classList(styles.projects_page, appStyles.background_dark)}>
        <div className={styles.project_list}>
          {projectsList.map((project, i) => (
            <ProjectCard key={i} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
