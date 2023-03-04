import { height, width } from "./helper";
import p5 from "p5";
import Mover from "./mover";
import { eq } from "./sketch";
export class Rocket extends Mover {
    constructor(/** @type {p5} */ p, r = 20) {
        super(
            p,
            new p.createVector(width / 2, 30),
            new p.createVector(0, 0),
            new p.createVector(0, 0)
        );

        this.r = r;
        this.angle = -this.p.PI / 2;
    }
    display() {
        this.p.push();
        this.p.fill(this.p.color("white"));
        this.p.noStroke();
        this.p.translate(this.location.x, this.location.y);
        this.p.rotate(this.angle);
        this.p.triangle(-this.r, this.r / 2, this.r, 0, -this.r, -this.r / 2);
        this.p.pop();
    }

    update() {
        if (this.p.keyIsDown(this.p.LEFT_ARROW)) {
            this.angle -= 0.02;
        }
        if (this.p.keyIsDown(this.p.RIGHT_ARROW)) {
            this.angle += 0.02;
        }
        if (this.p.keyIsDown(this.p.UP_ARROW)) {
            const forceVec = p5.Vector.fromAngle(this.angle);
            forceVec.setMag(0.2);
            this.applyForce(forceVec);
        }
        super.update();
    }
}
