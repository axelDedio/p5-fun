import p5 from "p5";
import "p5/lib/addons/p5.sound"
const element = document.querySelector(".centerbox");
const style = window.getComputedStyle(element);
const width = parseInt(style.width);
const height = parseInt(style.height);
console.log("width: ", width);

const fr = 30;




const sketch  = ( /** @type {p5} */p ) => {
  p.setup = () => {
    p.createCanvas(width, height);
    p.background(255)
    p.frameRate(fr);
  };
  
  
    let start = 0;
    let inc = 0.04;
    
  p.draw = () => {
    p.background(255)
    p.stroke(100)
    let xoff = start;

    p.noFill();
    p.beginShape(p.LINE);
    p.vertex(0,height);
    for(let i = 0; i < width+30; i = i + 15){
      const y = p.map(p.noise(xoff),0,1,0,height)
      p.vertex(i, y )
      xoff+=inc
    }
    p.vertex(width,height);
    p.endShape(p.CLOSE);


    // p.fill(100);
    p.beginShape(p.LINE);
    p.vertex(0,height);
    for(let i = 0; i < width+30; i = i + 15){
      const y = p.map(p.noise(xoff),0,1,0,height)
      p.vertex(i, y )
      xoff+=inc
    }
    p.vertex(width,height);
    p.endShape(p.CLOSE);

    // p.fill(200);
    p.beginShape(p.LINE);
    p.vertex(0,height);
    for(let i = 0; i < width+30; i = i + 15){
      const y = p.map(p.noise(xoff),0,1,0,height)
      p.vertex(i, y )
      xoff+=inc
    }
    p.vertex(width,height);
    p.endShape(p.CLOSE);
    start+=inc
  }
};
let myp5 = new p5(sketch, document.querySelector('.centerbox'));