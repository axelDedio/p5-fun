import p5 from "p5";
import { width, height } from "./helper";

export default class Mover {
    constructor(/** @type {p5} */ p, r = 20) {
        this.p = p;
        /** @type {p5.Vector} */ this.location = new p.createVector(
            width / 2,
            30
        );
        /** @type {p5.Vector} */ this.velocity = new p.createVector(0, 0);
        /** @type {p5.Vector} */ this.accell = new p.createVector(0, 0);
        this.angle = -this.p.PI / 2;
        this.mass = 1;
        this.r = 20;
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
            this.angle -= 0.1;
        }
        if (this.p.keyIsDown(this.p.RIGHT_ARROW)) {
            this.angle += 0.1;
        }
        if (this.p.keyIsDown(this.p.UP_ARROW)) {
            const forceVec = p5.Vector.fromAngle(this.angle);
            forceVec.setMag(0.1);
            this.applyForce(forceVec);
        }
        this.velocity.add(this.accell);
        this.velocity.limit(30);
        this.location.add(this.velocity);
        this.accell.mult(0);
    }

    calculateForce() {}

    applyForce(/** @type {p5.Vector} */ force) {
        let f = p5.Vector.div(force, this.mass);
        this.accell.add(f);
    }

    handleEdge() {
        if (this.location.x > width - this.r) {
            this.location.x = width - this.r;
            this.velocity.x *= -1;
        }
        if (this.location.x < this.r) {
            this.location.x = this.r;
            this.velocity.x *= -1;
        }
        if (this.location.y > height - this.r) {
            this.location.y = height - this.r;
            this.velocity.y *= -1;
        }
        if (this.location.y < this.r) {
            this.location.y = this.r;
            this.velocity.y *= -1;
        }
    }
}
