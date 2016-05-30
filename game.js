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
        active = 2;
        right();
    }
}

function left() {
    if ((active==1)&&(parseInt(document.getElementById("player1").style.left)>-373)) {
        xpos -= 5;
        document.getElementById("player1").style.left = xpos + "px";
        status = xpos;
        setTimeout("left()", 25);
        if(document.getElementById("player1").style.left=="-373px"){
            active=0;
        }

    }
}

function right() {
    if ((active==2)&&(parseInt(document.getElementById("player1").style.left)<377)) {
        xpos += 5;
        document.getElementById("player1").style.left = xpos + "px";
        status = xpos;
        setTimeout("right()", 25);
        if(document.getElementById("player1").style.left=="377px"){
            active=0;
        }
    }
}
