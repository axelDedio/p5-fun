import p5 from "p5";
import "p5/lib/addons/p5.sound"
const element = document.querySelector(".centerbox");
const style = window.getComputedStyle(element);
const width = parseInt(style.width);
const height = parseInt(style.height);
console.log("width: ", width);

const fr = 50;

const mountains =  (/** @type {p5} */p, xoff, inc, ysum, color) => {
    p.fill(p.color(color));
    p.beginShape(p.LINE);
    p.vertex(0,height);
    for(let i = 0; i < width+30; i = i + 1){
      const y = p.map(p.noise(xoff),0,1,0,80);
      p.vertex(i, y + ysum[i] )
      ysum[i]+=y;
      xoff+=inc
    }
    p.vertex(width,height);
    p.endShape(p.CLOSE);
}


const sketch  = ( /** @type {p5} */p ) => {
  p.setup = () => {
    p.createCanvas(width, height);
    p.background(255)
    p.frameRate(fr);
  };
  
  
    let start = 0;
    let inc = 0.008;
    
  p.draw = () => {
    p.background(255)
    p.stroke(100)
    let xoff = start;
    const ysum = [];

    p.fill(100);
    p.beginShape(p.LINE);
    p.vertex(0,height);
    for(let i = 0; i < width+30; i = i + 1){
      const y = p.map(p.noise(xoff),0,1,-200,200)
      ysum.push(y);
      p.vertex(i, y )
      xoff+=inc
    }
    p.vertex(width,height);
    p.endShape(p.CLOSE);


    mountains(p, xoff, inc, ysum, "red");
    mountains(p, xoff, inc, ysum, "green");
    mountains(p, xoff, inc, ysum, "blue");
    mountains(p, xoff, inc, ysum, "yellow");
    mountains(p, xoff, inc, ysum, "green");
    mountains(p, xoff, inc, ysum, "purple");
    
 
    start+=inc
  }
};
let myp5 = new p5(sketch, document.querySelector('.centerbox'));