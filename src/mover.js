import p5 from "p5";
import { width, height } from "./helper";

export default class Mover {
    constructor(/** @type {p5} */ p, initLoc, initVel, initAcc, mass = 1) {
        this.p = p;
        /** @type {p5.Vector} */ this.location = initLoc
            ? initLoc
            : new p.createVector(width / 2, 30);
        /** @type {p5.Vector} */ this.velocity = initVel
            ? initVel
            : new p.createVector(0, 0);
        /** @type {p5.Vector} */ this.accell = initAcc
            ? initAcc
            : new p.createVector(0, 0);
        this.angle = -this.p.PI / 2;
        this.mass = mass;
        this.r = 20;
    }
    display() {
        this.p.push();
        this.p.fill(this.p.color("white"));
        this.p.noStroke();
        this.p.translate(this.location.x, this.location.y);
        this.p.pop();
    }

    update() {
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
