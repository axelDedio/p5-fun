import p5 from "p5";
import { Box } from "./box";
import { width, height } from "./helper";

const fr = 50;
let slider;
const sketch = (/** @type {p5} */ p) => {
    p.setup = () => {
        p.createCanvas(width, height, p.WEBGL);
        p.background(0);
        p.frameRate(fr);
        slider = p.createSlider(0, p.PI / 2, p.PI / 3, 0.01);
    };
    const boxes = [];
    for (let y = 0; y < 2; y++) {
        let boxRow = [];
        for (let x = 0; x <= 100; x++) {
            if (x == 0) {
                boxRow.push(new Box(p, x, y, 10, 0, 0.1));
            } else {
                boxRow.push(new Box(p, x, y, 10, 0, 0));
            }
        }
        boxes.push(boxRow);
    }

    p.draw = () => {
        p.background(0);
        p.rotateX(slider.value());
        p.translate(-250, -25);
        boxes.forEach((boxRow) => {
            boxRow.forEach((box, index, br) => {
                let next = br[index + 1];
                box.applyForce(-0.0001);
                box.update();
                box.display();
                if (index < br.length - 1) {
                    box.applyForce(next.zAcc - box.zAcc);
                }
            });
        });

        if (p.frameCount % 120 == 0) {
            console.log(p.frameRate());
        }
    };
};

let myp5 = new p5(sketch, document.querySelector(".centerbox"));
