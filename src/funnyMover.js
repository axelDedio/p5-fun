import { height, width } from "./helper";
import p5 from "p5";
import Mover from "./mover";
import { eq } from "./sketch";
export class FunnyMover extends Mover {
    constructor(/** @type {p5} */ p, r = 20) {
        super(
            p,
            new p.createVector(width / 2, height / 2),
            new p.createVector(0, 0),
            new p.createVector(0, 0)
        );

        this.r = r;
        this.angle = -this.p.PI / 2;
        this.amp = 40;
        this.offA = 0;
        this.freq = 1;
    }
    display() {
        this.p.push();
        this.p.noStroke();
        this.p.translate(this.location.x, this.location.y);
        // body
        this.p.push();
        this.p.fill(this.p.color("white"));
        this.p.rotate(this.velocity.heading());
        this.p.stroke(this.p.color("black"));
        this.p.ellipse(0, 0, 20, 20);
        this.p.line(0, 0, 20, 0);
        this.p.pop();
        // finns
        let oscVec = this.p.createVector(this.velocity.x, this.velocity.y);
        oscVec.setMag(-30);
        oscVec.rotate(
            this.p.map(
                this.p.sin(this.offA),
                -1,
                1,
                -this.p.PI / 6,
                this.p.PI / 6
            )
        );
        // this.p.triangle(0, 0, oscVec.x, , -50, 5);

        this.p.circle(oscVec.x, oscVec.y, 5);
        this.p.stroke(this.p.color("white"));
        this.p.line(0, 0, oscVec.x, oscVec.y);
        this.p.pop();
        this.offA += this.p.map(this.velocity.mag(), 0, 20, 0, 5);
    }

    update() {
        this.angle = this.velocity.heading();

        if (this.p.keyIsDown(this.p.UP_ARROW)) {
            const forceVec = p5.Vector.fromAngle(this.angle);
            forceVec.setMag(0.2);
            this.applyForce(forceVec);
        }
        super.update();
    }
}
