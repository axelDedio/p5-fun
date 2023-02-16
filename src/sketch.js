import p5, {Oscillator} from "p5";
import "p5/lib/addons/p5.sound"
import { makeNoise2D } from "open-simplex-noise";

const element = document.querySelector(".centerbox");
const style = window.getComputedStyle(element);
const width = parseInt(style.width);
const height = parseInt(style.height);
console.log("width: ", width);
console.log("height: ", height);

const noise3D = makeNoise2D(Date.now()); 

const fr = 40;
const inc = 0.03;
const zinc = 0.05;
let zoff = 0;

class Mover {
  constructor(/** @type {p5} */p ){
    this.p = p;
    /** @type {p5.Vector} */this.location = new p.createVector(0, 0);
    /** @type {p5.Vector} */this.velocity = new p.createVector(10,0);
    /** @type {p5.Vector} */this.accell = new p.createVector(0,0.9);
    this.osc = new Oscillator();
    this.osc.start(0, 300);
  };
  display() {
    this.p.ellipse(this.location.x , this.location.y,  20);
  }

  update() {
    this.velocity.add(this.accell)
    this.location.add(this.velocity);
    this.osc.freq(this.p.map(this.location.y, 0, height, 500,300))
    
  }
  handleEdge(){
    if((this.location.x > width) || (this.location.x < 0)) {
      this.velocity.x = this.velocity.x * -1;
    }
    if((this.location.y > height  ) || (this.location.y < 0)) {
      
      this.velocity.y = this.velocity.y * -1;

    }
  }

}


const sketch  = ( /** @type {p5} */p ) => {
  p.setup = () => {
    p.createCanvas(width, height);
    p.background(255);
    p.frameRate(fr);
    
  };
  

const mover = new Mover(p)
  p.draw = () => {

    mover.display();
    mover.update();
    mover.handleEdge();
   
  };
  p.mousePressed = () => {
    p.userStartAudio();
  }
};

let myp5 = new p5(sketch, document.querySelector('.centerbox'));