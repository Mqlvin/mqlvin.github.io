let timer_element = null;

const FINAL_DATE = new Date("Jun 23, 2022 19:30:00").getTime();

function loaded() {
    timer_element = document.getElementById("timer-element");

    setInterval(function() {
        var current = new Date().getTime();
        var left = FINAL_DATE - current;

        timer_element.textContent = (Math.floor(left / (1000 * 60 * 60 * 24)) + "d " + (Math.floor((left % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))) + "h " + (Math.floor((left % (1000 * 60 * 60)) / (1000 * 60))) + "m " + (Math.floor((left % (1000 * 60)) / 1000)) + "s");
    }, 1000);
}