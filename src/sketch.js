import p5 from "p5";
import { width, height } from "./helper";
import NoiseGenerator from "./noiseGenerator";
import Particle from "./particle";
import { WaveGenerator } from "./waveGenerator";

const fr = 60;
let slider;
let sliderInc;
const particles = [];
let frp;
const sketch = (/** @type {p5} */ p) => {
    const boxSize = 20;
    const noiseGen = new NoiseGenerator(p, boxSize);
    const points = [];

    p.setup = () => {
        p.createCanvas(width, height, p.WEBGL);
        p.background(255);
        p.frameRate(fr);
        sliderInc = p.createSlider(0.0001, 0.8, 0.2, 0.0001);
        frp = p.createP("");
        for (let y = 0; y < height / boxSize; y++) {
            for (let x = 0; x < width / boxSize; x++) {
                points.push({ x, y });
            }
        }
    };
    const mapNoise = (x, y) => {
        return p.map(noiseGen.getNoise(x, y), -1, 1, 0, 100);
    };
    p.draw = () => {
        p.background(255, 2);
        p.translate(-width / 2, -height / 2);
        points.forEach((point, i, ps) => {
            let nv = mapNoise(point.x, point.y);
            p.push();
            p.translate(point.x * boxSize, point.y * boxSize);
            p.strokeWeight(2);
            p.strokeCap("ROUND");
            p.point(0, 0, nv);
            p.pop();
        });
        // particles.forEach((particle) => {
        //     particle.update();
        //     particle.display();
        //     particle.handleEdge();
        //     let ni = mapNoise(
        //         p.round(particle.location.x / boxSize),
        //         p.round(particle.location.y / boxSize)
        //     );
        //     let force = p5.Vector.fromAngle(ni);
        //     force.mult(2);
        //     particle.applyForce(force);
        // });

        noiseGen.update(sliderInc.value());
        if (p.frameCount % 10 == 0) {
            frp.html(`${p.floor(p.frameRate())}, ${sliderInc.value()}`);
        }
    };
};

let myp5 = new p5(sketch, document.querySelector(".centerbox"));
