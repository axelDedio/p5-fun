import p5 from "p5";
import { width, height } from "./helper";

import vert from "./shader.vert";
import frag from "./shader.frag";
let frp;

const sketch = (/** @type {p5} */ p) => {
    let theShader;

    p.setup = () => {
        p.createCanvas(width, height, p.WEBGL);
        theShader = p.createShader(vert, frag);
        p.shader(theShader);
        frp = p.createP("");
        p.noStroke();
    };
    p.draw = () => {
        theShader.setUniform("u_resolution", [width, height]);
        theShader.setUniform("u_time", p.frameCount / 100);
        theShader.setUniform("mouseY", p.map(p.mouseY, 0, width, 0, 1));
        p.rect(1000, 1000, 10, 10);
        if (p.frameCount % 10 == 0) {
            frp.html(`${p.floor(p.frameRate())}`);
        }
    };
};

let myp5 = new p5(sketch, document.querySelector(".centerbox"));
