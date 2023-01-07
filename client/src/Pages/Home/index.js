import React, { useEffect } from 'react';
import p5 from 'p5'
import './style.css'

const colors = {
    blue: 'rgb(97, 218, 251)',
    teal: 'rgb(13, 202, 171)',
    seagreen: 'rgb(8, 230, 142)',
    green: 'rgb(17, 248, 84)',
    // pink: 'rgb(229, 110, 253)',
    // purple: 'rgb(156, 83, 255)',
    orange: 'rgb(255, 129, 6)',
    yellow: 'rgb(251, 219, 16)',
    // red: 'rgb(236, 66, 66)',
    // grey: 'rgb(31, 33, 34)',
}
const colorsList = Object.values(colors);

const sketch = (s) => {
    let seed = 1;
    // should the seed affect the increment value too? \_O_/
    const iterSketch = 100 * 13;
    const iterPause = 100 * 2;
    const { innerWidth: width, innerHeight: height } = window;
    const gridConst = 10 * 1;
    const grid = []
    const numAcross = s.floor(width / gridConst)
    const numDown = s.floor(height / gridConst)
    const initialPos = { x: s.floor(numAcross / 2), y: s.floor(numDown / 2) }
    const strokeMax = 5;

    let iters = 0;
    let currentColor = colorsList[s.floor(s.random(colorsList.length))]
    let stroke = 0;
    const strokeInc = 0.02;

    let inputX = seed;
    let inputY = seed + 1;
    // const moveInc = 0.01;
    const xInc = 0.01;
    const yInc = 0.01;
    let currentPos = initialPos;
    let div;
    // const xPadding = 2;
    // const yPadding = 15;
    s.setup = () => {
        const canvas = s.createCanvas(width, height);
        canvas.parent('sketch')
        canvas.style('display', 'block')
        for (let i = 0; i < numAcross; i++) {
            grid[i] = [];
            for (let j = 0; j < numDown; j++) {
                const point = {
                    // x: i % 2 === 0 ? i * gridConst : (i * gridConst) + s.floor(gridConst / 3), // extra x wacky
                    // x: i % 2 === 0 ? i * gridConst : (i * gridConst) + s.floor(gridConst / 2), // x wacky
                    x: i * gridConst, // norm
                    // y: j % 2 === 0 ? (j * gridConst) : (j * gridConst) + s.floor(gridConst/ 3) // extra y wacky
                    // y: j % 2 === 0 ? (j * gridConst) : (j * gridConst) + s.floor(gridConst/2) // y wacky
                    y: (j * gridConst) // normal
                }
                grid[i][j] = point;
            }
        }
        s.noiseSeed(seed);
        // s.frameRate(1);
        s.background(31, 33, 34);

        div = s.createDiv(`Seed: ${seed}`)
        div.style('color', 'white')
        div.style('font-size', '16px')
        div.position(10, 0);
    }

    s.draw = () => {
        if (iters < iterSketch) {
            // let strokeVal = s.noise(stroke) * strokeMax
            // stroke += strokeInc;
            // use perlin noise for strokeVal
            // s.strokeWeight(strokeVal);
            // s.strokeWeight(s.r/andom(strokeMax));
            s.strokeWeight(1);

            // console.log('draw');
            s.fill(currentColor)
            s.stroke(currentColor)
            // Make grid
            // for (let i = 0; i < numAcross; i++) {
            //     for (let j = 0; j < numDown; j++) {
            //         const { x, y } = grid[i][j];
            //         s.point(x, y)
            //     }
            // }


            // let addX = s.floor(s.noise(inputX) * 2) - 1; // were making it so it doesn't matter anymore. This is bad
            // let addY = s.floor(s.noise(inputY) * 2) - 1;


            let outputX = s.noise(inputX);
            let outputY = s.noise(inputY);

            let addX = parseInt(outputX.toString()[4]);
            let addY = parseInt(outputY.toString()[4]);


            // console.log({ outputX, outputY, addX, addY });

            if (addX < 3) {
                addX = 1;
            } else if (addX < 7) {
                addX = 0
            }
            else {
                addX = -1
            }

            if (addY < 3) {
                addY = 1;
            } else if (addY < 7) {
                addY = 0
            }
            else {
                addY = -1
            }

            // check the value of the X and Y
            inputX += xInc;
            inputY += yInc;

            // make a line from here to another dot
            // let randX = s.floor(s.random(3)) - 1 // -1,0,1
            // let randY = s.floor(s.random(3)) - 1 // -1,0,1

            let point1 = grid[currentPos.x][currentPos.y]
            let nextPos = { x: currentPos.x + addX, y: currentPos.y + addY }
            try {
                let point2 = grid[nextPos.x][nextPos.y]
                s.line(point1.x, point1.y, point2.x, point2.y)
                currentPos = nextPos
            } catch (e) {

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
            div.html(`Seed: ${seed}`)
            // pick a new position, color and reset iter limit
        }
    }
}

// Lets do p5.js here

const Home = () => {
    useEffect(() => {
        const sketchInstance = new p5(sketch);
    }, [])
    return (
        <div>
            <div id='sketch' className='main'>
            </div>
        </div>
    )
}

export default Home;