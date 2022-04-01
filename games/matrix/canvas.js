const canvas = document.querySelector(".matrix-canvas");
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

let rainbow = false;
let second = false;

class Line {
    constructor() {
        this.speed = 5;
        this.colour = (rainbow ? "hsl(" + (Math.random() * 360) + ", 100%, 50%)" : "rgb(0, 255, 0)");
        this.height = -20;
        this.offset = Math.floor(Math.random() * canvas.width);
    }
}

c.fillStyle = "rgb(0, 0, 0)";
c.fillRect(0, 0, canvas.width, canvas.height);

let lines = [];

tick();

function tick() {
    requestAnimationFrame(tick);

    c.fillStyle = "rgba(0, 0, 0, 0.08)";
    c.fillRect(0, 0, canvas.width, canvas.height);

    lines.push(new Line());
    
    c.font = "14px 'Press Start 2P'";
    lines.forEach((line, index) => {
        c.fillStyle = line.colour;
        c.fillText((Math.random() > 0.5 ? randomCharacter().toUpperCase() : randomCharacter()), line.offset, line.height)
	        c.fillText((Math.random() > 0.5 ? randomCharacter().toUpperCase() : randomCharacter()), line.offset + 12, line.height)
        line.height += 16;

        if(line.height > canvas.width + 50) {
            lines.splice(index, 1);
        }
    });
}

function randomCharacter() {
    var chars = ["Ƈ","ƈ","Ɖ","Ɗ","Ƌ","ƌ","ƍ","Ǝ","Ə","Ɛ","Ƒ","ƒ","Ɠ","Ɣ","ƕ","Ɩ","Ɨ","Ƙ","ƙ","ƚ","ƛ","Ɯ","Ɲ","ƞ","Ɵ","Ơ","ơ","Ƣ","ƣ","Ƥ","ƥ","Ʀ","Ƨ","ƨ","Ʃ","ƪ","ƫ","Ƭ","ƭ","Ʈ","Ư","ư","Ʊ","Ʋ","Ƴ","ƴ","Ƶ","ƶ","Ʒ","Ƹ","ƹ","ԝ","Ԟ","ԟ","Ԡ","ԡ","Ԣ","ԣ","Ԥ","ԥ","Ԧ","ԧ","Ԩ","ԩ","Ԫ","ԫ","Ԭ","ԭ","Ԯ","ԯ","԰","Ա","Բ","Գ","Դ","Ե","Զ","Է","Ը","Թ","Ժ","Ի","Լ","Խ","Ծ","Կ","Հ","Ձ","Ղ","Ճ","Մ","Յ","Ն","Շ","Ո","Չ","Պ","Ջ","Ռ","Ս","Վ","Տ","Ր","Ց","Ւ","Փ","Ք","Օ","Ֆ"];
    // ["Ƈ","ƈ","Ɖ","Ɗ","Ƌ","ƌ","ƍ","Ǝ","Ə","Ɛ","Ƒ","ƒ","Ɠ","Ɣ","ƕ","Ɩ","Ɨ","Ƙ","ƙ","ƚ","ƛ","Ɯ","Ɲ","ƞ","Ɵ","Ơ","ơ","Ƣ","ƣ","Ƥ","ƥ","Ʀ","Ƨ","ƨ","Ʃ","ƪ","ƫ","Ƭ","ƭ","Ʈ","Ư","ư","Ʊ","Ʋ","Ƴ","ƴ","Ƶ","ƶ","Ʒ","Ƹ","ƹ","ԝ","Ԟ","ԟ","Ԡ","ԡ","Ԣ","ԣ","Ԥ","ԥ","Ԧ","ԧ","Ԩ","ԩ","Ԫ","ԫ","Ԭ","ԭ","Ԯ","ԯ","԰","Ա","Բ","Գ","Դ","Ե","Զ","Է","Ը","Թ","Ժ","Ի","Լ","Խ","Ծ","Կ","Հ","Ձ","Ղ","Ճ","Մ","Յ","Ն","Շ","Ո","Չ","Պ","Ջ","Ռ","Ս","Վ","Տ","Ր","Ց","Ւ","Փ","Ք","Օ","Ֆ"]
    // "a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"
    return chars[Math.floor(Math.random() * chars.length)];
}