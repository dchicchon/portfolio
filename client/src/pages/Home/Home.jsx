import { useEffect, useMemo } from 'react';
import Q5 from 'q5xjs'
import { HOME, ABOUT, PROJECTS } from '../../utils/mainRoutes';
import styles from './Home.module.css'
import appStyles from '../../App.module.css';
import Guide from '../../components/Guide/Guide';
import { classList } from '../../utils';

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

// x,y format
const movementType = {
    '1,-1': 'UP_RIGHT',
    '1,0': 'RIGHT',
    '1,1': 'DOWN_RIGHT',
    '-1,-1': 'UP_LEFT',
    '-1,0': 'LEFT',
    '-1,1': 'DOWN_LEFT',
    '0,-1': 'UP',
    '0,1': 'DOWN',
}

function isTriangle(point1, point2) {
    // check if they have any points close together
    return commonNode(point1, point2);
}

function commonNode(point1, point2) {
    for (const node of point1.nodes.values()) {
        if (point2.nodes.has(node)) return true;
    }
    return false;
}

function getNode(grid, identifier) {
    const [x, y] = identifier.split('-').map(coord => parseInt(coord));
    return grid[x][y];
}

function withinDistance(point1, point2, gridConst) {
    // map distance to index distance rather than pixel distance
    const { x: x1, y: y1 } = point1;
    const { x: x2, y: y2 } = point2;
    const maxDistance = gridConst * 2;

    // Must be within 2 coords
    if (Math.abs(x1 - x2) >= maxDistance) {
        return false;
    }
    if (Math.abs(y1 - y2) >= maxDistance) {
        return false;
    }
    return true;
}

function isPentagon(basePoint, targetPoint, gridConst, grid) {
    try {
        // we use gridConst to figure out "distance"
        const nodeMap = {}
        if (basePoint.nodes.size === 0) return false;
        if (targetPoint.nodes.size === 0) return false;
        if (basePoint.nodes.has(targetPoint.id)) return false;
        if (targetPoint.nodes.has(basePoint.id)) return false;

        nodeMap[basePoint.id] = true;

        const node2 = [];
        for (const node of basePoint.nodes.values()) {
            const foundNode = getNode(grid, node);
            if (foundNode.nodes.size > 1) {
                nodeMap[foundNode.id] = true;
                node2.push(foundNode);
            }
        }
        if (node2.length === 0) return false;

        const node3 = [];
        node2.forEach(potentialNode => {
            for (const node of potentialNode.nodes.values()) {
                const foundNode = getNode(grid, node)
                if (nodeMap[foundNode.id]) continue; // this means its been listed already
                if (foundNode.nodes.size > 1 && withinDistance(foundNode, targetPoint)) {
                    node3.push(foundNode);
                    nodeMap[foundNode.id] = true;
                }
            }
        })
        if (node3.length === 0) return false;

        let foundConnection = false;
        node3.forEach(potentialNode => {
            for (const node of potentialNode.nodes.values()) {
                const foundNode = getNode(grid, node)
                if (nodeMap[foundNode.id]) continue;
                if (foundNode.nodes.size > 1 && withinDistance(foundNode, targetPoint) && targetPoint.nodes.has(foundNode.id)) {
                    foundConnection = true;
                }
            }
        })
        return foundConnection
    } catch (err) {
        console.log('err');
        console.log(err);
        return false;
    }

}

function drawGrid(grid, sketchInst) {
    for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y < grid[x].length; y++) {
            const p = grid[x][y]
            sketchInst.stroke(100);
            if (p.nodes.size > 0) {
                sketchInst.stroke('orange');
            }
            sketchInst.strokeWeight(5);
            sketchInst.point(p.x, p.y)
            sketchInst.strokeWeight(0.3);
            sketchInst.stroke('white');
            sketchInst.text(`${x},${y}`, p.x, p.y,);
        }
    }
}

function buildSnakes(numberSnakes, numAcross, numDown, sketchInst, drawQueues) {
    const snakes = [];
    for (let i = 0; i < numberSnakes; i++) {
        const newSnake = { x: sketchInst.floor(numAcross / 2), y: sketchInst.floor(numDown / 2) }
        snakes.push(newSnake);
        drawQueues[i] = new Queue();
    }
    return snakes;
}

function buildGrid(across, down, gridConst, padX, padY) {
    const grid = []
    for (let x = 0; x < across; x++) {
        grid[x] = []
        for (let y = 0; y < down; y++) {
            const point = {
                x: (x * gridConst) * 1 + padX,
                y: (y * gridConst) * 1 + padY,
                nodes: new Set(),
            }
            point.id = `${x}-${y}`
            grid[x][y] = point;
        }
    }
    return grid;
}

function isFace(basePoint, targetPoint, grid) {
    // check for 4 points that are connected
    const nodeMap = {}
    if (basePoint.nodes.size === 0) return false;
    if (targetPoint.nodes.size === 0) return false;
    if (basePoint.nodes.has(targetPoint.id)) return false;
    if (targetPoint.nodes.has(basePoint.id)) return false;

    nodeMap[basePoint.id] = true;

    const node2 = [];
    for (const node of basePoint.nodes.values()) {
        const foundNode = getNode(grid, node);
        if (foundNode.nodes.size > 1 && targetPoint.id !== foundNode.id) {
            nodeMap[foundNode.id] = true;
            node2.push(foundNode);
        }
    }
    if (node2.length === 0) return false;

    let hasFace = false;
    node2.forEach(potentialNode => {
        for (const node of potentialNode.nodes.values()) {
            const foundNode = getNode(grid, node)
            if (nodeMap[foundNode.id]) continue; // this means its been listed already
            if (foundNode.nodes.size > 1 && targetPoint.nodes.has(node)) {
                hasFace = true;
            }
        }
    })

    return hasFace;

}

function isSquare(points) {
    let numX = new Set();
    let numY = new Set();
    for (const point of points) {
        numX.add(point.x)
        numY.add(point.y);
    }
    return numX.size === 2 && numY.size === 2;
}

function getVerticies(basePoint, targetPoint, grid) {
    const vertices = [basePoint];

    // by this point basePoint and target point are connected
    for (const node1 of basePoint.nodes.values()) {
        const foundNode1 = getNode(grid, node1);
        if (foundNode1.id === targetPoint.id) continue;
        for (const node2 of targetPoint.nodes.values()) {
            const foundNode2 = getNode(grid, node2);
            if (foundNode2.id === basePoint.id) continue;
            if (foundNode1.nodes.has(node2)) {
                vertices.push(foundNode1, foundNode2);
            }
        }
    }
    vertices.push(targetPoint);
    return vertices;
}

function getDistance(point1, point2) {
    const a = Math.abs(point2.x - point1.x);
    const b = Math.abs(point2.y - point1.y)
    return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2))
}

function getSeedMovement(input, decimalPlace, sketchInst) {
    const outputX = sketchInst.noise(input);
    const add = parseInt(outputX.toString()[decimalPlace]);
    const mapped = sketchInst.floor(sketchInst.map(add, 0, 9, -0.5, 1.5));
    return mapped;
}

// its asynchronous so that way we don't have to wait for one snake to run all its code before moving
// to the next one
async function moveSnake(index, snakes, grid, gridConst, drawQueue, inputX, inputY, decimalPlace, sketchInst, colorsList, currentColorIndex) {
    const snake = snakes[index];
    const mappedY = getSeedMovement(inputX, decimalPlace, sketchInst);
    const mappedX = getSeedMovement(inputY, decimalPlace, sketchInst);
    const basePoint = grid[snake.x][snake.y];
    try {
        if (mappedX + mappedY === 0) {
            throw new Error('movement not allowed');
        }
        const nextPos = { x: snake.x + mappedX, y: snake.y + mappedY };
        const targetPoint = grid[nextPos.x][nextPos.y];
        if (isTriangle(basePoint, targetPoint)) {
            throw new Error('triangle')
        }
        if (isPentagon(basePoint, targetPoint, gridConst, grid)) {
            throw new Error('pentagon')
        }


        // if (debug) {
        // sketchInst.line(basePoint.x, basePoint.y, targetPoint.x, targetPoint.y);
        // }

        const rise = basePoint.y - targetPoint.y;
        const run = basePoint.x - targetPoint.x;

        const slope = rise / run;
        const intercept = basePoint.y - slope * basePoint.x;

        const lineDist = 45;
        for (let dist = 0; dist < lineDist; dist++) {
            if (run === 0) {
                // we should do something else;
                const xVal = basePoint.x
                const yVal = sketchInst.map(dist, 0, lineDist, basePoint.y, targetPoint.y);
                drawQueue.enqueue(['point', xVal, yVal])
            } else {
                const xVal = sketchInst.map(dist, 0, lineDist, basePoint.x, targetPoint.x)
                const yVal = slope * xVal + intercept;
                // console.log({ yVal });
                drawQueue.enqueue(['point', xVal, yVal])
            }
        }
        if (isFace(basePoint, targetPoint, grid)) {
            const vertices = getVerticies(basePoint, targetPoint, grid);
            if (isSquare(vertices)) {
                const altcolor = sketchInst.color(...colorsList[currentColorIndex]);
                altcolor.setAlpha(100);
                sketchInst.fill(altcolor)
                drawQueue.enqueue(['fill', altcolor])
            } else {
                const altcolor = sketchInst.color(...colorsList[currentColorIndex]);
                altcolor.setAlpha(200);
                // sketchInst.fill(altcolor)
                drawQueue.enqueue(['fill', altcolor])

            }

            if (vertices.length <= 4) {
                drawQueue.enqueue(['beginShape']);
                // sketchInst.beginShape();
                for (const vertex of vertices) {
                    drawQueue.enqueue(['vertex', vertex.x, vertex.y])
                    // sketchInst.vertex(vertex.x, vertex.y)
                }
                drawQueue.enqueue(['endShape'])
                // sketchInst.endShape();
            }
        }

        basePoint.nodes.add(targetPoint.id);
        targetPoint.nodes.add(basePoint.id);

        snakes[index] = nextPos;

    } catch (err) {

    }

}


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
            // const main = document.getElementById('main_sketch');
            // stop the sketch instance;
            // const [child] = main.children;
            // main.removeChild(child);
        }
        // This doesn't work, trying to minimize url bar seen
        // here https://remysharp.com/2010/08/05/doing-it-right-skipping-the-iphone-url-bar
        // setTimeout(() => {
        //     window.scroll(0,1);
        // }, 1000)
    }, [])

    const sketch = (s) => {
        const drawQueues = [];
        const reset = false;
        const debug = false;
        const debugFR = 10;
        const frameStop = 300;

        const colors = {
            blue: [97, 218, 251],
            teal: [13, 202, 171],
            // seagreen: [8, 230, 142],
            // green: [17, 248, 84],
            orange: [255, 129, 6],
            yellow: [251, 219, 16],
        }
        const colorsList = Object.values(colors);
        let currentColor;
        let currentColorIndex = s.floor(s.random(colorsList.length));

        let seed = 1;
        const mainSketch = document.getElementById('main_sketch');

        const padX = 10;
        const padY = 10;
        const gridNum = 5; // 5
        const decimalPlace = 4; // 4
        const iterConst = 4;
        // const strokeWeight = isMobile ? 4 : 7;
        const strokeWeight = 1;
        const gridConst = gridNum * 5;
        // const gridConst = isMobile ? gridNum * 5 : gridNum * 9;
        // const iterSketch = 10;
        const iterSketch = isMobile ? iterConst * 50 : iterConst * 250;
        const iterPause = isMobile ? iterConst * 20 : iterConst * 30;

        let grid;
        // There should be 4 starting positions near the center
        const numberSnakes = 5;
        let snakes = []

        let iters = 0;
        let inputX = seed;
        let inputY = seed + 1;
        const xInc = 0.01;
        const yInc = 0.01;

        const { width: screenWidth, height: screenHeight } = mainSketch.getBoundingClientRect();
        // const width = s.floor(screenWidth * 0.5)
        const width = screenWidth;
        // const height = s.floor(screenHeight * 0.5)
        const height = screenHeight
        const numAcross = s.floor(width / gridConst)
        const numDown = s.floor(height / gridConst)
        let pointsToDraw = [];
        // let rotation = 0.1; 
        // const rotationInc = 0.01;

        s.setup = () => {
            const canvas = s.createCanvas(width, height);

            s.pixelDensity(window.devicePixelRatio);
            mainSketch.appendChild(canvas);
            snakes = buildSnakes(numberSnakes, numAcross, numDown, s, drawQueues);
            grid = buildGrid(numAcross, numDown, gridConst, padX, padY)
            currentColor = s.color(...colorsList[currentColorIndex]);
            s.noiseSeed(seed);
            s.frameRate(120);

            if (debug) {
                s.frameRate(debugFR);
            }
        }

        s.draw = () => {
            if (debug) {
                console.log(`tick ${iters}`);
            }

            s.strokeWeight(strokeWeight);
            // s.fill(currentColor)
            s.stroke(currentColor)

            for (let i = 0; i < drawQueues.length; i++) {
                const queueLimit = 5;
                const drawQueue = drawQueues[i];
                if (drawQueue.length > queueLimit) {
                    for (let i = 0; i < queueLimit; i++) {
                        // instruction with args
                        const [instruction, ...args] = drawQueue.dequeue();
                        if (instruction === 'fill') {
                            // Okay we should run this and the next 6 steps;
                            s[instruction](...args);
                            for (let spIns = 0; spIns < 6; spIns++) {
                                const [instruction, ...args] = drawQueue.dequeue();
                                s[instruction](...args);
                            }

                        } else {
                            s[instruction](...args);
                        }
                    }
                }
            }


            if (iters < iterSketch) {
                for (let i = 0; i < snakes.length; i++) {
                    const drawQueue = drawQueues[i];
                    moveSnake(i, snakes, grid, gridConst, drawQueue, inputX, inputY, decimalPlace, s, colorsList, currentColorIndex);
                    inputX += xInc;
                    inputY += yInc;
                }
            }
            if (debug) {
                drawGrid(grid, s);
            }

            const drawsLeft = drawQueues.reduce((curr, queue) => curr + queue.length, 0);
            // Check to see if any of our queues still must draw
            if (((iters > iterSketch + iterPause) && drawsLeft === 0) || (debug && iters === frameStop)) {
                if (debug) {
                    console.log('reset');
                    s.noLoop();
                    return;
                }
                // currentPos = initialPos
                currentColorIndex = s.floor(s.random(colorsList.length));
                currentColor = s.color(...colorsList[currentColorIndex]);
                iters = 0;
                seed++;
                s.noiseSeed(seed);
                if (!reset) return s.noLoop();
                snakes = buildSnakes(numberSnakes, numAcross, numDown, s);
                grid = buildGrid(numAcross, numDown, gridConst, padX, padY);
                s.clear();
                inputX = seed;
                inputY = seed + 1;
            }
            iters++
        }
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