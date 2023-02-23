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
    const moverA = new Mover(p, 8, "red");
    const moverB = new Mover(p, 15, "blue");
    const moverC = new Mover(p, 20, "green");
    const movers = [];
    movers.push(moverA);
    movers.push(moverB);
    movers.push(moverC);

    p.setup = () => {
        p.createCanvas(width, height);
        p.background(0);
        p.frameRate(fr);
    };

    p.draw = () => {
        p.noStroke();
        p.background(0, 50);

        for (let mover of movers) {
            mover.handleEdge();

            mover.update();
            mover.display();
        }
    };
};

let myp5 = new p5(sketch, document.querySelector(".centerbox"));
