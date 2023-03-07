export class Oscillator {
    constructor(/** @type {p5} */ p, amp, phase, period) {
        this.p = p;
        this.angle = 0;
        this.amplitude = amp;
        this.phase = phase;
        this.period = period;
    }

    // Update theta and offset
    get(x) {
        return (
            this.p.sin(this.phase + (x * this.p.TAU) / this.period) *
            this.amplitude
        );
    }
    update(inc = 0.1) {
        this.phase += inc / this.period;
    }
}
