import p5 from "p5";
import { width, height } from "./helper";
import NoiseGenerator from "./noiseGenerator";
import { WaveGenerator } from "./waveGenerator";

const fr = 60;
let slider;
let sliderInc;
const sketch = (/** @type {p5} */ p) => {
    p.setup = () => {
        p.createCanvas(width, height, p.WEBGL);
        p.background(0);
        p.frameRate(fr);
        slider = p.createSlider(0, p.PI / 2, p.PI / 3, 0.01);
        sliderInc = p.createSlider(0.0001, 0.4, 0.07, 0.0001);
    };

    const noiseGen = new NoiseGenerator(p, 200, 200);
    const boxSize = 20;
    const getFill = (z) => {
        if (z > 85) {
            p.fill(p.color("white"));
        } else if (z > 75) {
            p.fill(p.color("grey"));
        } else if (z > 60) {
            p.fill(153, 102, 51);
        } else if (z > 30) {
            p.fill(p.color("green"));
        } else if (z > 25) {
            p.fill(255, 255, 153);
        } else {
            p.fill(p.color("blue"));
        }
    };
    p.draw = () => {
        p.background(0);
        p.rotateX(slider.value());
        p.translate(-300, -300);
        for (let y = 0; y < 30; y++) {
            for (let x = 0; x <= 30; x++) {
                let nv = p.map(noiseGen.getNoise(x, y), -1, 1, 0, 100);
                getFill(nv);
                p.push();
                p.translate(x * boxSize, y * boxSize, nv / 2);
                p.box(boxSize, boxSize, nv);
                p.pop();
            }
        }

        noiseGen.update(sliderInc.value());
        if (p.frameCount % 120 == 0) {
            console.log(p.frameRate());
        }
    };
};

let myp5 = new p5(sketch, document.querySelector(".centerbox"));
