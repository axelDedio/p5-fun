import p5 from "p5";
const element = document.querySelector(".centerbox");
const style = window.getComputedStyle(element);
const width = parseInt(style.width);
const height = parseInt(style.height);
export const dims = { width, height };
const G = 0.2;

export default class Mover {
    constructor(
        /** @type {p5} */ p,
        mass,
        color,
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
    }
    display() {
        this.p.fill(this.p.color(this.color));
        this.p.noStroke();
        this.p.ellipse(this.location.x, this.location.y, this.r * 2);
    }

    update() {
        this.velocity.add(this.accell);
        // this.velocity.limit(10);
        this.location.add(this.velocity);
        this.accell.mult(0);
    }

    calculateAttraction(object) {
        const attractorMass = object.mass;
        const dir = p5.Vector.sub(this.location, object.location).mult(-1);
        const magSq = this.p.constrain(dir.magSq(), 100, 1000);
        const strength = (this.mass * attractorMass * G) / magSq;
        dir.normalize();
        dir.setMag(strength);
        this.applyForce(dir);
    }

    applyForce(/** @type {p5.Vector} */ force) {
        let f = p5.Vector.div(force, this.mass);
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
