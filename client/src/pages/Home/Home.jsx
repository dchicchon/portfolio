import { useEffect, useMemo } from 'react';
import Q5 from 'q5xjs'
import { HOME, ABOUT, PROJECTS } from '../../utils/mainRoutes';
import styles from './Home.module.css'
import appStyles from '../../App.module.css';
import Guide from '../../components/Guide/Guide';
import { classList } from '../../utils';



const Home = () => {
    const isMobile = useMemo(() => {
        return window.innerWidth <= 600
    }, [])

    useEffect(() => {
        const q5 = new Q5();
        sketch(q5, 1);
        // This doesn't work, trying to minimize url bar seen
        // here https://remysharp.com/2010/08/05/doing-it-right-skipping-the-iphone-url-bar
        // setTimeout(() => {
        //     window.scroll(0,1);
        // }, 1000)
    }, [])


    const sketch = (s) => {
        const colors = {
            blue: 'rgb(97, 218, 251)',
            teal: 'rgb(13, 202, 171)',
            seagreen: 'rgb(8, 230, 142)',
            green: 'rgb(17, 248, 84)',
            orange: 'rgb(255, 129, 6)',
            yellow: 'rgb(251, 219, 16)',
        }
        const colorsList = Object.values(colors);

        // console.log('creating sketch');
        let seed = 1
        const sketchDiv = document.getElementById('main_sketch');
        const { width, height } = sketchDiv.getBoundingClientRect();

        const paddingX = 20;
        const paddingY = 20;
        const gridNum = 5; // 5
        const decimalPlace = 4; // 4
        const iterConst = 5;
        const gridConst = isMobile ? gridNum * 5 : gridNum * 9;
        const iterSketch = isMobile ? iterConst * 50 : iterConst * 50;
        const iterPause = isMobile ? iterConst * 20 : iterConst * 30;
        const numAcross = s.floor(width / gridConst)
        const numDown = s.floor(height / gridConst)
        const strokeWeight = isMobile ? 4 : 7;

        const grid = [];
        const initialPos = { x: s.floor(numAcross / 2), y: s.floor(numDown / 2) }

        let iters = 0;
        let currentColor = colorsList[s.floor(s.random(colorsList.length))]
        let inputX = seed;
        let inputY = seed + 1;
        const xInc = 0.01;
        const yInc = 0.01;
        let currentPos = initialPos;
        const mainSketch = document.getElementById('main_sketch');
        s.setup = () => {
            const canvas = s.createCanvas(width, height);
            s.pixelDensity(window.devicePixelRatio);
            mainSketch.appendChild(canvas);
            for (let i = 0; i < numAcross; i++) {
                grid[i] = [];
                for (let j = 0; j < numDown; j++) {
                    const point = {
                        x: (i * gridConst) + paddingX,
                        y: (j * gridConst) + paddingY
                    }
                    grid[i][j] = point;
                }
            }
            s.noiseSeed(seed);
        }

        s.draw = () => {
            for (let i = 0; i < grid.length; i++) {
                for (let j = 0; j < grid[i].length; j++) {
                    const point = grid[i][j];
                    s.stroke('white');
                    s.strokeWeight(2);
                    s.point(point.x, point.y)
                }
            }
            // console.log({iters})
            s.strokeWeight(strokeWeight);
            s.fill(currentColor)
            s.stroke(currentColor)
            if (iters < iterSketch) {
                // console.log('less than iterSKetch');
                const outputX = s.noise(inputX);
                const outputY = s.noise(inputY);

                // we randomly pick out 4 to use the seed
                const addX = parseInt(outputX.toString()[decimalPlace]);
                const addY = parseInt(outputY.toString()[decimalPlace]);

                const mappedX = s.floor(s.map(addX, 0, 9, -0.5, 1.5));
                const mappedY = s.floor(s.map(addY, 0, 9, -0.5, 1.5));

                // check the value of the X and Y
                inputX += xInc;
                inputY += yInc;

                // make a line from here to another dot
                let point1 = grid[currentPos.x][currentPos.y]
                let nextPos = { x: currentPos.x + mappedX, y: currentPos.y + mappedY }
                try {
                    let point2 = grid[nextPos.x][nextPos.y]
                    s.line(point1.x, point1.y, point2.x, point2.y)
                    currentPos = nextPos
                } catch (e) {
                    currentPos = initialPos;
                }
                iters++
            }
            else if (iters < iterSketch + iterPause) {
                iters++
            }
            else {
                currentPos = initialPos
                currentColor = colorsList[s.floor(s.random(colorsList.length))]
                iters = 0;
                seed++;
                s.noiseSeed(seed);
                s.clear();
                // s.erase();
                // s.rect(0, 0, width, height);
                // s.noErase();
                inputX = seed;
                inputY = seed + 1;
            }

        }
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