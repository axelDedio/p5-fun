import p5, { Oscillator } from "p5";

import "p5/lib/addons/p5.sound"
const element = document.querySelector(".centerbox");
const style = window.getComputedStyle(element);
const width = parseInt(style.width);
const height = parseInt(style.height);
console.log("width: ", width);

const fr = 30;

class Particle {
  
  constructor(/** @type {p5} */p, /** @type {number} */x, y) {
    this.p = p;
    this.position = new p5.Vector(x, y);
    this.velocity = new p5.Vector(5, 4);
    this.osc = new Oscillator();
 
  }
  show(){
    this.p.circle(this.position.x, this.position.y, 20, 20);
    this.p.fill(this.p.color("red"));
    }
  update(){
    this.position.add(this.velocity);
   
  }
  bounce(){
    if(this.position.x > width - 10 || this.position.x < 10) {
      console.log("bounce")
      this.velocity.x = -1 * this.velocity.x
      const osc = new Oscillator();
      osc.start(0, 1*100+300);
      osc.amp(0, 0.1)
    }
    if(this.position.y > height -10 || this.position.y < 10) {
      console.log("bounce")
      this.velocity.y = -1 * this.velocity.y
      const osc = new Oscillator();
      osc.start(0, 1*100+300);
      osc.amp(0, 0.1);
    }
  }
  colorBlock(){
  }
}


const sketch  = ( /** @type {p5} */p ) => {
  const particles =[];
  p.setup = () => {
    p.createCanvas(width, height);
    p.noStroke();
    p.background(255)
    p.frameRate(fr);
    for(let i = 0;i<3;i++) {
      particles.push(new Particle(p, i * 100 + 50, 200));
    }
  };
  
  p.draw = () => {
    p.background(255);
    for(let i = 0;i<particles.length;i++) {
      particles[i].show();
      particles[i].update();
      particles[i].bounce();

    }
    
  };
}
let myp5 = new p5(sketch, document.querySelector('.centerbox'));