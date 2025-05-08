// import { classList } from '../../utils';
import appStyles from '../../App.module.css';
import { useEffect } from 'react';
import styles from './Activity.module.css';
import activities from '../../assets/data.json';

console.log(activities);

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function Cell({ activity }) {
  if (activity.sourceType === 'strava') {
    return (
      <div className={styles.cell}>
        <p>Date: {activity.date}</p>
        <p>Activity: Strava</p>
        <p>Type: {activity.type}</p>
        <p>Distance: {(activity.distance * 0.000621).toFixed(2)} miles</p>
        <p>Time: {formatTime(activity.moving_time)} minutes</p>
      </div>
    );
  } else {
    return (
      <div className={styles.cell}>
        <p>Date: {activity.date}</p>
        <p>Activity: Github</p>
        <p>Type: {activity.type}</p>
        <div>
          <p>Repository:  <a href={`https://github.com/${activity.repo.name}`}>{activity.repo.name}</a></p>
        </div>
      </div>
    );
  }
}

function Activity() {
  useEffect(() => {
    document.title = 'Activity > Danny';
  }, []);
  return (
    <div className={appStyles.main_page}>
      <div className={styles.page}>
        <div className={styles.wrapper}>
          {activities.map((activity, i) => (
            <Cell key={i} activity={activity} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Activity;
