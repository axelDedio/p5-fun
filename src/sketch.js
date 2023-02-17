import p5, {Oscillator} from "p5";
import "p5/lib/addons/p5.sound"
import { makeNoise2D, makeNoise3D } from "open-simplex-noise";

const element = document.querySelector(".centerbox");
const style = window.getComputedStyle(element);
const width = parseInt(style.width);
const height = parseInt(style.height);
console.log("width: ", width);
console.log("height: ", height);

const fr = 40;
const noise2D = makeNoise2D(Date.now()); 

const mountains =  (/** @type {p5} */p, xoff, inc, ysum, color) => {
    p.fill(p.color(color));
    p.beginShape(p.LINE);
    p.vertex(0,height);
    for(let i = 0; i < width+30; i = i + 1){
      const y = p.map(noise3D(xoff),-1,1,0,80);
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
    let inc = 0.01;
    const osc = new Oscillator();
    osc.start(0, 200);
      osc.amp(0.3)
  p.draw = () => {
    p.background(255)
    p.stroke(100)
    let xoff = start;
    let yoff = start;
    const ysum = [];

    p.fill(100);

    p.beginShape(p.LINE);
    p.vertex(0,height);
    for(let i = 0; i < width+30; i = i + 1){
      const nois = noise2D(xoff, yoff);
      ysum.push(p.map(nois,-1,1,0,height));
      osc.freq(p.map(nois,-1,1,500,200))
      p.vertex(i, p.map(nois,-1,1,0,height))
      xoff+=inc
      yoff+=inc
    }
    p.vertex(width,height);
    p.endShape(p.CLOSE);


    // mountains(p, xoff, inc, ysum, "red");
    // mountains(p, xoff, inc, ysum, "green");
    // mountains(p, xoff, inc, ysum, "blue");
    // mountains(p, xoff, inc, ysum, "yellow");
    // mountains(p, xoff, inc, ysum, "green");
    // mountains(p, xoff, inc, ysum, "purple");
    
 
    start+=inc
  }
};
let myp5 = new p5(sketch, document.querySelector('.centerbox'));