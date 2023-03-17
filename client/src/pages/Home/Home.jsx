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

const entityTypes = {
    FISH: "FISH",
    FOOD: "FOOD",
}

// create new drawing
class MainDrawing {
    constructor(sketchInst, isMobile) {
        this.sketch = sketchInst;
        this.mainSketch = document.getElementById('main_sketch')
        this.canvas = '';
        this.strokeWeight = 1;
        this.debug = true;
        this.padX = 100
        this.padY = 100


        this.quadrants = 5;
        // we should space out our tank into quadrants. That way the code should run faster I think

        // first lets separate by x
        this.tank = [];

        this.frameRate = 60;
        this.startingFishNum = 10;
        this.startingFoodNum = 50;
    }

    // setup canvas
    setup() {
        const { width: screenWidth, height: screenHeight } = this.mainSketch.getBoundingClientRect();
        const width = screenWidth;
        const height = screenHeight;
        this.canvas = this.sketch.createCanvas(width, height);
        this.mainSketch.appendChild(this.canvas);
        this.sketch.pixelDensity(window.devicePixelRatio);
        this.sketch.noFill();
        this.sketch.stroke('white');
        this.sketch.frameRate(this.frameRate);
        this.setupTank();
    }

    draw() {
        // this.sketch.background(0);
        this.spawner();

        this.sketch.clear();
        for (const quadrant of this.tank) {
            for (const entity of quadrant) {
                entity.draw();
                entity.update();
                // mini reset?
                this.sketch.strokeWeight(this.strokeWeight);
            }
        }
    }

    spawner() {
        // we should consider adding an entity based on a random value
        const spawnFood = this.sketch.random();
        if (spawnFood < 0.05) {
            const food = this.createFood();
            this.tank[food.properties.quadrant].push(food);
        }
        const spawnFish = this.sketch.random();
        if (spawnFish < 0.01) {
            const fish = this.createFish();
            this.tank[fish.properties.quadrant].push(fish);
        }
    }

    // every entity should have a properties,type, and draw
    createEntity(props) {
        const id = `${Math.random()}`.slice(0, 5)
        // here is where we place in quadrant
        const quadrant = this.getQuadrant(props.pos.x);
        return {
            update: () => { },
            draw: () => { },
            properties: {
                id,
                quadrant,
                ...props
            }
        }
    }
    getRandomPos() {
        return {
            x: this.sketch.random(this.sketch.width),
            y: this.sketch.random(this.sketch.height),
        }
    }

    // a fish should be moving around.
    createFish() {
        const { x, y } = this.getRandomPos();

        const pos = this.sketch.createVector(x, y);
        const props = {
            type: entityTypes.FISH,
            pos,
            size: 2,
            speed: 0.75,
            sightRadius: 50,
            status: "wandering",
            target: null
        }
        const vel = this.sketch.createVector(props.speed, props.speed);
        const thisEntity = this.createEntity(props)
        const { properties: fish } = thisEntity;
        // fish should keep going in a random direction
        thisEntity.draw = () => {
            if (this.debug) {
                this.sketch.noStroke();
                this.sketch.fill('rgba(255,100,0,0.5)');
                this.sketch.circle(fish.pos.x, fish.pos.y, fish.sightRadius)
                this.sketch.stroke('white');
                this.sketch.strokeWeight(0.5);
                this.sketch.textSize(5)
                const fishDebugText = JSON.stringify({
                    id: fish.id,
                    x: `${fish.pos.x}`.slice(0, 5),
                    y: `${fish.pos.y}`.slice(0, 5),
                    quadrant: fish.quadrant,
                });
                this.sketch.text(fishDebugText, fish.pos.x, fish.pos.y)

                if (fish.target) {
                    // draw a line from this fish to the current focus
                    this.sketch.strokeWeight(1);
                    this.sketch.stroke('white');
                    this.sketch.line(fish.pos.x, fish.pos.y, fish.target.pos.x, fish.target.pos.y)
                }
            }
            // lets draw a circle around 
            this.sketch.stroke('orange');
            this.sketch.circle(fish.pos.x, fish.pos.y, fish.size);
        }

        thisEntity.update = () => {
            // reflect stuff

            if (this.sketch.floor(fish.pos.x) <= 0) {
                const surfaceNormal = this.sketch.createVector(1, 0);
                vel.reflect(surfaceNormal);
            }
            if (this.sketch.floor(fish.pos.y) <= 0) {
                // we should reflect the y velocity
                const surfaceNormal = this.sketch.createVector(0, 1);
                vel.reflect(surfaceNormal)
            }
            if (fish.pos.x >= this.sketch.width) {
                const surfaceNormal = this.sketch.createVector(-1, 0);
                vel.reflect(surfaceNormal)
            }
            if (fish.pos.y >= this.sketch.height) {
                const surfaceNormal = this.sketch.createVector(0, -1);
                vel.reflect(surfaceNormal)
            }

            const quadrant = this.tank[fish.quadrant];
            for (let j = 0; j < quadrant.length; j++) {
                const entity = quadrant[j].properties;
                if (entity.id !== fish.id) {

                    // also consider the radius of the other fish? maybe
                    // check if distance is within the radius?
                    const distance = fish.pos.dist(entity.pos);

                    // what we should do is check if they are within distance of each other radius wise
                    const targetSize = entity.size;
                    if (distance + targetSize <= fish.size) {
                        console.log({ targetSize, targetType: entity.type, oursize: fish.size, distance })
                        console.log("hit something")
                        if (entity.type === entityTypes.FOOD) {
                            console.log('should be eating food')
                            fish.status = 'wandering'
                            quadrant.splice(j, 1);
                            fish.size += 1;
                            fish.sightRadius += 3;
                            fish.speed -= 0.01;
                            fish.target = null;
                            // we should remove this entity from our list
                        } else {
                            if (fish.size > entity.size) {
                                fish.status = 'wandering'
                                quadrant.splice(j, 1)
                                fish.size += entity.size;
                                fish.speed -= 0.02;
                                fish.sightRadius += 5;
                                fish.target = null;
                            }
                            // this means that the fish touched each other?
                        }
                        break;

                    }

                    if (distance <= fish.sightRadius) {

                        // if its a fish or food, lets target it. if its an equal size fish, lets not
                        if ((entity.type === entityTypes.FISH && fish.size < entity.size)) {
                            fish.target = fish.target && fish.pos.dist(entity.pos) > fish.pos.dist(fish.target.pos) ? entity : fish.target;
                        }

                        if (!fish.target || (fish.target.type !== entityTypes.FISH && fish.target.size < fish.size)) {
                            // prioritize eating other fish over food
                            if (entity.type === entityTypes.FISH && entity.size < fish) {
                                if (fish.target) {
                                    fish.target = fish.pos.dist(entity.pos) < fish.pos.dist(fish.target.pos) ? entity : fish.target;
                                } else {
                                    fish.target = entity;
                                }
                            } else {
                                if (fish.target) {
                                    fish.target = fish.pos.dist(entity.pos) < fish.pos.dist(fish.target.pos) ? entity : fish.target;
                                } else {
                                    fish.target = entity;
                                }
                            }
                        }

                        if (fish.target) {
                            // if we have a current focus
                            if (entity.type === entityTypes.FISH && fish.target.type !== entityTypes.FISH) {
                                fish.target = entity
                            }
                            if (entity.type === entityTypes.FISH && fish.target.type === entityTypes.FISH) {
                                if (entity.size < fish.size) {
                                    fish.target = entity;
                                }
                                // lets focus on not getting eaten.
                            }
                            // we should want to get the food
                            fish.target = distance < fish.pos.dist(fish.target.pos) ? entity : fish.target;
                        } else {
                            fish.target = entity;
                        }
                    }

                }
            }
            if (fish.target) {

                // lets check if the current focus is a fish
                if (fish.target.type === entityTypes.FISH) {
                    if (fish.target.size < fish.size) {
                        fish.status = 'hunting'
                        const acc = this.sketch.Vector.sub(fish.target.pos, fish.pos);
                        acc.setMag(5);
                        vel.add(acc);
                        vel.limit(fish.speed);
                    } else if (fish.target.size > fish.size) {
                        fish.status = 'fleeing'
                    } else {
                        fish.target = null;
                    }
                } else {
                    fish.status = 'scavenging';
                    const acc = this.sketch.Vector.sub(fish.target.pos, fish.pos);
                    acc.setMag(5);
                    vel.add(acc);
                    vel.limit(fish.speed);
                }
            }

            fish.pos.add(vel);
            const newQuadrant = this.getQuadrant(fish.pos.x);
            if (newQuadrant !== fish.quadrant) {
                let fishIndex;
                for (let k = 0; k < quadrant.length; k++) {
                    const ent = quadrant[k].properties;
                    if (ent.id === fish.id) {
                        fishIndex = k;
                        break;
                    }
                }
                quadrant.splice(fishIndex, 1);
                this.tank[newQuadrant].push(thisEntity);
                fish.quadrant = newQuadrant;
            }
        }


        return thisEntity;
    }
    createFood() {
        const { x, y } = this.getRandomPos();
        const pos = this.sketch.createVector(x, y)

        const props = {
            type: entityTypes.FOOD,
            pos,
            size: 1
        }

        const entity = this.createEntity(props)
        entity.draw = () => {
            this.sketch.stroke('white');
            this.sketch.strokeWeight(entity.properties.size);
            this.sketch.point(entity.properties.pos.x, entity.properties.pos.y);
        };
        return entity;
    }
    // based on x (and y later), lets return the appropriate quadrant
    getQuadrant(x, y) {
        const quadrant = this.sketch.floor(this.sketch.map(x, 0, this.sketch.width, 0, this.quadrants - 0.1))
        return quadrant
    }
    // an entity should do things while it's in the scope.
    setupTank() {
        // create tank based on quadrant numbers
        for (let i = 0; i < this.quadrants; i++) {
            this.tank.push([]);
        }
        for (let i = 0; i < this.startingFishNum; i++) {
            const fish = this.createFish();
            this.tank[fish.properties.quadrant].push(fish);
        }
        for (let i = 0; i < this.startingFoodNum; i++) {
            const food = this.createFood();
            this.tank[food.properties.quadrant].push(food);
            // const fish = this.createFish();
            // this.tank.push(fish);
        }
        // lets create a bunch of tank
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
            {/* <Guide links={[HOME]} /> */}
            <div id='main_sketch' className={styles.sketch_container}>
            </div>
            {/* <Guide
                startRight
                links={[ABOUT, PROJECTS,]} /> */}
        </div>
    )
}

export default Home;