import p5 from "p5";
import "p5/lib/addons/p5.sound"
const element = document.querySelector(".centerbox");
const style = window.getComputedStyle(element);
const width = parseInt(style.width);
console.log("width: ", width);
const height = parseInt(style.height);

const fr = 30;

class Particle {
  
  constructor(/** @type {p5} */p, /** @type {number} */i) {
    this.p = p;
    this.x = width/2;
    this.y = height/2;
  }
  show(){
    this.p.circle(this.x, this.y, 20, 20);
    this.p.fill(this.p.color("red"));
    }
  update(){
   
  }
  colorBlock(){
  }
}


const sketch  = ( /** @type {p5} */p ) => {
  const particle = new Particle(p, 1);
  p.setup = () => {
    p.createCanvas(width, height);
    p.background(255)
    p.frameRate(fr);
  };
  
  p.draw = () => {
    p.background(255)
    particle.show()
    particle.update()
  };
}
let myp5 = new p5(sketch, document.querySelector('.centerbox'));