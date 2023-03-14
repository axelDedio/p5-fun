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
    const boxSize = 15;
    const noiseGen = new NoiseGenerator(p, boxSize);

    p.setup = () => {
        p.createCanvas(width, height);
        p.background(255);
        p.frameRate(fr);
        sliderInc = p.createSlider(0.0001, 0.8, 0.14, 0.0001);
        frp = p.createP("");
        for (let i = 0; i < 3000; i++) {
            particles.push(new Particle(p));
        }
    };
    const mapNoise = (x, y) => {
        return p.map(noiseGen.getNoise(x, y), -1, 1, 0, p.TAU * 2);
    };
    p.draw = () => {
        // p.background(255, 2);

        // for (let y = 0; y < height / boxSize; y++) {
        //     for (let x = 0; x < width / boxSize; x++) {
        //         let nv = mapNoise(x, y);
        //         p.push();
        //         p.translate(x * boxSize, y * boxSize);
        //         p.rotate(nv);
        //         p.strokeWeight(0.1);
        //         p.line(0, 0, boxSize, 0);
        //         p.pop();
        //     }
        // }
        particles.forEach((particle) => {
            particle.update();
            particle.display();
            particle.handleEdge();
            let ni = mapNoise(
                p.round(particle.location.x / boxSize),
                p.round(particle.location.y / boxSize)
            );
            let force = p5.Vector.fromAngle(ni);
            force.mult(1);
            particle.applyForce(force);
        });

        noiseGen.update(sliderInc.value());
        if (p.frameCount % 10 == 0) {
            frp.html(`${p.floor(p.frameRate())}, ${sliderInc.value()}`);
        }
    };
};

let myp5 = new p5(sketch, document.querySelector(".centerbox"));
