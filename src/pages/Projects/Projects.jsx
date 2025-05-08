import { Link } from 'wouter';
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
      return (
        <Link to={site}>
          <p className={classList(appStyles.h3, styles.link)}>Project</p>
        </Link>
      );
    }
    return (
      <a
        onClick={() => {
          ga(`project visit: ${title}`);
        }}
        href={site}
        className={classList(appStyles.h3, styles.link)}
      >
        Project
      </a>
    );
  };

  const RepoLink = () => {
    if (!repo) return;
    return (
      <a
        className={classList(appStyles.h3, styles.link)}
        onClick={() => {
          ga(`repo visit: ${title}`);
        }}
        href={repo}
      >
        Repository
      </a>
    );
  };

  return (
    <div className={styles.project}>
      <div className={styles.project_details}>
        <h3 className={appStyles.h3}>{title}</h3>
        <p className={classList(appStyles.h3, styles.project_description)}>
          {description}
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <ProjectLink />
          <RepoLink />
        </div>
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
      <div className={classList(styles.projects_page)}>
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
