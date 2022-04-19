const canvas = document.querySelector(".sine-canvas");
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

let current = 0.0;
let rainbow = true;
let lineCount = 20;
let rainbowOffset = 0.0;
let amplifier = 200;
let scale = 12;

class Line {
    constructor(offset) {
        this.offset = offset;
        console.log(offset);
        this.x = canvas.width / 2 + ((offset - lineCount / 2) * (100 - lineCount)) + 12

        this.renderx = this.x + (this.offset);
        this.rendery = canvas.height / 2;
        this.width = 30;
    }

    draw() {
        c.fillStyle = (rainbow ? "hsl(" + (360 * (this.offset - rainbowOffset) / lineCount) + ", 80%, 60%)" : "rgb(255, 255, 255)");
        c.lineWidth = 15;
        c.fillRect(this.renderx, this.rendery, this.width, Math.sin(current - 1 / lineCount * this.offset * scale) * amplifier);
        c.fillRect(this.renderx, this.rendery, this.width, -Math.sin(current - 1 / lineCount * this.offset * scale) * amplifier);
        c.fillRect(this.renderx, this.rendery - 1, this.width, 2); // stitching
    }
}

let lines = [];
for(var i = 0; i < lineCount; i++) {
    lines.push(new Line(i));
}

tick();

function tick() {
    requestAnimationFrame(tick);
    c.fillStyle = "rgba(16, 16, 16, 0.6)";
    c.fillRect(0, 0, canvas.width, canvas.height);
    
    lines.forEach((line, index) => {
        line.draw();
    });
    current += 0.06;
    rainbowOffset += 0.2;
}
