import p5 from "p5";
import { width, height } from "./helper";
import NoiseGenerator from "./noiseGenerator";

const fr = 60;
let slider;
const sketch = (/** @type {p5} */ p) => {
    p.setup = () => {
        p.createCanvas(width, height, p.WEBGL);
        p.background(0);
        p.frameRate(fr);
        slider = p.createSlider(0, p.PI / 2, 0, 0.01);
    };

    const noiseGen = new NoiseGenerator(p, 100, 100);
    p.draw = () => {
        p.background(0);
        p.rotateX(slider.value());
        // p.translate(-200, -200);
        // for (let y = 0; y < 40; y++) {
        //     for (let x = 0; x < 40; x++) {
        //         let nv = noiseGen.getNoise(x, y);
        //         p.fill(255, 255, 255, nv);
        //         p.noStroke();
        //         p.rect(x * 10, y * 10, 10);
        //     }
        // }
        for (let i = 1; i < 20; i++) {
            p.beginShape();
            for (let phi = 0; phi < p.TAU; phi += 0.04) {
                let r = 5 * i;
                let x = p.sin(phi) * r;
                let y = p.cos(phi) * r;
                let z = noiseGen.getNoise(p.round(p.abs(x)), p.round(p.abs(y)));
                // p.stroke(255 - z * 4, 0, 255);
                p.noFill();
                p.stroke(p.color("white"));
                p.vertex(x, y, z);
            }
            p.endShape();
        }
        noiseGen.update();
    };
};

let myp5 = new p5(sketch, document.querySelector(".centerbox"));
