import p5 from "p5";
import "p5/lib/addons/p5.sound";
import { FunnyMover } from "./funnyMover";
import { width, height } from "./helper";
import { Oscillator } from "./oscillator";

const fr = 60;

const sketch = (/** @type {p5} */ p) => {
    p.setup = () => {
        p.createCanvas(width, height);
        p.background(0);
        p.frameRate(fr);
    };
    const wave = new Oscillator(p, 200, 0, width);
    const fish = [];
    p.draw = () => {
        p.background(0);
        p.translate(0, height / 2);
        for (let x = 0; x < width; x += 5) {
            p.circle(x, wave.get(x), 5);
            wave.update();
        }

        // spacecraft.display();
        // spacecraft.update();
        // if (p.mouseIsPressed) {
        //     let mouse = p.createVector(p.mouseX, p.mouseY);
        //     let force = mouse.sub(spacecraft.location);
        //     force.setMag(0.1);
        //     spacecraft.applyForce(force);
        // }
        // spacecraft.handleEdge();
    };
};

let myp5 = new p5(sketch, document.querySelector(".centerbox"));
