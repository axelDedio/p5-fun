import p5 from "p5";
import "p5/lib/addons/p5.sound";
import { YellowParticle } from "./particle";
import { width, height } from "./helper";

const fr = 60;
export const eq = (x) => {
    const y = p5.prototype.pow(50 / x, 3) - p5.prototype.pow(50 / x, 2);
    return 40 * y;
};
const sketch = (/** @type {p5} */ p) => {
    const movers = [];

    p.setup = () => {
        p.createCanvas(width, height);
        p.background(0);
        p.frameRate(fr);
    };
    for (let x = 1; x < 50; x++) {
        movers.push(new YellowParticle(p));
    }

    p.draw = () => {
        p.background(0, 100);
        for (let mover of movers) {
            for (let other of movers) {
                if (other !== mover) {
                    mover.calculateForce(other);
                    p.strokeWeight(2);
                    p.stroke(255, 255, 255);
                    p.line(other.x, other.y, mover.x, mover.y);
                }
            }
            mover.update();
            mover.handleEdge();
            mover.display();
        }

        p.translate(0, height / 2);
        p.strokeWeight(2);
        p.stroke(255, 255, 255);
        for (let x = 1; x < width; x++) {
            p.point(x, eq(x));
            p.point(x, 0);
            p.point(10, x);
        }
    };
};

let myp5 = new p5(sketch, document.querySelector(".centerbox"));
