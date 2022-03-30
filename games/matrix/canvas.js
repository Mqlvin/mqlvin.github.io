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
        line.height += 16;

        if(line.height > canvas.width + 50) {
            lines.splice(index, 1);
        }
    });
}

function randomCharacter() {
    var chars = ["Ш","Щ","Ъ","Ы","Ь","Э","Ю","Я","а","б","в","г","ґ","д","ђ","е","ё","є","ж","з","ѕ","и","ї","й","к","л","љ","м","н","њ","о","п","т","ћ","у","ў","ф","х","ц","ч","џ","ш","щ","ъ","ы","ь","э","ю","я","Γ","Δ","Θ","Ι","Λ","Ξ","Π","Σ","Υ","Φ","Χ","Ψ","Ω","α","β","γ","δ","ε","ζ","η","θ","ι","κ","λ","μ","ν","ξ","ο","π","ρ","σ","τ","υ","φ","χ","ψ","ω"];
    // "Ш","Щ","Ъ","Ы","Ь","Э","Ю","Я","а","б","в","г","ґ","д","ђ","е","ё","є","ж","з","ѕ","и","ї","й","к","л","љ","м","н","њ","о","п","т","ћ","у","ў","ф","х","ц","ч","џ","ш","щ","ъ","ы","ь","э","ю","я","Γ","Δ","Θ","Ι","Λ","Ξ","Π","Σ","Υ","Φ","Χ","Ψ","Ω","α","β","γ","δ","ε","ζ","η","θ","ι","κ","λ","μ","ν","ξ","ο","π","ρ","σ","τ","υ","φ","χ","ψ","ω"
    // "a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"
    return chars[Math.floor(Math.random() * chars.length)];
}