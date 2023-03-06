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
    let offR = 0;
    let off = 0;
    p.draw = () => {
        p.background(0);
        p.translate(width / 2, height / 2);
        p.rotate(-p.PI / 2);
        p.noFill();
        p.stroke(255);
        let rf = p.map(p.sin(offR), -1, 1, 0, 20);
        for (let r = 0; r < 100; r += 10) {
            p.beginShape();
            for (let a = 0; a < p.TAU; a += 0.03) {
                let vex = p.createVector(p.cos(a) * r * rf, p.sin(a) * r * rf);
                // vex.normalize();
                vex.setMag(vex.mag() + p.sin(a * 8) * 20);
                // p.line(0, 0, vex.x, vex.y);
                p.vertex(vex.x, vex.y);
            }
            p.endShape("close");
        }
        off += 0.2;
        offR += 0.02;
    };
};

let myp5 = new p5(sketch, document.querySelector(".centerbox"));
