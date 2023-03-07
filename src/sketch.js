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
    const wave = new Oscillator(p, 20, 20, 2000);
    const fish = [];
    let off = 0;
    let ampOff = 0;
    const freq = 0.5;
    let roff = 0;
    const lines = 30;
    p.draw = () => {
        p.background(0);
        p.rotateX(p.PI / 3);
        p.translate(-width / 2, -height / 2);
        p.noFill();
        p.stroke(p.color("white"));
        for (let i = 0.5; i <= 20; i++) {
            p.beginShape();
            for (let x = 0; x <= width; x += 1) {
                p.vertex(
                    x,
                    i * 20 +
                        p.map(p.sin((i * p.TAU * x) / width), -1, 1, -off, off),
                    5
                );
                ampOff += 0.01;
                off = p.map(p.sin((p.TAU * ampOff) / 6000), -1, 1, -5, 5);
            }
            p.endShape();
        }
        console.log(p.frameRate());
        // roff += 0.001;

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
