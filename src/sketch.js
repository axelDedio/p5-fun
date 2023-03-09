import p5 from "p5";
import "p5/lib/addons/p5.sound";
import { makeNoise3D } from "open-simplex-noise";

const element = document.querySelector(".centerbox");
const style = window.getComputedStyle(element);
const width = parseInt(style.width);
const height = parseInt(style.height);
console.log("width: ", width);
console.log("height: ", height);

const fr = 40;
const noise3D = makeNoise3D(Date.now());

const sketch = (/** @type {p5} */ p) => {
  p.setup = () => {
    p.createCanvas(width, height);
    p.background(255);
    p.frameRate(fr);
  };

  const inc = 0.03;
  const zinc = 0.05;
  let zoff = 0;
  p.noiseDetail(0);
  p.draw = () => {
    p.loadPixels();
    p.pixelDensity(1);
    let yoff = 0;
    for (let y = 0; y < height; y++) {
      let xoff = 0;
      for (let x = 0; x < width; x++) {
        const index = (x + y * width) * 4;
        const rd = noise3D(xoff, yoff, zoff);
        const bla = p.map(rd, -1, 1, 0, 255);
        p.pixels[index] = 255;
        p.pixels[index + 1] = 255;
        p.pixels[index + 2] = 255;
        p.pixels[index + 3] = bla;
        xoff += inc;
      }

      yoff += inc;
    }
    zoff += zinc;

    p.updatePixels();
  };
};
let myp5 = new p5(sketch, document.querySelector(".centerbox"));
