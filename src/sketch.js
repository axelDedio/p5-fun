import p5, { Oscillator } from "p5";
import "p5/lib/addons/p5.sound";
import { makeNoise2D } from "open-simplex-noise";

const element = document.querySelector(".centerbox");
const style = window.getComputedStyle(element);
const width = parseInt(style.width);
const height = parseInt(style.height);

console.log("width: ", width);

console.log("height: ", height);

// const noise3D = makeNoise2D(Date.now());

const fr = 40;

const osc = new Oscillator();
osc.amp(0.1);
class Mover {
  constructor(/** @type {p5} */ p, osc) {
    this.p = p;
    /** @type {p5.Vector} */ this.location = new p.createVector(10, 10);
    /** @type {p5.Vector} */ this.velocity = new p.createVector(1, 1);
    /** @type {p5.Vector} */ this.accell = new p.createVector(0, 0);
    this.osc = osc;
    this.osc.setType("square");
  }
  display() {
    this.p.ellipse(this.location.x, this.location.y, 20);
  }

  update() {
    const mouse = this.p.createVector(this.p.mouseX, this.p.mouseY);
    this.accell = p5.Vector.sub(mouse, this.location);
    this.accell.setMag(1);
    this.velocity.add(this.accell);
    this.velocity.limit(20);
    this.location.add(this.velocity);
    this.osc.freq(this.p.map(this.velocity.mag(), 0, 20, 100, 200));
  }
  handleEdge() {
    if (this.location.x > width || this.location.x < 0) {
      this.velocity.x = this.velocity.x * -1;
    }
    if (this.location.y > height || this.location.y < 0) {
      this.velocity.y = this.velocity.y * -1;
    }
  }
}

const sketch = (/** @type {p5} */ p) => {
  p.setup = () => {
    console.log("h");

    p.createCanvas(width, height);
    p.background(255);
    p.frameRate(fr);
  };

  const mover = new Mover(p, osc);
  p.draw = () => {
    mover.display();
    mover.update();

    mover.handleEdge();
  };
  let playing = false;
  p.mousePressed = () => {
    console.log("hallo");
    if (playing) {
      osc.stop();
      playing = false;
    } else {
      p.userStartAudio();
      osc.start();
      playing = true;
    }
  };
};

let myp5 = new p5(sketch, document.querySelector(".centerbox"));
