import p5 from "p5";
import { width, height } from "./helper";

export default class Particle {
    constructor(/** @type {p5} */ p) {
        this.p = p;

        /** @type {p5.Vector} */ this.location = p.createVector(
            p.random(width),
            p.random(height)
        );
        /** @type {p5.Vector} */ this.velocity = p.createVector(0, 0);
        /** @type {p5.Vector} */ this.accell = p.createVector(0, 0);
    }
    display() {
        this.p.stroke(0, 2);
        this.p.strokeWeight(3);
        this.p.line(
            this.location.x,
            this.location.y,
            this.prevLoc.x,
            this.prevLoc.y
        );
    }

    update() {
        this.velocity.add(this.accell);
        this.velocity.limit(5);
        this.prevLoc = this.location.copy();
        this.location.add(this.velocity);
        this.accell.mult(0);
    }

    applyForce(/** @type {p5.Vector} */ force) {
        this.accell.add(force);
    }

    handleDrag(val) {
        const direction = this.velocity.copy();
        direction.normalize();
        direction.mult(-1);
        direction.mult(this.velocity.magSq());
        direction.mult(val);
        this.applyForce(direction);
    }

    handleEdge() {
        if (this.location.x > width) {
            this.location.x = 0;
        }
        if (this.location.x < 0) {
            this.location.x = width;
        }
        if (this.location.y > height) {
            this.location.y = 0;
        }
        if (this.location.y < 0) {
            this.location.y = height;
        }
    }
}
