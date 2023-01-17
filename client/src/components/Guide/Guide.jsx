
import { Link } from 'react-router-dom'
import styles from './Guide.module.css'

const Guide = ({ links, startRight }) => {

    return (
        <div className={styles.guide}>
            <ul className={startRight ? 'flex-end' : 'flex-start'}>
                {links.map((link, i) => (
                    <li key={i}>
                        <Link to={link.to}>{link.text}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Guide