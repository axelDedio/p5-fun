import { height, width } from "./helper";
import p5 from "p5";
import Mover from "./mover";
import { eq } from "./sketch";
export class WindParticle extends Mover {
    constructor(/** @type {p5} */ p, r) {
        super(
            p,
            new p.createVector(p.random(0, width), p.random(0, height)),
            new p.createVector(0, 0),
            new p.createVector(0, 0),
            0.01
        );

        this.r = r;
    }
    display() {
        this.p.push();
        this.p.noFill();
        this.p.stroke(this.p.color("white"));
        this.p.ellipse(this.location.x, this.location.y, this.r);
        this.p.pop();
    }
    update() {
        super.update();
    }
}
