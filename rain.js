const canvas = document.querySelector(".background-canvas");
const c = canvas.getContext("2d");

resize();

window.addEventListener("resize", event => {
    resize();
});

class Drop {
    constructor(present) {
        this.x = Math.random() * canvas.width;
        this.y = (present ? Math.random() * canvas.height : -30);

        this.velocity = 4 + (Math.random() * 5);
        this.colour = (Math.random() < 0.1 ? "rgb(70, 200, 70)" : "rgb(100, 100, 100)")
    }

    update() {
        this.velocity += this.velocity * 0.018;
        this.y += this.velocity;

        c.fillStyle = this.colour;
        c.fillRect(this.x, this.y, 2, 40);
    }
}

let droplets = [];

for(var i = 0; i < 100; i++) {
    droplets.push(new Drop(true));
}

render();
function render() {
    requestAnimationFrame(render);

    c.fillStyle = "rgba(24, 24, 24, 0.5)";
    c.fillRect(0, 0, canvas.width, canvas.height);

    if(droplets.length < 100) {
        droplets.push(new Drop(false));
    }

    droplets.forEach((droplet, index) => {
        droplet.update();
        if(droplet.y > canvas.height + 30) {
            droplets.splice(index, 1);
        }
    });
}

function resize() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
}
