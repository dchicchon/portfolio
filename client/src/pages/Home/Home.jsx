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
    seagreen: [8, 230, 142],
    // green: [20, 225, 0],
    yellow: [251, 219, 16],
    orange: [255, 129, 6],
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
        this.grid = [];
        this.drawQueues = [];
        this.snakes = [];
        this.playing = false;
        this.iters = 0;
        this.mainSketch = document.getElementById('main_sketch')
        this.iterDiv = '';
        this.gridNum = 1.5; // 5
        this.gridConst = this.gridNum * 5;
        this.strokeWeight = 0.1;
        this.queueLimit = 25; // 20
        this.currentColor = ''
        this.currentColorIndex = sketchInst.floor(sketchInst.random(colorsList.length));
        this.currentFaceIndex = sketchInst.floor(sketchInst.random(colorsList.length))
        this.canvas = '';
        this.drawRunning = true;

        // add a listener?
        this.mainSketch.onclick = () => {
            this.drawRunning = !this.drawRunning;
        }
        // this.mainSketch.ontouchend = () => {
        //     this.drawRunning = !this.drawRunning;
        // }


        this.initialSeed = 1;
        this.seed = this.initialSeed;

        // const strokeWeight = isMobile ? 4 : 7;
        // const gridConst = isMobile ? gridNum * 5 : gridNum * 9;
        // const iterSketch = 10;
        this.iterConst = 6; // 3
        this.iterSketch = isMobile ? this.iterConst * 30 : this.iterConst * 50;
        this.iterPause = isMobile ? this.iterConst * 20 : this.iterConst * 30;

        this.debug = false;
        this.reset = this.debug ? false : true;
        this.logger = new Logger({ verbose: !!this.debug });
        this.debugFR = 30;
        this.frameStop = 300;

        this.numberSnakes = isMobile ? 10 : 12;
        this.padX = this.debug ? 35 : 20; // 10
        this.padY = this.debug ? 40 : 20; // 10
        this.decimalPlace = 4; // 4
        this.lineDist = 75;

        this.inputX = this.initialSeed;
        this.inputY = this.initialSeed + 1;
        this.xInc = 0.01;
        this.yInc = 0.01;

        this.prevDrawsLeft = 0;
        this.iterDiv = '';

        this.currentXLowerBound = 0;
        this.currentYLowerBound = 0;
        this.currentXUpperBound = 0;
        this.currentYUpperBound = 0;

        this.pointsFilled = 0;
        this.numAcross = 0;
        this.numDown = 0;

    }
    setup() {
        // s.pixelDensity(1);
        const { width: screenWidth, height: screenHeight } = this.mainSketch.getBoundingClientRect();
        const width = this.debug ? this.sketchInst.floor(screenWidth * 0.75) : screenWidth;
        const height = this.debug ? this.sketchInst.floor(screenHeight * 0.75) : screenHeight;

        // const width = this.sketchInst.floor(screenWidth * 0.5);
        // const height = this.sketchInst.floor(screenHeight * 0.5);
        this.canvas = this.sketchInst.createCanvas(width, height);

        this.mainSketch.appendChild(this.canvas);
        this.sketchInst.pixelDensity(window.devicePixelRatio);
        if (this.debug) {
            this.addDebugElementsToDom();
            this.sketchInst.frameRate(this.debugFR);
        }
        this.setupBoxInstance();

    }
    draw() {
        if (this.drawRunning) {
            this.sketchInst.strokeWeight(this.strokeWeight);
            this.sketchInst.stroke(this.currentColor)

            let currentDrawPattern;
            for (let i = 0; i < this.drawQueues.length; i++) {
                const drawQueue = this.drawQueues[i];
                if (drawQueue.length > this.queueLimit) {
                    for (let i = 0; i < this.queueLimit; i++) {
                        try {
                            // instruction with args
                            const [instruction, ...args] = drawQueue.dequeue();
                            currentDrawPattern = { instruction, args };
                            if (instruction === 'fill') {
                                this.logger.log('we have a fill!')
                                this.sketchInst.noStroke();
                                this.sketchInst[instruction](...args);
                                let keepGoing = true;
                                while (keepGoing) {
                                    this.logger.log('keep going');
                                    this.logger.log(drawQueue.peek());
                                    const [subInstruction, ...subArgs] = drawQueue.dequeue();
                                    this.logger.log({ subInstruction, subArgs });
                                    currentDrawPattern = { subInstruction, subArgs };
                                    if (subInstruction === 'STOP') {
                                        keepGoing = false;
                                    } else {
                                        this.sketchInst[subInstruction](...subArgs);
                                    }

                                }
                            } else {
                                this.sketchInst[instruction](...args);
                            }
                        } catch (err) {
                            this.logger.log('error in draw');
                            this.logger.log(currentDrawPattern);
                            this.logger.log(err);
                        }
                    }
                }
            }

            const drawsLeft = this.drawQueues.reduce((curr, queue) => curr + queue.length, 0);
            const outOfMoves = drawsLeft === 0 || drawsLeft === this.prevDrawsLeft;
            // Check to see if any of our queues still must draw
            if ((this.debug && this.iters >= this.frameStop) || ((this.iters > this.iterSketch + this.iterPause) && outOfMoves)) {
                if (!this.reset) return;
                this.seed += 1;
                this.inputX = this.seed;
                this.inputY = this.seed + 1;
                // we can randomize stuff here?
                // this.strokeWeight = this.sketchInst.random(2 );
                this.setupBoxInstance();

            }
            this.prevDrawsLeft = drawsLeft;

            if (this.iters < this.iterSketch) {
                if (this.debug) {
                    this.logger.log(`tick ${this.iters}`);
                }
                for (let i = 0; i < this.snakes.length; i++) {
                    this.moveSnake(i);
                    this.inputX += this.xInc;
                    this.inputY += this.yInc;
                }
            }

            this.iters += 1;
        }
    }
    setupBoxInstance() {
        this.gridConst = this.sketchInst.random(5, 12);
        this.numAcross = this.debug ? this.sketchInst.floor(this.sketchInst.width / this.gridConst) - 3 : this.sketchInst.floor(this.sketchInst.width / this.gridConst);
        this.numDown = this.debug ? this.sketchInst.floor(this.sketchInst.height / this.gridConst) - 3 : this.sketchInst.floor(this.sketchInst.height / this.gridConst);

        this.iters = 0;
        this.pointsFilled = 1;
        this.currentXLowerBound = this.sketchInst.floor(this.numAcross / 2) - 25;
        this.currentYLowerBound = this.sketchInst.floor(this.numDown / 2) - 25;
        this.currentXUpperBound = this.sketchInst.floor(this.numAcross / 2) + 25;
        this.currentYUpperBound = this.sketchInst.floor(this.numDown / 2) + 25;

        this.snakes = this.buildSnakes();
        this.grid = this.buildGrid()
        this.currentColorIndex = this.sketchInst.floor(this.sketchInst.random(colorsList.length));
        this.currentFaceIndex = this.sketchInst.floor(this.sketchInst.random(colorsList.length));
        this.currentColor = this.sketchInst.color(...colorsList[this.currentColorIndex]);
        this.sketchInst.clear();
        this.sketchInst.noiseSeed(this.seed);
        this.inputX = this.seed;
        this.inputY = this.seed + 1;
    }
    isTriangle(p1, p2) {
        return this.commonNode(p1, p2);
    }
    commonNode(p1, p2) {
        for (const node of p1.nodes.values()) {
            if (p2.nodes.has(node)) return true;
        }
        return false;
    }
    getNode(identifier) {
        const [x, y] = identifier.split('-').map(coord => parseInt(coord));
        return this.grid[x][y];
    }
    addDebugElementsToDom() {
        this.iterDiv = document.createElement('div');
        this.iterDiv.textContent = `Iters: ${this.iters}`;

        const debugDiv = document.createElement('div');
        const frameLimitInput = document.createElement('input');
        const frameRateInput = document.createElement('input');
        const frameRateDisplay = document.createElement('div');
        const frameLimitDisplay = document.createElement('div');
        const restartButton = document.createElement('button');
        const startAndPauseButton = document.createElement('button');
        const seedInput = document.createElement('input');
        const seedInputDisplay = document.createElement('div');

        // main div
        debugDiv.id = 'debug_div';

        // Frame Limit displays
        frameLimitInput.type = 'range';
        frameLimitInput.min = 1;
        frameLimitInput.max = this.iterSketch;
        frameLimitInput.style.width = 'fit-content';
        frameLimitInput.value = this.frameStop;
        frameLimitDisplay.textContent = this.frameStop;

        // Frame Rate
        frameRateInput.type = 'range';
        frameRateInput.min = 1;
        frameRateInput.max = 60;
        frameRateInput.value = 30;
        frameRateInput.style.width = 'fit-content';
        frameRateDisplay.textContent = frameRateInput.value;

        // Start, Pause, Restart
        restartButton.textContent = 'restart'
        startAndPauseButton.textContent = 'Play'
        restartButton.style.width = 'fit-content';
        startAndPauseButton.style.width = 'fit-content';

        // Seed
        seedInput.type = 'range';
        seedInput.min = 1;
        seedInput.value = this.seed;
        seedInput.max = 100;
        seedInput.style.width = 'fit-content'
        seedInputDisplay.textContent = this.seed;

        seedInput.oninput = (e) => {
            this.seed = parseInt(seedInput.value);
            seedInputDisplay.textContent = this.seed;
        }

        frameLimitInput.oninput = (e) => {
            this.frameStop = parseInt(frameLimitInput.value);
            frameLimitDisplay.textContent = this.frameStop;
        }
        frameRateInput.oninput = (e) => {
            frameRateDisplay.textContent = frameRateInput.value;
            this.sketchInst.frameRate(frameRateInput.value);
        }
        startAndPauseButton.onclick = () => {
            this.playing = !this.playing
            if (this.playing) {
                startAndPauseButton.textContent = 'Pause'
            } else {
                startAndPauseButton.textContent = 'Play'
            }
        };
        restartButton.onclick = () => {
            this.setupBoxInstance();
        }

        debugDiv.appendChild(this.iterDiv)
        debugDiv.appendChild(startAndPauseButton);
        debugDiv.appendChild(restartButton);
        debugDiv.appendChild(frameLimitDisplay);
        debugDiv.appendChild(frameLimitInput);
        debugDiv.appendChild(frameRateDisplay);
        debugDiv.appendChild(frameRateInput);
        debugDiv.appendChild(seedInputDisplay)
        debugDiv.appendChild(seedInput)

        this.mainSketch.appendChild(debugDiv);
    }
    withinDistance(p1, p2, distance) {
        // map distance to index distance rather than pixel distance

        const { x: x1, y: y1 } = p1;
        const { x: x2, y: y2 } = p2;
        const maxDistance = this.gridConst * distance;

        // Must be within 2 coords
        if (Math.abs(x1 - x2) > maxDistance) {
            return false;
        }
        if (Math.abs(y1 - y2) > maxDistance) {
            return false;
        }
        return true;
    }
    drawGrid() {
        // we should draw a coordinate at the beginning 
        for (let x = 0; x < this.grid.length; x++) {
            this.sketchInst.stroke('white');
            const startX = this.grid[x][0];
            const maxLengthY = this.grid[0].length;
            this.sketchInst.text(`${x}`, startX.x - 3, startX.y - 15,);
            if (x < maxLengthY) {
                const startY = this.grid[0][x];
                this.sketchInst.text(`${x}`, startY.x - 25, startY.y + 3,);
            }
            for (let y = 0; y < this.grid[x].length; y++) {
                const p = this.grid[x][y]
                this.sketchInst.stroke(100);
                if (p.nodes.size > 0) {
                    this.sketchInst.stroke('orange');
                }
                this.sketchInst.strokeWeight(3);
                this.sketchInst.point(p.x, p.y)
                this.sketchInst.strokeWeight(0.3);
            }
        }
    }
    buildSnakes() {
        const snakes = [];
        for (let i = 0; i < this.numberSnakes; i++) {
            const newSnake = { x: this.sketchInst.floor(this.numAcross / 2), y: this.sketchInst.floor(this.numDown / 2), prevPos: '' }
            snakes.push(newSnake);
            this.drawQueues[i] = new Queue();
        }
        return snakes;
    }
    buildGrid() {
        const grid = []
        for (let x = 0; x < this.numAcross; x++) {
            grid[x] = []
            for (let y = 0; y < this.numDown; y++) {
                const point = {
                    x: (x * this.gridConst) * 1 + this.padX,
                    y: (y * this.gridConst) * 1 + this.padY,
                    nodes: new Set(),
                }
                point.id = `${x}-${y}`
                grid[x][y] = point;
            }
        }
        return grid;
    }
    isFace(basePoint, targetPoint) {
        // check for 4 points that are connected
        const nodeMap = {}
        if (basePoint.nodes.size === 0) return false;
        if (targetPoint.nodes.size === 0) return false;
        if (basePoint.nodes.has(targetPoint.id)) return false;
        if (targetPoint.nodes.has(basePoint.id)) return false;

        nodeMap[basePoint.id] = true;

        const node2 = [];
        for (const node of basePoint.nodes.values()) {
            const foundNode = this.getNode(node);
            if (foundNode.nodes.size > 1 && targetPoint.id !== foundNode.id) {
                nodeMap[foundNode.id] = true;
                node2.push(foundNode);
            }
        }
        if (node2.length === 0) return false;

        let hasFace = false;
        node2.forEach(potentialNode => {
            for (const node of potentialNode.nodes.values()) {
                const foundNode = this.getNode(node)
                if (nodeMap[foundNode.id]) continue; // this means its been listed already
                if (foundNode.nodes.size > 1 && targetPoint.nodes.has(node)) {
                    hasFace = true;
                }
            }
        })

        return hasFace;

    }
    isSquare(points) {
        let numX = new Set();
        let numY = new Set();
        for (const point of points) {
            numX.add(point.x)
            numY.add(point.y);
        }
        return numX.size === 2 && numY.size === 2;
    }
    getVerticies(basePoint, targetPoint) {
        const vertices = [basePoint];

        // by this point basePoint and target point are connected
        for (const node1 of basePoint.nodes.values()) {
            const foundNode1 = this.getNode(node1);
            if (foundNode1.id === targetPoint.id) continue;
            for (const node2 of targetPoint.nodes.values()) {
                const foundNode2 = this.getNode(node2);
                if (foundNode2.id === basePoint.id) continue;
                if (foundNode1.nodes.has(node2)) {
                    vertices.push(foundNode1, foundNode2);
                }
            }
        }
        vertices.push(targetPoint);
        return vertices;
    }
    getDistance(point1, point2) {
        const a = Math.abs(point2.x - point1.x);
        const b = Math.abs(point2.y - point1.y)
        return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2))
    }
    getSeedMovement(input) {
        const outputX = this.sketchInst.noise(input);
        const add = parseInt(outputX.toString()[this.decimalPlace]);
        const mapped = this.sketchInst.floor(this.sketchInst.map(add, 0, 9, -0.5, 1.5));
        return mapped;
    }
    isOutOfBounds(point) {
        return point.x < 0
            || point.y < 0
            || point.x >= this.grid.length
            || point.y >= this.grid[0].length
            || point.x < this.currentXLowerBound
            || point.x >= this.currentXUpperBound
            || point.y < this.currentYLowerBound
            || point.y >= this.currentYUpperBound
    }
    checkToExpandBounds() {
        // we have our current lower and upper bounds, lets expand it if all points have already been filled?
        // or the limit points have been filled
        const pointsToFill = (this.currentXUpperBound - this.currentXLowerBound) * (this.currentYUpperBound - this.currentYLowerBound)
        this.logger.log({
            pointsFilled: this.pointsFilled,
            pointsToFill
        })
        if (this.pointsFilled >= pointsToFill - 50) {
            this.logger.log('exapand the bounds!')
            this.currentXLowerBound -= 2;
            this.currentYLowerBound -= 1;
            this.currentXUpperBound += 2;
            this.currentYUpperBound += 1;
        }
    }
    moveSnake(index) {
        const snake = this.snakes[index];
        const drawQueue = this.drawQueues[index];
        const mappedY = this.getSeedMovement(this.inputX);
        const mappedX = this.getSeedMovement(this.inputY);
        const basePoint = this.grid[snake.x][snake.y];
        try {
            // if (mappedX + mappedY === 0) {
            //     return this.logger.log('movement not allowed');
            // }
            const nextPos = { x: snake.x + mappedX, y: snake.y + mappedY, prevPos: snake };
            // the next move for the snake must be a valid one. Lets try to 

            if (this.isOutOfBounds(nextPos)) {
                return this.logger.log('out of bounds');
            }

            const targetPoint = this.grid[nextPos.x][nextPos.y];

            if (nextPos.x === snake.prevPos.x && nextPos.y === snake.prevPos.y) {
                return this.logger.log('cant go back')
            }
            if (this.isTriangle(basePoint, targetPoint)) {
                return this.logger.log('triangle')
            }

            const rise = basePoint.y - targetPoint.y;
            const run = basePoint.x - targetPoint.x;

            const slope = rise / run;
            const intercept = basePoint.y - slope * basePoint.x;

            for (let dist = 0; dist < this.lineDist; dist++) {
                if (run === 0) {
                    const xVal = basePoint.x
                    const yVal = this.sketchInst.map(dist, 0, this.lineDist, basePoint.y, targetPoint.y);
                    drawQueue.enqueue(['point', xVal, yVal])
                } else {
                    const xVal = this.sketchInst.map(dist, 0, this.lineDist, basePoint.x, targetPoint.x)
                    const yVal = slope * xVal + intercept;
                    drawQueue.enqueue(['point', xVal, yVal])
                }
            }
            if (this.isFace(basePoint, targetPoint, this.grid)) {
                const vertices = this.getVerticies(basePoint, targetPoint);

                // figure out number of faces to draw since we might be drawing more than one
                // right now there's an issue that we're not drawing the vertexes correctly
                if (vertices.length <= 4) {
                    if (this.isSquare(vertices)) {
                        const altcolor = this.sketchInst.color(...colorsList[this.currentFaceIndex]);
                        altcolor.setAlpha(150);
                        this.sketchInst.fill(altcolor)
                        drawQueue.enqueue(['fill', altcolor])
                    } else {
                        const altcolor = this.sketchInst.color(...colorsList[this.currentFaceIndex]);
                        altcolor.setAlpha(150);
                        drawQueue.enqueue(['fill', altcolor])

                    }
                    drawQueue.enqueue(['beginShape', this.sketchInst.QUADS]);
                    for (const vertex of vertices) {
                        drawQueue.enqueue(['vertex', vertex.x, vertex.y])
                    }
                    drawQueue.enqueue(['endShape', this.sketchInst.CLOSE])
                    drawQueue.enqueue(['STOP'])

                }
                else {
                    // its greater than 4. must be 2 shapes
                    const baseVertex = vertices.shift();
                    const targetVertex = vertices.pop();
                    const [vert1, vert2, vert3, vert4] = vertices;
                    const shape1Verts = [baseVertex, vert1, vert2, targetVertex];
                    const shape2Verts = [baseVertex, vert3, vert4, targetVertex];
                    const shapes = [];
                    shapes.push(shape1Verts)
                    shapes.push(shape2Verts)
                    for (let k = 0; k < shapes.length; k++) {
                        const shapeVerts = shapes[k];

                        if (this.isSquare(shapeVerts)) {
                            const altcolor = this.sketchInst.color(...colorsList[this.currentFaceIndex]);
                            altcolor.setAlpha(150);
                            drawQueue.enqueue(['fill', altcolor])
                        } else {
                            const altcolor = this.sketchInst.color(...colorsList[this.currentFaceIndex]);
                            altcolor.setAlpha(150);
                            drawQueue.enqueue(['fill', altcolor])

                        }
                        drawQueue.enqueue(['beginShape', this.sketchInst.QUADS]);
                        for (const vertex of shapeVerts) {
                            drawQueue.enqueue(['vertex', vertex.x, vertex.y])
                        }
                        drawQueue.enqueue(['endShape', this.sketchInst.CLOSE])
                    }
                    drawQueue.enqueue(['STOP'])

                }
            }


            if (targetPoint.nodes.size === 0) {
                this.pointsFilled += 1;
            }
            basePoint.nodes.add(targetPoint.id);
            targetPoint.nodes.add(basePoint.id);


            if (this.debug) {
                this.sketchInst.stroke('red');
                this.sketchInst.line(basePoint.x, basePoint.y, targetPoint.x, targetPoint.y);
            }
            this.snakes[index] = nextPos;
            // this.checkToExpandBounds();

        } catch (err) {
            if (this.debug) {
                this.logger.log('Error in move snake');
                this.logger.log(err);
            }
        }

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
        document.title = 'Home > Danny'
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