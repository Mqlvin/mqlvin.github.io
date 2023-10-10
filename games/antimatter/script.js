const canvas = document.querySelector(".game");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight + 4;

const gravity = 0.18;
let gameStarted = false;
let gameOver = false;
let fade = 0;
let chance = 8;
let godMode = false;
let canStartNewGame = false;
let canStartPlaying = true;
let spawnBalls = false;

class Player {
    constructor(x, y, colour) {
        this.position = {
            x: x,
            y: y
        }
        this.velocity = {
            x: 0,
            y: 0.1
        }
        this.colour = colour;
        this.size = 13;
    }

    render() {
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.size, 0, Math.PI * 2, false);
        c.fillStyle = this.colour;
        c.fill();
    }

    update() {
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;

        if(this.position.y + 18 <= canvas.height) {
            this.velocity.y += gravity;    
        }

        if(this.position.y < 0 || (!(this.position.y + 18 < canvas.height))) {
            for(var i = 0; i < 100; i++) {
                particles.push(new Particle(player.position.x, player.position.y, player.colour, Math.random() - 0.5, Math.random() - 0.5)); 
            }
            stopGame();
        }

        if(keys.left.pressed) {
            player.velocity.x = clamp(player.velocity.x - 3, -5, 5);
        } else {
            player.velocity.x = (player.velocity.x / 1.02);
        }

        if(keys.right.pressed) {
            player.velocity.x = clamp(player.velocity.x + 3, -5, 5);
        } else {
            player.velocity.x = (player.velocity.x / 1.02);
        }

        if(this.position.x <= 0) {
            this.position.x = canvas.width - 1;
        }
        if(this.position.x >= canvas.width) {
            this.position.x = 1;
        }

        this.render();
    }

    jump() {
        player.velocity.y = 0;
        player.velocity.y -= 7;
    }
}

class Enemy {
    constructor(x, y, colour, size) {
        this.position = {
            x: x,
            y: y
        }
        this.velocity = {
            x: 0,
            y: 0.1
        }
        this.colour = colour;
        this.size = size;
        this.difficulty = getDifficulty();
    }

    render() {
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.size, 0, Math.PI * 2, false);
        c.fillStyle = this.colour;
        c.fill();
    }

    update() {
        this.position.y += clamp(((this.velocity.y / 4) * (this.size / 5) / 2 * this.difficulty), 0, 12);
        this.position.x += (this.velocity.x / 4) * (this.size / 5) / 2 * this.difficulty;

        this.velocity.y += gravity; 

        this.render();
    }

    size() {
        return this.size;
    }
}

class Particle {
    constructor(x, y, colour, velx, vely) {
        this.position = {
            x: x,
            y: y
        }
        this.velocity = {
            x: velx * (Math.random() * 30),
            y: vely * (Math.random() * 30)
        }
        this.colour = colour;
        this.alpha = 1;
        this.size = 3;
    }

    render() {
        c.beginPath();
        c.globalAlpha = Math.max(0, this.alpha - 0.05);
        c.arc(this.position.x, this.position.y, this.size, 0, Math.PI * 2, false);
        c.fillStyle = this.colour;
        c.fill();
        c.globalAlpha = 1;
    }

    update() {
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;

        this.velocity.x /= 1.05;
        this.velocity.y /= 1.05;

        this.alpha -= 0.02;
        this.render();
    }
}



let player = new Player(innerWidth / 2, innerHeight / 2, "rgb(240, 240, 240)");
let keys = {
    left: {
        pressed: false
    },
    right: {
        pressed: false
    },
    up: {
        pressed: false
    }
}
let enemies = new Array();
let particles = new Array();

c.fillStyle = "rgb(32, 32, 32)"; // set background
c.fillRect(0, 0, canvas.width, canvas.height); // set background
player.update(); // draw initial player

addEventListener("keydown", (event) => {
    if(gameOver) playAgain();
    if(event.key == "ArrowLeft" || event.key == "a") keys.left.pressed = true;
    if(event.key == "ArrowRight" || event.key == "d") keys.right.pressed = true;
    if(event.key == "ArrowUp" || event.key == "w") {
        if(keys.up.pressed != true) {
            player.jump();
        }
        keys.up.pressed = true;
    }
    if(!gameStarted && canStartPlaying && (event.key == "ArrowLeft" || event.key == "ArrowRight" || event.key == "ArrowUp" || event.key == "a" || event.key == "d" || event.key == "w")) {
        var startElement = document.getElementsByClassName("start-wrapper")[0];
        startElement.style.opacity = "0"
        startElement.style.transform = "translateY(100px)";

        gameStarted = true;
        tick();
        showTimer();
        seconds = 0;
        minutes = 0;
        updateTimer();

        setTimeout(function() {
            spawnBalls = true;
        }, 2000);
    }
})

addEventListener("keyup", (event) => {
    if(gameOver) return;
    if(event.key == "ArrowLeft" || event.key == "a") keys.left.pressed = false;
    if(event.key == "ArrowRight" || event.key == "d") keys.right.pressed = false;
    if(event.key == "ArrowUp" || event.key == "w") keys.up.pressed = false;
})

function stopGame() {
    gameOver = true;
    canStartPlaying = false;
    var overlay = document.getElementsByClassName("overlay")[0];
    var dialog = document.getElementsByClassName("end-wrapper")[0];
    var startElement = document.getElementsByClassName("start-wrapper")[0];
    var time = document.getElementsByClassName("time-numbers")[0];
    time.textContent = timerText.textContent.toString();
    startElement.style.opacity = "0"
    overlay.style.opacity = "1";
    dialog.style.opacity = "1";
    dialog.style.transform = "none";
    hideTimer();
    stop = true;
    spawnBalls = false;

    setTimeout(function() {
        canStartNewGame = true;
    }, 700);
}

function end() {
    while(enemies.length != 0) {
        enemies.pop();
    }
    c.fillStyle = "rgb(32, 32, 32)";
    c.fillRect(0, 0, canvas.width, canvas.height);
}

function tick() {
    const id = requestAnimationFrame(tick);
    c.fillStyle = "rgba(32, 32, 32, 0.5)";
    c.fillRect(0, 0, canvas.width, canvas.height);

    if(Math.floor(Math.random() * (chance / getDifficulty()) * 2 / (1 - getDifficultyMult())) == 0 && !gameOver && spawnBalls) {
        const size = clamp(Math.floor(Math.random() * 35), 15, 35);
        enemies.push(new Enemy(Math.floor(Math.random() * canvas.width), -(size * 2), "hsl(" + (Math.random() * 360) + ", 60%, 50%)", clamp((size * (getDifficultyMult() * 2 + 1)) / 2 , 10, 40)));
        enemies[enemies.length - 1].velocity.y = 2;
    }

    if(!gameOver) {
        player.update();
    }

    enemies.forEach((enemy, index) => {
        enemy.update();
        if(enemy.position.y >= canvas.height + 40) {
            enemies.splice(index, 1);
        }

        const distance = Math.hypot(player.position.x - enemy.position.x, player.position.y - enemy.position.y);
            if(distance - player.size - enemy.size < 1 && !gameOver && !godMode) {
                for(var i = 0; i < enemy.size * 3; i++) {
                    particles.push(new Particle(player.position.x, player.position.y, enemy.colour, Math.random() - 0.5, Math.random() - 0.5)); 
                }
                for(var i = 0; i < 15; i++) {
                    particles.push(new Particle(player.position.x, player.position.y, player.colour, Math.random() - 0.5, Math.random() - 0.5)); 
                }
                enemies.splice(index, 1);
                stopGame();
            }
    });

    if(gameOver) {
        fade += 2;
        var alpha = "0.";
        if(fade.toString().length === 1) {
            alpha += ("0" + fade.toString());
        } else {
            alpha += fade.toString();
        }

        if(parseFloat(alpha) > "0.95" || alpha.length == 5) {
            cancelAnimationFrame(id);
            end();
        } else {
            c.fillStyle = "rgba(32, 32, 32, " + alpha + ")";
            c.fillRect(0, 0, canvas.width, canvas.height);
        }

        enemies.forEach((enemy) => {
            enemy.velocity.y = (enemy.velocity.y / 100) * (100 - fade / 3);
        });
    }

    particles.forEach((particle, index) => {
        if(particle.alpha <= 0.04) {
            particles.splice(index, 1);
        } else {
            particle.update();
        }
    });
}

function playAgain() {
    if(gameOver && canStartNewGame) {
        runOverlay();
        gameOver = false;
        gameStarted = false;
        canStartNewGame = false;
        setTimeout(function() {
            player = new Player(innerWidth / 2, innerHeight / 2, "rgb(240, 240, 240)");
            keys = {
                left: {
                    pressed: false
                },
                right: {
                    pressed: false
                },
                up: {
                    pressed: false
                }
            }
            enemies = new Array();
            particles = new Array();
            fade = 0;
        
            c.fillStyle = "rgb(32, 32, 32)"; // set background
            c.fillRect(0, 0, canvas.width, canvas.height); // set background
            player.update(); // draw initial player
        
            var startElement = document.getElementsByClassName("start-wrapper")[0];
            startElement.style.opacity = "1"
            startElement.style.transform = "none";

            var overlay = document.getElementsByClassName("overlay")[0];
            var dialog = document.getElementsByClassName("end-wrapper")[0];
            overlay.style.opacity = "0";
            dialog.style.transform = "translateY(300px)";

            canStartPlaying = true;
        }, 1000);
    }
}

function runOverlay() {
    var overlay = document.getElementsByClassName("overlay")[0];
    var dialog = document.getElementsByClassName("end-wrapper")[0];
    overlay.style.backgroundcolor = "rgba(24, 24, 24, 1);";
    dialog.style.opacity = "0";

    setTimeout(function() {
        var overlay = document.getElementsByClassName("overlay")[0];
        overlay.style.backgroundcolor = "rgba(0, 0, 0, 0.3);";
    }, 1000);
}

let seconds = 0;
let minutes = 0;
let timerText = document.getElementsByClassName("timer-text")[0];

function second() {
    if(seconds + 1 >= 60) {
        minutes += 1;
        seconds = 0;
    } else {
        seconds += 1;
    }

    updateTimer();
    setTimeout(second, 1000);
}

seconds = 0;
minutes = 0;
second();
hideTimer();

function updateTimer() {
    timerText.textContent = ((minutes.toString().length == 1 ? "0" : "") + minutes.toString()) + ":" + (((seconds).toString().length == 1 ? "0" : "") + (seconds).toString());
    var difficulty = getDifficulty();
    if(difficulty == 3) {
        timerText.style.color = "rgb(185, 73, 73)";
    } else if(difficulty == 2) {
        timerText.style.color = "rgb(177, 128, 67)";
    } else {
        timerText.style.color = "rgb(200, 200, 200)";
    }
}

function hideTimer() {
    timerText.style.opacity = "0";
    timerText.style.transform = "translateY(-20px)";
}

function showTimer() {
    timerText.style.opacity = "1";
    timerText.style.transform = "none";
}

function getDifficulty() {
    if(minutes != 0) {
        return 3;
    } else if(seconds >= 30) {
        return 2;
    }
    return 1;
}

// returns number between 1 and 0 based on the timer
function getDifficultyMult() {
    if(minutes > 2) return 1;
    else return ((minutes * 60 + seconds) / 120);
}

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}
