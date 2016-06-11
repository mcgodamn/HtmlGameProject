function ini() {
    xpos = -168; //紀錄目前位置
    active = 0; //to record the move state , 1 for left , 2 for right , 0 for still
    skystatus = 'g'; // 'g' for ground , 'j' for jumping , 's' for slashing to anemy , 'w' for hooking the wall
    ypos = 386;
    xpos2 = 168;
    ypos2 = 386;
    slashf = 0;
    c = 0;
    document.getElementById("player1").style.position = "relative";
    document.getElementById("player1").style.top = ypos + "px";
    document.getElementById("player1").style.left = xpos + "px";
    document.getElementById("player2").style.position = "relative";
    document.getElementById("player2").style.top = (ypos2 - 94) + "px";
    document.getElementById("player2").style.left = xpos2 + "px";
    document.addEventListener('keydown', move, false);
    document.addEventListener('keyup', move2, false);
}

function move(event) {
    var myevent = event ? event : window.event;
    if (myevent.keyCode == 90) {
        skystatus = 's';
        slashf = 1;
        slash();
    }
    else if (myevent.keyCode == 88) {
        skystatus = 'w';
        wall();
    }
    if ((myevent.keyCode == 32) && (skystatus == 'g')) {
        skystatus = 'j';
        jstatus = 1; // 1 up , 0 down
        jump(jstatus);
    }
    if ((myevent.keyCode == 37) && (active != 1) && (slashf == 0)) {
        active = 1;
        document.getElementById("test").src="playerL.png";
        left();
    }
    else if ((myevent.keyCode == 39) && (active != 2) && (slashf == 0)) {
        active = 2;
        document.getElementById("test").src="playerR.png";
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
        xpos -= 3;
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
        xpos += 3;
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

function slash() {
    if (skystatus == 's') {
        setTimeout(function(){
            var i,j;
            i = xpos - xpos2;
            j = ypos - ypos2;
            if (i > 0) document.getElementById("test").src="playerL.png";
            else document.getElementById("test").src="playerR.png";
            if (Math.abs(i) < 50 && Math.abs(j) < 90) {
                skystatus = 'c';
                close(i , j);
            }
            else {
            var abs =  Math.abs(i) > Math.abs(j) ? Math.abs(i) : Math.abs(j);
            i/=abs;
            j/=abs;
            xpos -= i*3;
            ypos -= j*3;
            document.getElementById("player1").style.top = ypos + "px";
            document.getElementById("player1").style.left = xpos + "px";
            slash();
            }
        },1)
        if ((ypos == ypos2) && (xpos == xpos2)) {
            slashf = 0;
            skystatus = 'g';
        }
    }
}

function close(a,b) {
    ta = a;
    tb = b;
    if (c < 50) {
        if (skystatus == 'c') {
            setTimeout(function(){
                var abs =  Math.abs(a) > Math.abs(b) ? Math.abs(a) : Math.abs(b);
                a /=abs;
                b /=abs;
                xpos -= a*3;
                ypos -= b*3;
                document.getElementById("player1").style.top = ypos + "px";
                document.getElementById("player1").style.left = xpos + "px";
                c++;
                close(a,b);
            },1)
        }
    }
    else {
        c = 0;
        slashf = 0;
        jsta = 0;
        skystatus = 'j';
        jump(jsta);
    }
}

function test() {
    document.write(skystatus);
}