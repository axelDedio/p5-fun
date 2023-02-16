import p5 from "p5";
import "p5/lib/addons/p5.sound"
const element = document.querySelector(".centerbox");
const style = window.getComputedStyle(element);
const width = parseInt(style.width);
const height = parseInt(style.height);
console.log("width: ", width);
console.log("height: ", height);

const fr = 10;




const sketch  = ( /** @type {p5} */p ) => {
  p.setup = () => {
    p.createCanvas(width, height);
    p.background(255);
    p.frameRate(fr);
  };
  
  let startY = 0;
  let startX = 0;
  let inc = 0.01;
    
  p.draw = () => {
  
    p.loadPixels();
    p.pixelDensity(1);
    let yoff = startY;
    for(let y = 0; y < height; y++){
      let xoff = startX;
      for(let x = 0; x < width; x++){ 
        const index = (x + y * width) * 4;
        const rd = p.abs(p.noise(xoff , yoff)) * 255;
        p.pixels[index] = rd;
        p.pixels[index + 1] = rd;
        p.pixels[index + 2] = rd;
        p.pixels[index + 3] = 255;
        xoff+=inc;
        }
      
      yoff+=inc;
    }
    startX+=inc;
    startY+=inc;
    p.updatePixels()
  };
};
let myp5 = new p5(sketch, document.querySelector('.centerbox'));