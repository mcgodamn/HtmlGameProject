﻿function ini() {
    xpos = -168;
    active = 0; //可不可以按移動鍵 1 2 是不行 0 可以
    flagg = true; //是否在地上的旗幟
    document.getElementById("player1").style.position = "relative";
    document.getElementById("player1").style.top = "386px";
    document.getElementById("player1").style.left = xpos + "px";
    document.addEventListener('keypress', move, false);
    document.addEventListener('keydown', move, false);
    // document.addEventListener('keyup', move, false);
}

function move(event) {
    
    var myevent = event ? event : window.event;
    if ((myevent.keyCode == 37) && !active) {
        active = 1;
        i = 0; //迴圈計數器
        left();
    }
    else if ((myevent.keyCode == 39) && !active) {
        active = 2;
        i = 0;
        right();
    }
    // else if ((myevent.keyCode == 38) && !active) {
    //     jump();
    // }
}

function left() {
    if ((active == 1) && (parseInt(document.getElementById("player1").style.left) > -373) && i < 5) {
        i++;
        xpos -= 1;
        document.getElementById("player1").style.left = xpos + "px";
        status = xpos;
        setTimeout("left()", 2);
        if(document.getElementById("player1").style.left == "-373px"){
            active = 0;
        }
    }
    else if ((active == 1) && (parseInt(document.getElementById("player1").style.left) > -373) && i == 5) {
        xpos -= 1;
        document.getElementById("player1").style.left = xpos + "px";
        status = xpos;
        active = 0;
    }
    else xpos += 1;
}

function right() {
    if ((active == 2) && (parseInt(document.getElementById("player1").style.left) < 377)  && i < 5) {
        i++;
        xpos += 1;
        document.getElementById("player1").style.left = xpos + "px";
        status = xpos;
        setTimeout("right()", 2);
        if(document.getElementById("player1").style.left == "377px"){
            active = 0;
        }
    }
    else if ((active == 2) && (parseInt(document.getElementById("player1").style.left) < 377)  && i == 5) {
        xpos += 1;
        document.getElementById("player1").style.left = xpos + "px";
        status = xpos;
        active = 0;
    }
    else xpos -= 1;
}