import p5 from "p5";
export class WaveGenerator {
    constructor(/** @type {p5} */ p, amp, period, size) {
        /** @type {p5} */ this.p = p;
        this.angle = 0;
        this.amplitude = amp;
        this.phase = 0;
        this.period = period;
        this.cycle = 0;
        this.size = size;
        this.values = [];
        for (let i = 0; i < this.size; i++) {
            this.values.push(-1);
        }
    }
    calculate(x) {
        return (
            this.p.sin(this.phase + (x * this.p.PI) / this.period) *
            this.amplitude
        );
    }

    get(x) {
        return this.values[x];
    }
    update(inc) {
        for (let x = 0; x < this.size; x++) {
            this.values.splice(0, 1);
            this.values.push(this.calculate(x));
        }
        this.phase += this.p.TAU / inc;
    }
}
