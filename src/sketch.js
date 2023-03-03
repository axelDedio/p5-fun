import p5 from "p5";
import "p5/lib/addons/p5.sound";
import Mover from "./mover";
import { width, height } from "./helper";

const fr = 60;

const sketch = (/** @type {p5} */ p) => {
    const movers = [];

    p.setup = () => {
        p.createCanvas(width, height);
        p.background(0);
        p.frameRate(fr);
    };
    const spacecraft = new Mover(p);
    let offset = 0;
    p.draw = () => {
        p.background(0, 40);
        spacecraft.display();
        spacecraft.update();
        spacecraft.applyForce(p.createVector(0, 0.05).mult(spacecraft.mass));
        spacecraft.applyForce(
            p.createVector(p.map(p.noise(offset), 0, 1, -0.06, 0.06), 0)
        );
        offset += 0.03;

        p.rect(width / 2 - 30, height - 20, 60, 50);
    };
};

let myp5 = new p5(sketch, document.querySelector(".centerbox"));
