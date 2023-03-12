import p5 from "p5";
const noise3D = makeNoise3D(Date.now());
import { makeNoise3D } from "open-simplex-noise";

export default class NoiseGenerator {
    constructor(/** @type {p5} */ p, dimX, dimY) {
        this.p = p;
        this.dimX = dimX;
        this.dimY = dimY;
        this.nvs = [];
        this.zInc = 0.007;
        this.inc = 0.07;
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
        for (let y = 0; y < this.dimY; y++) {
            let xoff = 0;
            let xrow = [];
            for (let x = 0; x < this.dimX; x++) {
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
