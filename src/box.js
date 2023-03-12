import p5 from "p5";
export class Box {
    constructor(/** @type {p5} */ p, x, y, initZ, initVel, initAcc) {
        /** @type {p5} */ this.p = p;
        this.x = x;
        this.y = y;
        this.z = initZ;
        this.zVel = initVel;
        this.zAcc = initAcc;
    }

    update() {
        this.zVel += this.zAcc;
        this.z += this.zVel;
        if (this.z < 10) {
            this.z = 10;
            this.zVel = 0;
            this.zAcc = 0;
        }
    }

    applyForce(g) {
        this.zAcc += g;
    }
    display() {
        this.p.push();
        this.p.translate(this.x * 5, this.y * 5, this.z / 2);
        this.p.box(5, 5, this.z);
        this.p.pop();
    }
}
