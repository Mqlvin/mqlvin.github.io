const canvas = document.querySelector(".matrix-canvas");
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

document.addEventListener("click", click => {
    fireworks.push(new Firework(click.clientX, click.clientY, Math.min(7, Math.max(3, Math.random() * 7))));
});

let isHSL = true;
let hslVal = 0;


class Firework {
    constructor(x, y, size) {
        this.size = size;
        this.particles = [];
        this.x = x;
        this.y = y;
        this.life = 0;
        for(var i = 0; i < size * 50; i++) {
            this.particles.push(new Particle(this.x, this.y, ((Math.random() * 30) - 15) * (size / 4), ((Math.random() * 30) - 15) * (size / 4), (hslVal)));
        }
    }

    update() {
        if(this.life < 20) {

        }

        this.particles.forEach(particle => {
            particle.update();
        });
        this.life += 2;
    }
}

class Particle {
    constructor(x, y, vx, vy, rgb) {
        this.speed = 5;
        this.rgb = rgb;
        this.life = 0;
        this.location = {
            x: x,
            y: y
        }
        this.velocity = {
            x: vx,
            y: vy
        }

        this.colour = "";
    }

    updateVelocity() {
        this.velocity.y -= (this.velocity.y / 10) * (Math.random() * 3) * (Math.sin(Math.random() * 1.8));
        this.velocity.x -= (this.velocity.x / 10) * (Math.random() * 3) * (Math.sin(Math.random() * 1.8));

        if(this.life > 60) {
            this.velocity.y += (this.life - 60) / (Math.random() * 50 + 150);
        }
    }

    updatePosition() {
        this.location.x += this.velocity.x;
        this.location.y += this.velocity.y;
    }

    update() {
        this.colour = isHSL ? "hsl(" + this.rgb + ", 70%, " + ((1 - ((this.life + 30) / 200)) * 100) + "%)" : "rgba(" + this.rgb + ", " + (1 - ((this.life + 30) / 200)) + ")";
        this.updateVelocity();
        this.updatePosition();

        this.draw();
        this.life += 4;
    }

    draw() {
        c.beginPath();
        c.arc(this.location.x, this.location.y, 3, 0, Math.PI * 2, false);
        c.fillStyle = this.colour;
        c.fill();
    }
}

class Colour {
    constructor(rainbow) {
        this.rainbow = rainbow;
        this.colour = "rgb(255, 255, 255)";

        this.offset = 0;
    }

    update() {
        if(this.rainbow) {
            this.colour = "hsl(" + (offset) + ", 100%, 50%)";
        offset++;
        }
    }

    random() {
        this.colour = "hsl(" + (Math.random() * 360) + ", 100%, 50%)";
    }
}

c.fillStyle = "rgb(0, 0, 0)";
c.fillRect(0, 0, canvas.width, canvas.height);

let fireworks = [];

tick();

function tick() {
    requestAnimationFrame(tick);

    c.fillStyle = "rgba(0, 0, 0, 0.18)";
    c.fillRect(0, 0, canvas.width, canvas.height);

    fireworks.forEach((firework, index) => {
        firework.update();
        if(firework.life > 100) {
            fireworks.splice(index, 1);
        }
    });

    hslVal += 2;
}