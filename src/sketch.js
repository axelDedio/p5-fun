import p5 from "p5";
import "p5/lib/addons/p5.sound";
import Mover, { dims } from "./mover";
const width = dims.width;
const height = dims.height;
console.log("width: ", width);
console.log("height: ", height);

const fr = 600;
const iv = 7;
const sketch = (/** @type {p5} */ p) => {
    const movers = [];

    p.setup = () => {
        p.createCanvas(width, height);
        p.background(0);
        p.frameRate(fr);
    };
    for (let i = 0; i < 100; i++) {
        let start = p5.Vector.random2D();
        let initialVel = start.copy();
        initialVel.rotate(p.PI / 2);
        start.setMag(p.random(100, 100));
        initialVel.setMag(p.random(10, 15));
        const mover = new Mover(p, 2, "white", start, initialVel);
        movers.push(mover);
    }
    const sun = new Mover(
        p,
        210,
        "yellow",
        p.createVector(0, 0),
        p.createVector(0, 0)
    );

    p.draw = () => {
        p.background(0, 30);
        p.translate(width / 2, height / 2);
        // sun.display();
        for (let mover of movers) {
            mover.calculateAttraction(sun);
            // sun.calculateAttraction(mover);
            for (let other of movers) {
                if (other !== mover) {
                    mover.calculateAttraction(other);
                }
            }
            mover.handleDrag(0.001);
            mover.update();
            mover.display();
        }
    };
};

let myp5 = new p5(sketch, document.querySelector(".centerbox"));
