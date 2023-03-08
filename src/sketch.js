import p5 from "p5";
// import "p5/lib/addons/p5.sound";
import { FunnyMover } from "./funnyMover";
// import { width, height } from "./helper";
import { Oscillator } from "./oscillator";

const width = 500;
const height = 500;
const fr = 60;
let slider;
const sketch = (/** @type {p5} */ p) => {
    p.setup = () => {
        p.createCanvas(width, height, p.WEBGL);
        p.background(0);
        p.frameRate(fr);
        slider = p.createSlider(0, p.PI / 2, 0, 0.01);
    };
    let roff = 0;
    let off = 0;
    p.draw = () => {
        p.background(0);
        p.rotateX(slider.value());
        // p.rotateZ(-p.PI / 1.5);
        // p.rotateY(-p.PI / 4);

        p.noFill();
        p.stroke(p.color("white"));

        for (let i = 0; i < 70; i++) {
            p.beginShape();
            for (let phi = 0; phi < p.TAU; phi += 0.1) {
                let r = 3 * i;
                let x = p.sin(phi) * r;
                let y = p.cos(phi) * r;
                let z = p.cos(roff + i * (p.TAU / 70)) * ((70 - i) * 2);
                p.stroke(255 - z * 4, 0, 255);
                p.vertex(x, y, z);
            }
            p.endShape("close");
        }
        roff += 0.02;
        // off -= 0.001;
    };
};

let myp5 = new p5(sketch, document.querySelector(".centerbox"));
