import p5 from "p5";
import { width, height } from "./helper";
import NoiseGenerator from "./noiseGenerator";
import Particle from "./particle";
import { WaveGenerator } from "./waveGenerator";

const fr = 60;
let slider;
let sliderInc;
const particles = [];

const sketch = (/** @type {p5} */ p) => {
    const noiseGen = new NoiseGenerator(p, 20);
    const boxSize = 20;

    p.setup = () => {
        p.createCanvas(width, height);
        p.background(0);
        p.frameRate(fr);
        sliderInc = p.createSlider(0.0001, 0.4, 0.07, 0.0001);

        for (let i = 0; i < 500; i++) {
            particles.push(new Particle(p));
        }
    };
    const mapNoise = (x, y) => {
        return p.map(noiseGen.getNoise(x, y), -1, 1, -p.PI, p.PI);
    };
    p.draw = () => {
        p.background(255);

        for (let y = 0; y < height / boxSize; y++) {
            for (let x = 0; x < width / boxSize; x++) {
                let nv = mapNoise(x, y);
                p.push();
                p.translate(x * boxSize, y * boxSize);
                p.rotate(nv);
                p.line(0, 0, boxSize, 0);
                p.pop();
            }
        }
        particles.forEach((particle) => {
            particle.display();
            particle.handleEdge();
            let ni = mapNoise(
                p.round(particle.location.x / boxSize),
                p.round(particle.location.y / boxSize)
            );
            let force = p5.Vector.fromAngle(ni);
            force.mult(20);
            particle.applyForce(force);
            particle.update();
        });

        noiseGen.update(sliderInc.value());
        if (p.frameCount % 120 == 0) {
            console.log(p.frameRate());
        }
    };
};

let myp5 = new p5(sketch, document.querySelector(".centerbox"));
