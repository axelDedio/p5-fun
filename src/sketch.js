import p5 from "p5";
import "p5/lib/addons/p5.sound";
import Mover, { dims } from "./mover";
const width = dims.width;
const height = dims.height;
console.log("width: ", width);
console.log("height: ", height);

const fr = 80;
const gravity = 0.2;

const sketch = (/** @type {p5} */ p) => {
    const moverA = new Mover(p, 10, "red");
    const moverB = new Mover(p, 15, "blue");
    const moverC = new Mover(p, 20, "green");
    const movers = [];
    movers.push(moverA);
    movers.push(moverB);
    movers.push(moverC);

    p.setup = () => {
        console.log("h");

        p.createCanvas(width, height);
        p.frameRate(fr);
    };

    p.draw = () => {
        p.noStroke();
        p.createCanvas(width, height);
        p.background(255);
        p.fill(p.color("grey"));
        p.rect(width / 2, 0, width / 2, height);
        for (let mover of movers) {
            mover.display();
            mover.drawVectors();
            mover.handleDrag();
            mover.update();
            mover.handleEdge();
            mover.applyForce(new p.createVector(0, gravity).mult(mover.mass));
        }
    };
};

let myp5 = new p5(sketch, document.querySelector(".centerbox"));
