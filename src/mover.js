import p5 from "p5";
const element = document.querySelector(".centerbox");
const style = window.getComputedStyle(element);
const width = parseInt(style.width);
const height = parseInt(style.height);
export const dims = { width, height };
const G = 3;

export default class Mover {
    constructor(/** @type {p5} */ p, r, color, px, py, vx, vy) {
        this.p = p;
        this.r = r;
        this.mass = 0.01 * (this.p.PI * this.p.sq(this.r));
        /** @type {p5.Vector} */ this.location = new p.createVector(px, py);
        /** @type {p5.Vector} */ this.velocity = new p.createVector(vx, vy);
        /** @type {p5.Vector} */ this.accell = new p.createVector(0, 0);
        this.color = color;
    }
    display() {
        this.p.fill(this.p.color(this.color));
        this.p.ellipse(this.location.x, this.location.y, this.r * 2);
    }

    update() {
        this.velocity.add(this.accell);
        this.velocity.limit(15);
        this.location.add(this.velocity);
        this.accell.mult(0);
    }

    calculateAttraction(object) {
        const attractorMass = object.mass;
        const dir = p5.Vector.sub(this.location, object.location).mult(-1);
        const magSq = this.p.constrain(dir.magSq(), 5, 25);
        const strength = (this.mass * attractorMass * G) / magSq;
        dir.normalize();
        dir.setMag(strength);
        this.applyForce(dir);
    }

    applyForce(/** @type {p5.Vector} */ force) {
        let f = p5.Vector.div(force, this.mass);
        this.accell.add(force);
    }

    handleDrag() {
        const direction = this.velocity.copy();
        direction.normalize();
        direction.mult(-1);
        direction.mult(this.velocity.magSq());
        direction.mult(0.001);
        this.applyForce(direction);
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
