import p5 from "p5";
import "p5/lib/addons/p5.sound";
import Mover, { dims } from "./mover";
const width = dims.width;
const height = dims.height;
console.log("width: ", width);
console.log("height: ", height);

const fr = 80;
const iv = 7;
const sketch = (/** @type {p5} */ p) => {
    const movers = [];

    p.setup = () => {
        p.createCanvas(width, height);
        p.background(0);
        p.frameRate(fr);
    };
    for (let i = 0; i < 200; i++) {
        let start = p5.Vector.random2D();
        let initialVel = start.copy();
        initialVel.rotate(p.PI / 2);
        start.setMag(p.random(200, 300));
        initialVel.setMag(p.random(5, 15));
        const mover = new Mover(p, 2, "white", start, initialVel);
        console.log(mover);
        movers.push(mover);
    }
    console.log(movers);

    p.draw = () => {
        p.background(0, 20);
        p.translate(width / 2, height / 2);

        for (let mover of movers) {
            for (let other of movers) {
                if (other !== mover) {
                    mover.calculateAttraction(other);
                }
            }
            // mover.handleDrag();
            mover.update();
            mover.display();
        }
    };
};

let myp5 = new p5(sketch, document.querySelector(".centerbox"));
