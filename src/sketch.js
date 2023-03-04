import p5 from "p5";
import "p5/lib/addons/p5.sound";
import { width, height } from "./helper";
import { Rocket } from "./rocket";
import { WindParticle } from "./windparticle";

const fr = 60;

const sketch = (/** @type {p5} */ p) => {
    const movers = [];

    p.setup = () => {
        p.createCanvas(width, height);
        p.background(0);
        p.frameRate(fr);
    };
    const spacecraft = new Rocket(p);
    const windParticles = [];
    for (let i = 0; i < 100; i++) {
        windParticles.push(new WindParticle(p, p.random(1, 3)));
    }
    let offsetX = 0;
    let offsetY = 10;
    let inc = 0.003;
    const gravity = 0.1;
    p.draw = () => {
        p.background(0);
        spacecraft.display();
        spacecraft.update();
        spacecraft.applyForce(p.createVector(0, gravity).mult(spacecraft.mass));
        spacecraft.applyForce(
            p.createVector(p.map(p.noise(offsetX), 0, 1, -0.1, 0.1), 0)
        );
        spacecraft.handleEdge();
        windParticles.forEach((wp) => {
            wp.display();
            wp.velocity.x = p.map(p.noise(offsetX), 0, 1, -20, 20);
            wp.update();
            wp.handleEdge();
            wp.velocity.y = p.map(p.noise(offsetY), 0, 1, -1, 1);
        });
        p.noStroke();
        p.rect(width / 2 - 30, height - 20, 60, 50);
        p.rect(0, height - 11, width, 20);
        offsetX += inc;
        offsetY += inc;
    };
};

let myp5 = new p5(sketch, document.querySelector(".centerbox"));
