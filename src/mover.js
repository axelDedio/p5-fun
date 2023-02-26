import p5 from "p5";
import { width, height } from "./helper";

export default class Mover {
    constructor(
        /** @type {p5} */ p,
        mass,
        color,
        velLimit,
        /** @type {p5.Vector} */ start,
        /** @type {p5.Vector} */ vel
    ) {
        this.p = p;
        this.mass = mass;
        this.r = this.p.sqrt(mass) * 2;
        /** @type {p5.Vector} */ this.location = start;
        /** @type {p5.Vector} */ this.velocity = vel;
        /** @type {p5.Vector} */ this.accell = new p.createVector(0, 0);
        this.color = color;
        this.velLimit = velLimit;
    }
    display() {
        this.p.fill(this.p.color(this.color));
        this.p.noStroke();
        this.p.ellipse(this.location.x, this.location.y, this.r * 2);
    }

    update() {
        this.velocity.add(this.accell);
        this.velocity.limit(this.velLimit);
        this.location.add(this.velocity);
        this.accell.mult(0);
    }

    calculateForce() {}

    applyForce(/** @type {p5.Vector} */ force) {
        let f = p5.Vector.div(force, this.mass);
        this.accell.add(force);
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
