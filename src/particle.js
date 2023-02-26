import { height, width } from "./helper";
import p5 from "p5";
import Mover from "./mover";
import { eq } from "./sketch";
export class YellowParticle extends Mover {
    constructor(p) {
        super(
            p,
            2,
            "yellow",
            3,
            p.createVector(p.random(0, width), p.random(0, height)),
            p.createVector(p.random(-200, 200), p.random(-200, 200))
        );
    }
    calculateForce(object) {
        const dir = p5.Vector.sub(this.location, object.location);
        const dist = dir.mag();
        dir.setMag(eq(dist)).mult(0.1);
        this.applyForce(dir);

        // if (dir.mag() > 100) {
        //     const magSq = this.p.constrain(dir.magSq(), 10, 100);
        //     const strength = G / magSq;
        //     dir.normalize();
        //     dir.setMag(strength);
        //     dir.mult(-1);
        //     this.applyForce(dir);
        // } else {
        //     dir.normalize();
        //     dir.setMag(20);
        //     this.applyForce(dir);
        // }
    }
}
