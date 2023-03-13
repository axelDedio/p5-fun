import p5 from "p5";
const noise3D = makeNoise3D(Date.now());
import { makeNoise3D } from "open-simplex-noise";
import { width, height } from "./helper";

export default class NoiseGenerator {
    constructor(/** @type {p5} */ p, boxSize) {
        this.p = p;
        this.dimX = width;
        this.dimY = height;
        this.boxSize = boxSize;
        this.nvs = [];
        this.zInc = 0.007;
        this.inc = 0.1;
        this.zoff = 0;
        this.update();
    }
    getNoise(x, y) {
        return this.nvs[y][x];
    }

    update(inc = 0.07) {
        this.inc = inc;
        this.nvs = [];
        let yoff = 0;
        for (let y = 0; y < this.dimY + this.boxSize; y += this.boxSize) {
            let xoff = 0;
            let xrow = [];
            for (let x = 0; x < this.dimX + this.boxSize; x += this.boxSize) {
                let nv = noise3D(xoff, yoff, this.zoff);
                xrow.push(nv);
                xoff += this.inc;
            }
            this.nvs.push(xrow);
            yoff += this.inc;
        }
        this.zoff += this.zInc;
    }
}
