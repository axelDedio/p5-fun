import p5 from "p5";
const element = document.querySelector(".centerbox");
const style = window.getComputedStyle(element);
const width = parseInt(style.width);
const height = parseInt(style.height);
export const dims = { width, height };

export default class Mover {
    constructor(/** @type {p5} */ p, r, color) {
        this.p = p;
        /** @type {p5.Vector} */ this.location = new p.createVector(10, 10);
        /** @type {p5.Vector} */ this.velocity = new p.createVector(2, 0);
        /** @type {p5.Vector} */ this.accell = new p.createVector(0, 0);
        this.r = r;
        this.mass = 0.01 * (this.p.PI * this.p.sq(this.r));
        console.log(this.mass);
        this.color = color;
    }
    display() {
        this.p.fill(this.p.color(this.color));
        this.p.ellipse(this.location.x, this.location.y, this.r * 2);
    }

    update() {
        this.velocity.add(this.accell);
        this.velocity.limit(10);
        this.location.add(this.velocity);
        this.accell.mult(0);
    }

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
