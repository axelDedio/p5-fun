import p5 from "p5";
import "p5/lib/addons/p5.sound";
import { YellowParticle } from "./particle";
import { width, height } from "./helper";

const fr = 600;
const iv = 7;
const sketch = (/** @type {p5} */ p) => {
    const movers = [];

    p.setup = () => {
        p.createCanvas(width, height);
        p.background(0);
        p.frameRate(fr);
    };

    movers.push(new YellowParticle(p));
    movers.push(new YellowParticle(p));
    movers.push(new YellowParticle(p));
    movers.push(new YellowParticle(p));
    movers.push(new YellowParticle(p));
    movers.push(new YellowParticle(p));
    movers.push(new YellowParticle(p));
    movers.push(new YellowParticle(p));
    movers.push(new YellowParticle(p));
    movers.push(new YellowParticle(p));
    p.draw = () => {
        p.background(0, 60);
        for (let mover of movers) {
            for (let other of movers) {
                if (other !== mover) {
                    mover.calculateForce(other);
                }
            }
            mover.update();
            mover.handleEdge();
            mover.display();
        }
    };
};

let myp5 = new p5(sketch, document.querySelector(".centerbox"));
