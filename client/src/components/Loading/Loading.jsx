
import styles from './Loading.module.css'
import appStyles from '../../App.module.css';
const Loading = () => {
    return (
        <div className={`${appStyles.main_page} ${styles.center}`}>
            <div className={styles.loader}></div>
        </div>
    )
}
export default Loading