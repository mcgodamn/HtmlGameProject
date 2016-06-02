function ini() {
    xpos = -168; //紀錄目前位置
    active = 0; //to record the move state , 1 for left , 2 for right , 0 for still
    skystatus = 'g'; // 'g' for ground , 'j' for jumping , 'a' for slashing to anemy , 'w' for hooking the wall
    ypos = 386;
    document.getElementById("player1").style.position = "relative";
    document.getElementById("player1").style.top = ypos + "px";
    document.getElementById("player1").style.left = xpos + "px";
    document.addEventListener('keydown', move, false);
    document.addEventListener('keyup', move2, false);
}

function move(event) {
    var myevent = event ? event : window.event;
    if ((myevent.keyCode == 38) && (skystatus == 'g')) {
        skystatus = 'j';
        jstatus = 1; // 1 up , 0 down
        jump(jstatus);
    }
    if (myevent.keyCode == 37 && active != 1) {
        active = 1;
        document.getElementById("test").src="playerL.png"
        left();
    }
    else if (myevent.keyCode == 39 && active != 2) {
        active = 2;
        document.getElementById("test").src="playerR.png"
        right();
    }
}

function move2(event2) {
    var myevent = event2 ? event2 : window.event;
    if (myevent.keyCode == 37 && active == 1) {
        active = 0;
    }
    else if (myevent.keyCode == 39 && active == 2) {
        active = 0;
    }
}

function left() {
    if ((active == 1) && (xpos > -373)) {
        xpos -= 1;
        document.getElementById("player1").style.left = xpos + "px";
        setTimeout("left()", 1);
    }
    else if ((active == 1) && (xpos <= -373)) {
        xpos = -373;
        document.getElementById("player1").style.left = xpos + "px";
        active = 0;
    }
}

function right() {
    if ((active == 2) && (xpos < 377)) {
        xpos += 1;
        document.getElementById("player1").style.left = xpos + "px";
        setTimeout("right()", 1);;
    }
    else if ((active == 2) && (xpos >= 377)) {
        xpos = 377;
        document.getElementById("player1").style.left = xpos + "px";
        active = 0;
    }
}

function jump(jsta) {
    if (skystatus == 'j') {
        setTimeout(function(){
            if (jsta == 1) {
                ypos-=3;
                document.getElementById("player1").style.top = ypos + "px";
                if (ypos < 200) jstatus = 0;
                jump(jstatus);
            }
            else if (jsta == 0) {
                ypos+=3;
                document.getElementById("player1").style.top = ypos + "px";
                if (ypos >= 386) {
                    skystatus = 'g';
                    ypos = 386;
                    document.getElementById("player1").style.top = ypos + "px";
                }
                jump(jstatus);
            }
        },1)
    }
}

function test() {
    document.write(skystatus);
}