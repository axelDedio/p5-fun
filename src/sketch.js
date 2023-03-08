import p5 from "p5";
// import "p5/lib/addons/p5.sound";
import { FunnyMover } from "./funnyMover";
// import { width, height } from "./helper";
import { Oscillator } from "./oscillator";

const width = 500;
const height = 500;
const fr = 60;
let sliderX;
let sliderY;
let sliderZ;
const sketch = (/** @type {p5} */ p) => {
    p.setup = () => {
        p.createCanvas(width, height, p.WEBGL);
        p.background(0);
        p.frameRate(fr);
        sliderX = p.createSlider(-10000, 10000, 0);
        sliderY = p.createSlider(-10000, 10000, 0);
        sliderZ = p.createSlider(-10000, 10000, 0);
    };
    let roff = 0;
    let off = 0;
    p.draw = () => {
        p.background(0);
        p.camera(
            sliderX.value(),
            sliderY.value(),
            sliderZ.value(),
            0,
            0,
            0,
            0,
            1,
            0
        );
        // p.rotateX(p.PI / 3);
        // p.rotateZ(-p.PI / 1.5);
        // p.rotateY(-p.PI / 4);

        p.noFill();
        p.stroke(p.color("white"));
        for (let i = -800; i < 800; i += 10) {
            let dz = p.cos(roff + i / 100) * 200;
            p.stroke(255, 255, 255, i);
            p.line(-8000, i, dz, 8000, i, dz);
        }
        roff -= 0.1;
        off += 10;
    };
};

let myp5 = new p5(sketch, document.querySelector(".centerbox"));
