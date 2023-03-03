import { useEffect, useMemo } from 'react';
import Q5 from 'q5xjs'
import { HOME, ABOUT, PROJECTS } from '../../utils/mainRoutes';
import styles from './Home.module.css'
import appStyles from '../../App.module.css';
import Guide from '../../components/Guide/Guide';
import { classList } from '../../utils';

const colors = {
    blue: [97, 218, 251],
    teal: [13, 202, 171],
    // seagreen: [8, 230, 142],
    // green: [17, 248, 84],
    orange: [255, 129, 6],
    yellow: [251, 219, 16],
}
const colorsList = Object.values(colors);

class Queue {
    constructor() {
        this.elms = {};
        this.head = 0;
        this.tail = 0;
    }

    enqueue(elm) {
        this.elms[this.tail] = elm;
        this.tail += 1;
    }

    dequeue() {
        const item = this.elms[this.head];
        delete this.elms[this.head];
        this.head += 1;
        return item;
    }
    peek() {
        return this.elms[this.head];
    }
    get length() {
        return this.tail - this.head
    }
    get isEmpty() {
        return this.length === 0;
    }
}

class Logger {
    constructor(props) {
        this.verbose = props.verbose;
    }

    log(message) {
        if (this.verbose) {
            console.log(message)
        }
    }

    info(message) {
        console.log(message);
    }
}

// create new drawing
class MainDrawing {
    constructor(sketchInst, isMobile) {
        this.sketchInst = sketchInst;
    }
}

// const movementType = {
//     '1,-1': 'UP_RIGHT',
//     '1,0': 'RIGHT',
//     '1,1': 'DOWN_RIGHT',
//     '-1,-1': 'UP_LEFT',
//     '-1,0': 'LEFT',
//     '-1,1': 'DOWN_LEFT',
//     '0,-1': 'UP',
//     '0,1': 'DOWN',
// }

const Home = () => {
    const isMobile = useMemo(() => {
        return window.innerWidth <= 600
    }, [])

    useEffect(() => {
        const q5 = new Q5();
        const s = sketch(q5);

        // when we move to another tab, we should kill the sketch instance;
        return () => {
            s.noLoop();
            const main = document.getElementById('main_sketch');
            // const debugDiv = document.getElementById('debug_div');
            if (main) {
                // stop the sketch instance;
                const [...children] = main.children;
                // remove all children?
                children.forEach(child => {
                    main.removeChild(child);
                })
            }
        }
        // This doesn't work, trying to minimize url bar seen
        // here https://remysharp.com/2010/08/05/doing-it-right-skipping-the-iphone-url-bar
        // setTimeout(() => {
        //     window.scroll(0,1);
        // }, 1000)
    }, [])

    const sketch = (s) => {
        // Lets create an instance of the MainDrawing
        const mainDrawing = new MainDrawing(s, isMobile);
        s.setup = () => mainDrawing.setup();
        s.draw = () => mainDrawing.draw();
        return s;
    }

    return (
        <div className={classList(appStyles.main_page, appStyles.background_dark)}>
            <Guide links={[HOME]} />
            <div id='main_sketch' className={styles.sketch_container}>
            </div>
            <Guide
                startRight
                links={[ABOUT, PROJECTS,]} />
        </div>
    )
}

export default Home;