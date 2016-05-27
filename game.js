xpos = -168;
document.addEventListener('keypress', move, false);
function ini() {
    document.getElementById("player1").style.position = "relative";
    document.getElementById("player1").style.top = "386px";
    document.getElementById("player1").style.left = xpos + "px";
}

function move(event) {
    active = 0;
    var myevent = event ? event : window.event;
    if ((myevent.keyCode == 37) && !active) {
        active = 1;
        left();
    }
    else if ((myevent.keyCode == 39) && !active) {
        active = 1;
        right();
    }
}

function left() {
    if (active) {
        xpos -= 5;
        document.getElementById("player1").style.left = xpos + "px";
        status = xpos;
        setTimeout("left()", 25);
    }
}

function right() {
    if (active) {
        xpos += 5;
        document.getElementById("player1").style.left = xpos + "px";
        status = xpos;
        setTimeout("right()", 25);
    }
}