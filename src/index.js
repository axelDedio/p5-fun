import p5, { Oscillator } from "p5";
import "p5/lib/addons/p5.sound"
const element = document.querySelector(".centerbox");
const style = window.getComputedStyle(element);
const width = parseInt(style.width);
console.log("width: ", width);
const height = parseInt(style.height);
const colors = ['#3b205f', '#6b4b8f', '#9b78bf', '#cea9ef', '#e8d1fb', '#ffbaad', '#f67e84', '#dc4a63', '#ba1d4b', '#93003a', '#3b205f', '#6b4b8f', '#9b78bf', '#cea9ef', '#e8d1fb', '#ffbaad', '#f67e84', '#dc4a63', '#ba1d4b', '#93003a']

const blockCount = 45
const blockWhidth = 12
const border = width - blockWhidth/2;
const fr = 60;
const basefreq = 0.02;
const tri = (x, amp, freq) => {
  return Math.abs( 2*freq*x % 2 - 1) * amp
  // return (Math.sin(x*freq)*amp/2)
}

class Block {
  
  constructor(/** @type {p5} */p, /** @type {number} */i, osc) {
    this.p = p;
    this.x =  blockWhidth/2;
    this.i = i;
    this.y = blockWhidth + this.i * 8;
    this.time = 0;
    this.osc = osc;
  }
  drawBlock(){
      this.p.noStroke();
      this.p.circle(this.x, this.y , blockWhidth, 20)

    }
  moveBlock(){
    this.x = tri(this.p.millis()/1000, border, basefreq*this.i);
    if(this.x<3){
      this.x = blockWhidth/2;
      playOscillator(this.i);
    } 
    if(this.x>border-3)  {
      this.x = border;
      playOscillator(this.i);
      
    }
  }
  colorBlock(){
    let centerDis = this.p.dist(this.x,0,width/2,0)/(width/2);

    
      this.p.fill(this.p.color(102, 255, 102, 200*centerDis+50));
      this.p.stroke(this.p.color(102, 255, 102, 200*centerDis+50));
 
  }

joinBlocks(blocks) {
  blocks.forEach(element =>{
    if(Math.abs(this.i - element.i) < 2){
      this.p.stroke(this.p.color(102, 255, 102, 50));
      this.p.strokeWeight(1)
      this.p.line(this.x,this.y,element.x,element.y);
    } 

  });
}
}
function playOscillator(freq) {
  // starting an oscillator on a user gesture will enable audio
  // in browsers that have a strict autoplay policy.
  // See also: userStartAudio();
  const osc = new Oscillator();
  osc.start(0, freq*100+300);
  osc.amp(0, 0.1)
}

const sketch  = ( /** @type {p5} */p ) => {
  const blocks = [];
  const osc = new Oscillator()
  p.setup = () => {
    let cnv = p.createCanvas(width, height);
    cnv.mousePressed(playOscillator);

    p.createCanvas(width, height);
    p.frameRate(fr);
    for(let i = 1;i<blockCount+1;i++){
      blocks.push(new Block(p, i, osc));
    }
 
  };
  
  p.draw = () => {
    p.background(0);
    
    // p.text(p.millis()/1000, 100, 300);
    for(let i = 0;i<blocks.length;i++) {
      blocks[i].colorBlock();
      blocks[i].drawBlock();
      blocks[i].joinBlocks(blocks.slice(i));
      blocks[i].moveBlock();
    }
  };
}
  let myp5 = new p5(sketch, document.querySelector('.centerbox'));