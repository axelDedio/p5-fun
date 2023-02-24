import p5 from "p5";
import "p5/lib/addons/p5.sound";
import Mover, { dims } from "./mover";
const width = dims.width;
const height = dims.height;
console.log("width: ", width);
console.log("height: ", height);

const fr = 80;
const iv = 50;
const sketch = (/** @type {p5} */ p) => {
    const moverA = new Mover(p, 6, "red", width / 2, 100, iv, 0);
    const moverB = new Mover(p, 6, "blue", width / 2, 300, -iv, 0);
    const moverC = new Mover(p, 6, "blue", width / 2, 500, -iv, 0);
    const moverD = new Mover(p, 6, "green", width / 2, 300, iv);
    const movers = [];
    movers.push(moverA);
    movers.push(moverB);
    movers.push(moverC);
    movers.push(moverD);

    p.setup = () => {
        p.createCanvas(width, height);
        p.background(0);
        p.frameRate(fr);
    };

    p.draw = () => {
        p.noStroke();
        p.background(0, 5);
        p.fill(p.color("yellow"));
        // sun.display();
        // sun.update();
        for (let mover of movers) {
            for (let other of movers) {
                if (other !== mover) {
                    mover.calculateAttraction(other);
                    p.stroke(255);
                    p.line(
                        mover.location.x,
                        mover.location.y,
                        other.location.x,
                        other.location.y
                    );
                }
            }
            // mover.handleDrag();
            mover.update();
            // mover.display();
        }
    };
};

let myp5 = new p5(sketch, document.querySelector(".centerbox"));
