import p5 from "p5";
import "p5/lib/addons/p5.sound";
import { FunnyMover } from "./funnyMover";
import { width, height } from "./helper";

const fr = 60;

const sketch = (/** @type {p5} */ p) => {
    p.setup = () => {
        p.createCanvas(width, height);
        p.background(0);
        p.frameRate(fr);
    };
    const spacecraft = new FunnyMover(p);
    const fish = [];
    p.draw = () => {
        p.background(0);
        // p.translate(width / 2, height / 2);
        spacecraft.display();
        spacecraft.update();
        if (p.mouseIsPressed) {
            let mouse = p.createVector(p.mouseX, p.mouseY);
            let force = mouse.sub(spacecraft.location);
            force.setMag(0.1);
            spacecraft.applyForce(force);
        }
        spacecraft.handleEdge();
    };
};

let myp5 = new p5(sketch, document.querySelector(".centerbox"));
