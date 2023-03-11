import p5 from "p5";
import { width, height } from "./helper";
import NoiseGenerator from "./noiseGenerator";
import { WaveGenerator } from "./waveGenerator";

const fr = 60;
let slider;
const sketch = (/** @type {p5} */ p) => {
    p.setup = () => {
        p.createCanvas(width, height, p.WEBGL);
        p.background(0);
        p.frameRate(fr);
        slider = p.createSlider(0, p.PI / 2, p.PI / 2, 0.01);
    };

    // const noiseGen = new NoiseGenerator(p, 200, 200);
    const waveGen = new WaveGenerator(p, 1, 40, 160);
    p.draw = () => {
        p.background(0);
        p.rotateX(slider.value());
        p.translate(-400, -25);
        for (let y = 0; y < 5; y++) {
            for (let x = 0; x <= 160; x++) {
                let nv = p.map(waveGen.get(x), -1, 1, 0, 30);
                // nv += p.map(waveGen2.get(x), -1, 1, 0, 30);
                // nv += p.map(waveGen3.get(x), -1, 1, 0, 30);
                p.fill(255, p.map(nv, 0, 100, 0, 255), 0, 255);
                // p.noStroke();
                p.push();
                p.translate(x * 5, y * 5, nv / 2);
                p.box(5, 5, nv);
                p.pop();
            }
        }

        waveGen.update(50);
        if (p.frameCount % 120 == 0) {
            console.log(p.frameRate());
        }
    };
};

let myp5 = new p5(sketch, document.querySelector(".centerbox"));
