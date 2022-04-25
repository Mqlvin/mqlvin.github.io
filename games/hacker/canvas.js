const canvas = document.querySelector(".matrix-canvas");
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const lines = ["package me.structure.base;",
                "",
                "import network.analyser.*;",
                "import network.interface.*;",
                "import network.MainFrame;",
                "",
                "import static opengl.renderer.Overlay;",
                "import static opengl.util.Math;",
                "",
                "public class FrameworkBypass {",
                "   private static ArrayList<UserLog> log;",
                "",
                "   public static void main(String[] args) {",
                "       Analyser.startRecording();",
                "       Analyser.setSilent(true);",
                "",
                "       NetworkInterface ni = new NetworkInterface(anonymous, null);",
                "       ni.trackNetwork();",
                "",
                "       log = new ArrayList<>();",
                "   }",
                "",
                "   public static void bypass() {",
                "       ArrayList<String> passwords = network.MainFrame.setPassword('TAKE * FROM PASSWORD');",
                "       String adminPassword = null;",
                "       for(String password : passwords) {",
                "           if(password.getPriority().equals(UserType.ADMIN);) {",
                "               adminPassword = password;",
                "               break;",
                "           }",
                "       }",
                "       network.MainFrame.login(adminPassword);",
                "       System.out.println(\"Full network access granted.\");",
                "   }",
                "}"]
const text = lines.join("⬇");

let padX = 27;
let padY = 45;

window.addEventListener("keypress", event => {
    console.log("keypresed")
    typer.pressed();
});

class Typer {
    constructor() {
        this.speed = 3;
        this.x = 0;
        this.y = 0;
        this.colour = "hsl(100, 100%, 50%)";

        this.textOffset = 0;
    }

    pressed() {
        c.fillStyle = this.colour;
        c.font = "bold 20px 'VT323'";
        for(var i = 0; i < this.speed; i++) {
            if(text.charAt((this.textOffset) + (i)) == "⬇") {
                this.x = 0;
                this.y += 22;
                continue;
            }
            c.fillText(text.charAt((this.textOffset) + (i)).toString(), this.x + padX, this.y + padY);
            this.x += 11;
        }
        this.textOffset += this.speed;
    }
}

c.fillStyle = "rgb(0, 0, 0)";
c.fillRect(0, 0, canvas.width, canvas.height);

const typer = new Typer();