import React, { useEffect, useMemo } from 'react';
import p5 from 'p5'
import { HOME, ABOUT, PROJECTS } from '../../utils/mainRoutes';
import styles from './Home.module.css'
import appStyles from '../../App.module.css';
import Guide from '../../components/Guide/Guide';

const colors = {
    blue: 'rgb(97, 218, 251)',
    teal: 'rgb(13, 202, 171)',
    seagreen: 'rgb(8, 230, 142)',
    green: 'rgb(17, 248, 84)',
    orange: 'rgb(255, 129, 6)',
    yellow: 'rgb(251, 219, 16)',
}
const colorsList = Object.values(colors);


const Home = () => {

    const sketchNum = 1;
    const sketchArr = useMemo(() => {
        const list = [];
        for (let i = 0; i < sketchNum; i++) {
            list.push(i);
        }
        return list;
    }, []);
    const isMobile = useMemo(() => {
        return window.innerWidth <= 768
    }, [])

    useEffect(() => {
        for (let i = 0; i < sketchArr.length; i++) {
            const _ = new p5((s) => sketch(s, i));
        }
        // This doesn't work, trying to minimize url bar seen
        // here https://remysharp.com/2010/08/05/doing-it-right-skipping-the-iphone-url-bar
        // setTimeout(() => {
        //     window.scroll(0,1);
        // }, 1000)
    }, [sketchArr])


    const sketch = (s, index) => {
        let seed = index * 2;
        const sketchId = `sketch-${index}`;
        const sketchDiv = document.getElementById(sketchId);
        const { width, height } = sketchDiv.getBoundingClientRect();

        const gridNum = 5; // 5
        const decimalPlace = 4; // 4
        const gridConst = isMobile ? gridNum * 3 : gridNum * 9;
        const iterConst = 5;
        const iterSketch = isMobile ? iterConst * 30 : iterConst * 50;
        const iterPause = isMobile ? iterConst * 12 : iterConst * 30;
        const numAcross = s.floor(width / gridConst)
        const numDown = s.floor(height / gridConst)
        const strokeWeight = isMobile ? 3 : 7;

        const grid = []
        const initialPos = { x: s.floor(numAcross / 2), y: s.floor(numDown / 2) }

        let iters = 0;
        let currentColor = colorsList[s.floor(s.random(colorsList.length))]
        let inputX = seed;
        let inputY = seed + 1;
        const xInc = 0.01;
        const yInc = 0.01;
        let currentPos = initialPos;
        s.setup = () => {
            const canvas = s.createCanvas(width, height);
            canvas.parent(sketchId)
            canvas.style('display', 'block')
            for (let i = 0; i < numAcross; i++) {
                grid[i] = [];
                for (let j = 0; j < numDown; j++) {
                    const point = {
                        x: (i * gridConst),
                        y: j * gridConst
                    }
                    grid[i][j] = point;
                }
            }
            s.noiseSeed(seed);
            s.background(31, 33, 34);
            // s.frameRate(25);
        }

        s.draw = () => {
            if (iters < iterSketch) {
                s.strokeWeight(strokeWeight);

                s.fill(currentColor)
                s.stroke(currentColor)

                let outputX = s.noise(inputX);
                let outputY = s.noise(inputY);

                // we randomly pick out 4 to use the seed
                let addX = parseInt(outputX.toString()[decimalPlace]);
                let addY = parseInt(outputY.toString()[decimalPlace]);

                addX = s.floor(s.map(addX, 0, 9, -0.5, 1.5));
                addY = s.floor(s.map(addY, 0, 9, -0.5, 1.5));

                // check the value of the X and Y
                inputX += xInc;
                inputY += yInc;

                // make a line from here to another dot
                let point1 = grid[currentPos.x][currentPos.y]
                let nextPos = { x: currentPos.x + addX, y: currentPos.y + addY }
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
                s.background(31, 33, 34);
                currentPos = initialPos
                currentColor = colorsList[s.floor(s.random(colorsList.length))]
                iters = 0;
                seed++;
                s.noiseSeed(seed);
                inputX = seed;
                inputY = seed + 1;
            }

        }
    }

    return (
        <div className={appStyles.main_page}>
            <Guide links={[HOME]} />
            <div id={styles.sketch_container}>
                {sketchArr.map((i) =>
                    <div key={i} id={`sketch-${i}`} className={styles.sketch}></div>
                )}
            </div>
            <Guide
                startRight
                links={[ABOUT, PROJECTS,]} />
        </div>
    )
}

export default Home;