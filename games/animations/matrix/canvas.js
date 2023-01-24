const canvas = document.querySelector(".matrix-canvas");
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

let rainbow = true;
let second = false;
let offset = 0;

class Line {
    constructor() {
        this.height = -20;
        this.x = Math.floor(Math.random() * canvas.width);
        this.colour = "";
    }

    update() {
        this.height += 16;
        this.colour = (rainbow ? "hsl(" + (((this.x / (canvas.width / 360)) + offset) * 1) + ", 100%, 50%)" : "rgb(" + (getDecimal(Math.sin((this.x + offset) / canvas.width * 4)) * 150) + ", " + (255) + ", " + (getDecimal(Math.sin((this.x + offset) / canvas.width * 4)) * 150) + ")");
        this.draw();
    }

    draw() {
        c.fillStyle = this.colour;
        c.fillText((Math.random() > 0.5 ? randomCharacter().toUpperCase() : randomCharacter()), this.x, this.height);
    }
}

c.fillStyle = "rgb(0, 0, 0)";
c.fillRect(0, 0, canvas.width, canvas.height);

let lines = [];
let lastFrameUpdated = false;

tick();

function tick() {
    requestAnimationFrame(tick);
	
    if(lastFrameUpdated) {
	lastFrameUpdated = false;
	return;
    } else {
	lastFrameUpdated = true;
    }

    c.fillStyle = "rgba(0, 0, 0, 0.08)";
    c.fillRect(0, 0, canvas.width, canvas.height);

    lines.push(new Line());
    lines.push(new Line());
	
    c.font = "bold 14px 'Press Start 2P'";
    lines.forEach((line, index) => {
        c.fillStyle = line.colour;
	    line.update();

        if(line.height > canvas.width + 50) {
            lines.splice(index, 1);
        }
    });

    offset -= (rainbow ? 1.6 : 10);
}

function randomCharacter() {
    var chars = ["Ƈ","ƈ","Ɖ","Ɗ","Ƌ","ƌ","ƍ","Ǝ","Ə","Ɛ","Ƒ","ƒ","Ɠ","Ɣ","ƕ","Ɩ","Ɨ","Ƙ","ƙ","ƚ","ƛ","Ɯ","Ɲ","ƞ","Ɵ","Ơ","ơ","Ƣ","ƣ","Ƥ","ƥ","Ʀ","Ƨ","ƨ","Ʃ","ƪ","ƫ","Ƭ","ƭ","Ʈ","Ư","ư","Ʊ","Ʋ","Ƴ","ƴ","Ƶ","ƶ","Ʒ","Ƹ","ƹ","Ԟ","ԟ","Ԡ","ԡ","Ԣ","ԣ","Ԧ","ԧ","Ԩ","ԩ","Ԫ","ԫ","Ԭ","ԭ","Ԯ","ԯ","԰","Ա","Բ","Գ","Դ","Ե","Զ","Է","Ը","Թ","Ժ","Ի","Լ","Խ","Ծ","Կ","Հ","Ձ","Ղ","Ճ","Մ","Յ","Ն","Շ","Չ","Պ","Ջ","Ռ","Ս","Վ","Տ","Ր","Ց","Ւ","Փ","Ք","Օ","Ֆ"];
    // ["Ƈ","ƈ","Ɖ","Ɗ","Ƌ","ƌ","ƍ","Ǝ","Ə","Ɛ","Ƒ","ƒ","Ɠ","Ɣ","ƕ","Ɩ","Ɨ","Ƙ","ƙ","ƚ","ƛ","Ɯ","Ɲ","ƞ","Ɵ","Ơ","ơ","Ƣ","ƣ","Ƥ","ƥ","Ʀ","Ƨ","ƨ","Ʃ","ƪ","ƫ","Ƭ","ƭ","Ʈ","Ư","ư","Ʊ","Ʋ","Ƴ","ƴ","Ƶ","ƶ","Ʒ","Ƹ","ƹ","ԝ","Ԟ","ԟ","Ԡ","ԡ","Ԣ","ԣ","Ԥ","ԥ","Ԧ","ԧ","Ԩ","ԩ","Ԫ","ԫ","Ԭ","ԭ","Ԯ","ԯ","԰","Ա","Բ","Գ","Դ","Ե","Զ","Է","Ը","Թ","Ժ","Ի","Լ","Խ","Ծ","Կ","Հ","Ձ","Ղ","Ճ","Մ","Յ","Ն","Շ","Ո","Չ","Պ","Ջ","Ռ","Ս","Վ","Տ","Ր","Ց","Ւ","Փ","Ք","Օ","Ֆ"]
    // "a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"
    return chars[Math.floor(Math.random() * chars.length)];
}

function getDecimal(float) {
    return "0" + float.toString().substring(float.toString().indexOf("."));
}
