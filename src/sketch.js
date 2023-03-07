import p5 from "p5";
// import "p5/lib/addons/p5.sound";
import { FunnyMover } from "./funnyMover";
// import { width, height } from "./helper";
import { Oscillator } from "./oscillator";

const width = 500;
const height = 500;
const fr = 60;

const sketch = (/** @type {p5} */ p) => {
    p.setup = () => {
        p.createCanvas(width, height, p.WEBGL);
        p.background(0);
        p.frameRate(fr);
    };
    let roff = 0;
    let off = 0;
    p.draw = () => {
        p.background(0);
        p.rotateX(p.PI / 2);
        p.rotateZ(-p.PI / 1.5);
        // p.rotateY(-p.PI / 4);

        p.noFill();
        p.stroke(p.color("white"));
        for (let i = -800; i < 800; i += 5) {
            let dz = p.sin(roff + i / 200) * 200;
            let dy = p.cos(roff + i / 200) * 200;
            p.stroke(255, 255, 255, i);
            p.line(-1000, i, dy, 1000, i, dy);
        }
        roff -= 0.01;
        // off -= 0.001;
    };
};

let myp5 = new p5(sketch, document.querySelector(".centerbox"));
