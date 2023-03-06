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
    let a = 0;
    let d = 1;

    p.draw = () => {
        p.background(0);
        p.translate(width / 2, height / 2);
        p.stroke(255);
        for (let i = 0; i < 500; i += 5) {
            a += (p.PI / 5000) * d;
            // if (a >= p.PI) {
            //     d = -d;
            // }
            // if (a <= 0) {
            //     d = -d;
            // }
            p.circle(p.cos(a * (i / 200)) * i, p.sin(a * (i / 200)) * i, 5);
            // p.line(
            //     p.cos(a * (i / 200)) * i,
            //     p.sin(a * (i / 200)) * i,
            //     p.cos(a * ((i - 5) / 200)) * (i - 5),
            //     p.sin(a * ((i - 5) / 200)) * (i - 5)
            // );
        }
    };
};

let myp5 = new p5(sketch, document.querySelector(".centerbox"));
