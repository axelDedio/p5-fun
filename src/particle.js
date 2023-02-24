import { height, width } from "./helper";
import p5 from "p5";
import Mover from "./mover";
const G = 2;
export class YellowParticle extends Mover {
    constructor(p) {
        super(
            p,
            10,
            "yellow",
            1,
            p.createVector(p.random(0, width), p.random(0, height)),
            p.createVector(p.random(-10, 10), p.random(-10, 10))
        );
    }
    calculateForce(object) {
        const dir = p5.Vector.sub(this.location, object.location);
        if (dir.mag() > 50) {
            const magSq = this.p.constrain(dir.magSq(), 10, 100);
            const strength = G / magSq;
            dir.normalize();
            dir.setMag(strength);
            dir.mult(-1);
            this.applyForce(dir);
        } else {
            dir.normalize();
            dir.setMag(0.2);
            this.applyForce(dir);
        }
    }
}
