import p5 from "p5";
import "p5/lib/addons/p5.sound";
import { width, height } from "./helper";

const fr = 60;

const sketch = (/** @type {p5} */ p) => {
    p.setup = () => {
        p.createCanvas(width, height);
        p.background(0);
        p.frameRate(fr);
    };
    const r = height / 4;
    p.draw = () => {
        p.background(0);
        p.push();
        p.translate(width / 2, height / 2);
        p.rotate(-p.PI / 2);
        p.noFill();
        p.stroke(255);
        let sides = 3000;
        let amp = p.map(p.mouseX, 0, width, 2, 200);
        p.beginShape();
        for (let a = 0, i = 0; a < p.TAU, i < sides; a += p.TAU / sides, i++) {
            let vex = p.createVector(p.cos(a), p.sin(a));
            vex.setMag(r).add(p.sin(a * amp) * 20);
            p.vertex(vex.x, vex.y);
        }
        p.endShape("close");
        p.pop();
    };
};

let myp5 = new p5(sketch, document.querySelector(".centerbox"));
