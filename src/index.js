console.log("hallo");
import p5 from "p5";


const element = document.querySelector(".centerbox");
const style = window.getComputedStyle(element);
const width = parseInt(style.width);
console.log("width: ", width);
const height = parseInt(style.height);
const colors = ['#3b205f', '#6b4b8f', '#9b78bf', '#cea9ef', '#e8d1fb', '#ffbaad', '#f67e84', '#dc4a63', '#ba1d4b', '#93003a', '#3b205f', '#6b4b8f', '#9b78bf', '#cea9ef', '#e8d1fb', '#ffbaad', '#f67e84', '#dc4a63', '#ba1d4b', '#93003a']

const blockCount = 60
const blockWhidth = 12
const border = width - blockWhidth/2;
const fr = 60;
const basefreq = 0.02;
const tri = (x, amp, freq) => {
  return Math.abs( 2*freq*x % 2 - 1) * amp
  // return (Math.sin(x*freq)*amp/2)
}

class Block {
  
  constructor(/** @type {p5} */p, /** @type {number} */i) {
    this.p = p;
    this.x =  0;
    this.i = i;
    this.y = blockWhidth + this.i * 8;
    this.time = 0;
  }
  drawBlock(){
      this.p.noStroke();
      this.p.circle(this.x, this.y , blockWhidth, 20)

    }
  moveBlock(){
    this.x = tri(this.p.millis()/1000, border, basefreq*this.i);
    if(this.x<2){
      this.x = 0;
    } 
    if(this.x>border-2)  {
      this.x = border;
    }
  }
  colorBlock(){
    this.p.fill(this.p.color("red"));
    if(this.x<8){
      this.p.fill(this.p.color("violet"));
    } 
    if(this.x>border-8)  {
      this.p.fill(this.p.color("violet"));
    }
  }

joinBlocks(blocks) {
  blocks.forEach(element =>{
    if(Math.abs(this.i - element.i) < 4){
      this.p.stroke(this.p.color("red"));
      this.p.strokeWeight(1.5)
      this.p.line(this.x,this.y,element.x,element.y);
    } 

  });
}
}
const sketch  = ( /** @type {p5} */p ) => {
    
  const blocks = [];
  
  p.setup = () => {
    p.createCanvas(width, height);
    p.frameRate(fr);
    for(let i = 1;i<blockCount+1;i++){
      blocks.push(new Block(p, i));
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
    // for(let i = 0; i<border; i+=0.1){
    //   p.stroke(p.color("red"));
    //   p.strokeWeight(1)
    //   console.log(i, tri(i));
    //   p.point(i, (tri(i)+(height/2)));
    // }
  };
}
  let myp5 = new p5(sketch, document.querySelector('.centerbox'));