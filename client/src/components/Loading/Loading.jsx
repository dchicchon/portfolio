import styles from './Loading.module.css'
import appStyles from '../../App.module.css';
import { classList } from '../../utils';

const Loading = () => {
    return (
        <div className={classList(appStyles.main_page, styles.center, appStyles.background_dark)}>
            <div className={styles.loader}></div>
        </div>
    )
}
export default Loading