function ini() {
    xpos = -168; //紀錄目前位置
    active = 0; //to record the move state , 1 for left , 2 for right , 0 for still
    // 'g' for ground , 'j' for jumping , 's' for slashing to anemy , 'c' for get close animation after slash, 'w' for hooking the wall
    skystatus = 'g';
    ypos = 386;
    xpos2 = 168;
    ypos2 = 386;
    swf = 0; //slash and wall flag
    c = 0;
    upf = 0; //up arrow flag
    dof = 0; //down arrow flag
    wd = 0; //wall時的方向，1是上，順時針方向
    sactive = 0;
    document.getElementById("player1").style.position = "relative";
    document.getElementById("player1").style.top = ypos + "px";
    document.getElementById("player1").style.left = xpos + "px";
    document.getElementById("player2").style.position = "relative";
    document.getElementById("player2").style.top = (ypos2 - 100) + "px";
    document.getElementById("player2").style.left = xpos2 + "px";
    document.addEventListener('keydown', move, false);
    document.addEventListener('keyup', move2, false);
    canvas = document.getElementById("canv");
    cxt =  canvas.getContext("2d");
    cxt.lineWidth = 3;
    // var cxt=c.getContext("2d");
    // cxt.moveTo(10,10);
    // cxt.lineTo(150,50);
    // cxt.lineTo(10,50);
    // cxt.stroke();
}

function move(event) {
    var myevent = event ? event : window.event;
    var wallv;
    if ((myevent.keyCode == 90) && (skystatus != 's') && (skystatus != 'c') && sactive == 0) { //z
        sactive = 1;
        cxt.clearRect(0, 0, canvas.width, canvas.height);
        skystatus = 's';
        swf = 1;
        slash();
    }
    else if (myevent.keyCode == 88) { //x
        cxt.clearRect(0, 0, canvas.width, canvas.height);
        if (upf == 1 && active == 0 && wd != 1) { //上
            wd = 1;
            wallv = 0;
            cxt.beginPath();
            cxt.moveTo(xpos + 400,ypos + 40);
            cxt.lineTo(xpos + 400, 0);
            cxt.closePath();
            cxt.stroke();
            skystatus = 'w';
            swf = 1;
            wall(upf,dof,wallv);
        }
        else if (dof == 1 && active == 0 && skystatus != 'g' && wd != 5) { //下
            wd = 5;
            wallv = 0;
            cxt.beginPath();
            cxt.moveTo(xpos + 400,ypos + 40);
            cxt.lineTo(xpos + 400, 480);
            cxt.closePath();
            cxt.stroke();
            skystatus = 'w';
            swf = 1;
            wall(upf,dof,wallv);
        }
        else if (upf == 0 && dof ==0 && active == 1 && wd != 3) { //右
            wd = 3;
            wallv = 1;
            cxt.beginPath();
            cxt.moveTo(xpos + 400,ypos + 40);
            cxt.lineTo(0, ypos + 40);
            cxt.closePath();
            cxt.stroke();
            skystatus = 'w';
            swf = 1;
            wall(upf,dof,wallv);
        }
        else if (upf == 0 && dof ==0 && active == 2 && wd != 7) { //左
            wd = 7;
            wallv = 2;
            cxt.beginPath();
            cxt.moveTo(xpos + 400,ypos + 40);
            cxt.lineTo(800, ypos + 40);
            cxt.closePath();
            cxt.stroke();
            skystatus = 'w';
            swf = 1;
            wall(upf,dof,wallv);
        }
        else if (upf == 1 && active == 2 && wd != 8) { //左上
            wd = 8;
            wallv = 2;
            cxt.beginPath();
            cxt.moveTo(xpos + 400,ypos + 40);
            cxt.lineTo(800, ypos + 40 - (400-xpos));
            cxt.closePath();
            cxt.stroke();
            skystatus = 'w';
            swf = 1;
            wall(upf,dof,wallv);
        }
        else if (upf == 1 && active == 1 && wd != 2) { //右上
            wd = 2;
            wallv = 1;
            cxt.beginPath();
            cxt.moveTo(xpos + 400,ypos + 40);
            cxt.lineTo(0, ypos + 40 - (400+xpos));
            cxt.closePath();
            cxt.stroke();
            skystatus = 'w';
            swf = 1;
            wall(upf,dof,wallv);
        }
        else if (dof == 1 && active == 1 && skystatus != 'g' && wd != 6) { //左下
            wd = 6;
            wallv = 1;
            cxt.beginPath();
            cxt.moveTo(xpos + 400,ypos + 40);
            cxt.lineTo(xpos + ypos - 40, 480);
            cxt.closePath();
            cxt.stroke();
            skystatus = 'w';
            swf = 1;
            wall(upf,dof,wallv);
        }
        else if (dof == 1 && active == 2 && skystatus != 'g' && wd != 4) { //右下
            wd = 4;
            wallv = 2;
            cxt.beginPath();
            cxt.moveTo(xpos + 400,ypos + 40);
            cxt.lineTo(xpos + 840 - ypos, 480);
            cxt.closePath();
            cxt.stroke();
            skystatus = 'w';
            swf = 1;
            wall(upf,dof,wallv);
        }
    }
    if ((myevent.keyCode == 32) && (skystatus == 'g')) { //space
        skystatus = 'j';
        jstatus = 1; // 1 up , 0 down
        jump(jstatus);
    }
    if ((myevent.keyCode == 37) && (active != 1)) {
        active = 1;
        if (swf == 0) {
            document.getElementById("test").src="playerL.png";
            left();
        }
    }
    else if ((myevent.keyCode == 39) && (active != 2)) {
        active = 2;
        if (swf == 0) {
            document.getElementById("test").src="playerR.png";
            right();
        }
    }
    if (myevent.keyCode == 38) {
        upf = 1;
        dof = 0;
    }
    else if (myevent.keyCode == 40) {
        dof = 1;
        upf = 0;
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
    if (myevent.keyCode == 38 && upf == 1) upf = 0;
    else if (myevent.keyCode == 38 && dof == 1) dof = 0;
    if (myevent.keyCode == 90) sactive = 0;
}

function left() {
    if ((active == 1) && (xpos > -373) && (swf == 0)) {
        xpos -= 3;
        document.getElementById("player1").style.left = xpos + "px";
        setTimeout("left()", 1);
    }
    else if ((active == 1) && (xpos <= -373) && (swf == 0)) {
        xpos = -373;
        document.getElementById("player1").style.left = xpos + "px";
        active = 0;
    }
}

function right() {
    if ((active == 2) && (xpos < 377) && (swf == 0)) {
        xpos += 3;
        document.getElementById("player1").style.left = xpos + "px";
        setTimeout("right()", 1);;
    }
    else if ((active == 2) && (xpos >= 377) && (swf == 0)) {
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
            xpos -= i*4;
            ypos -= j*4;
            document.getElementById("player1").style.top = ypos + "px";
            document.getElementById("player1").style.left = xpos + "px";
            slash();
            }
        },1)
    }
}
function close(a,b) {
    if (c < 50) {
        if (skystatus == 'c') {
            setTimeout(function(){
                var abs =  Math.abs(a) > Math.abs(b) ? Math.abs(a) : Math.abs(b);
                a /=abs;
                b /=abs;
                if (xpos <= -373) xpos = -373;
                else if (xpos >= 377) xpos = 377;
                else xpos -= a*3;
                if (ypos <= 0) ypos = 0;
                else if (ypos >= 386) ypos = 386;
                else ypos -= b*3;
                document.getElementById("player1").style.top = ypos + "px";
                document.getElementById("player1").style.left = xpos + "px";
                c++;
                close(a,b);
            },1)
        }
    }
    else {
        c = 0;
        skystatus = 'j';
        jstatus = 0;
        jump(0);
        swf = 0;
    }
}

function wall(u,d,v) {
    var hori;// 2 for up ,1 for down ,0 for still
    if (u == 1) hori = 2;
    else if ( d == 1) hori = 1;
    else hori = 0;
    var verti = v;
    var cleary;
    var clearx;
    if (skystatus == 'w') {
        setTimeout(function(){
                if (hori == 2 && verti == 0 && wd == 1) { //上
                    if (ypos > 0) {
                        cleary = ypos + 40;
                        clearx = xpos + 380;
                        ypos-=3;
                        document.getElementById("player1").style.top = ypos + "px";
                        cxt.clearRect(clearx, cleary, 30, 3);
                        wall(1,0,0); 
                    }
                    else {
                        ypos = 0;
                        document.getElementById("player1").style.top = ypos + "px";
                    }
                    
                }
                else if (hori == 1 && verti == 0 && wd == 5) { //下
                    if (ypos < 386) {
                        cleary = ypos+30;
                        clearx = xpos + 380;
                        ypos+=3;
                        document.getElementById("player1").style.top = ypos + "px";
                        cxt.clearRect(clearx, cleary, 30, 3);
                        wall(0,1,0);
                    }
                    else {
                        swf = 0;
                        skystatus = 'g';
                        cxt.clearRect(0, 0, canvas.width, canvas.height);
                        ypos = 386;
                        document.getElementById("player1").style.top = ypos + "px";
                    }
                }
                else if (hori == 0 && verti == 1 && wd == 3) { //左
                    if (xpos > -373) {
                        xpos-=3;
                        cleary = ypos+30;
                        clearx = xpos + 400;
                        document.getElementById("player1").style.left = xpos + "px";
                        cxt.clearRect(clearx, cleary, 25, 30);
                        wall(0,0,1);
                    }
                    else {
                        xpos = -373;
                        document.getElementById("player1").style.left = xpos + "px";
                    }
                }
                else if (hori == 0 && verti == 2 && wd == 7) { //右
                    if (xpos < 377) {
                        xpos+=3;
                        cleary = ypos+30;
                        clearx = xpos + 380;
                        document.getElementById("player1").style.left = xpos + "px";
                        cxt.clearRect(clearx, cleary, 25, 30);
                        wall(0,0,2);
                    }
                    else {
                        xpos = 377;
                        document.getElementById("player1").style.left = xpos + "px";
                    }
                    
                }
                else if (hori == 2 && verti == 2 && wd == 8) { //右上
                    if (xpos < 377 && ypos > 0) {
                        ypos-=3;
                        xpos+=3;
                        cleary = ypos+30;
                        clearx = xpos + 380;
                        document.getElementById("player1").style.left = xpos + "px";
                        document.getElementById("player1").style.top = ypos + "px";
                        cxt.clearRect(clearx, cleary, 25, 30);
                        wall(1,0,2); 
                    }
                    else if (xpos >= 377 && ypos <= 0) {
                        xpos = 377;
                        ypos = 0;
                        document.getElementById("player1").style.left = xpos + "px";
                        document.getElementById("player1").style.top = ypos + "px";
                    }
                    else if (xpos >= 377) {
                        xpos = 377;
                        document.getElementById("player1").style.left = xpos + "px";
                    }
                    else if (ypos <= 0) {
                        ypos = 0;
                        document.getElementById("player1").style.top = ypos + "px";
                    }
                }
                else if (hori == 2 && verti == 1 && wd == 2) { //左上
                    if (xpos > -373 && ypos > 0) {
                        ypos-=3;
                        xpos-=3;
                        cleary = ypos+30;
                        clearx = xpos + 380;
                        document.getElementById("player1").style.left = xpos + "px";
                        document.getElementById("player1").style.top = ypos + "px";
                        cxt.clearRect(clearx, cleary, 25, 30);
                        wall(1,0,1);
                    }
                    else if (xpos <= -373 && ypos <= 0) {
                        xpos = -373;
                        ypos = 0;
                        document.getElementById("player1").style.left = xpos + "px";
                        document.getElementById("player1").style.top = ypos + "px";
                    }
                    else if (xpos <= -373) {
                        xpos = -373;
                        document.getElementById("player1").style.left = xpos + "px";
                    }
                    else if (ypos <= 0) {
                        ypos = 0;
                        document.getElementById("player1").style.top = ypos + "px";
                    }
                }
                else if (hori == 1 && verti == 2 && wd == 4) { //右下
                    if (xpos < 377 && ypos < 386) {
                        ypos+=3;
                        xpos+=3;
                        cleary = ypos+30;
                        clearx = xpos+380;
                        document.getElementById("player1").style.left = xpos + "px";
                        document.getElementById("player1").style.top = ypos + "px";
                        cxt.clearRect(clearx, cleary, 25, 30);
                        wall(0,1,2);
                    }
                    else if (xpos >= 377 && ypos >= 386) {
                        xpos = 377;
                        ypos = 386;
                        document.getElementById("player1").style.left = xpos + "px";
                        document.getElementById("player1").style.top = ypos + "px";
                    }
                    else if (xpos >= 377) {
                        xpos = 377;
                        document.getElementById("player1").style.left = xpos + "px";
                    }
                    else if (ypos >= 386) {
                        swf = 0;
                        skystatus = 'g';
                        cxt.clearRect(0, 0, canvas.width, canvas.height);
                        ypos = 386;
                        document.getElementById("player1").style.top = ypos + "px";
                    }
                }
                else if (hori == 1 && verti == 1 && wd == 6) { //左下
                    if (xpos > -373 && ypos < 386) {
                        ypos+=3;
                        xpos-=3;
                        cleary = ypos+30;
                        clearx = xpos+380;
                        document.getElementById("player1").style.left = xpos + "px";
                        document.getElementById("player1").style.top = ypos + "px";
                        cxt.clearRect(clearx, cleary, 25, 30);
                        wall(0,1,1);
                    }
                    else if (xpos <= -373 && ypos >= 386) {
                        xpos = -373;
                        ypos = 386;
                        document.getElementById("player1").style.left = xpos + "px";
                        document.getElementById("player1").style.top = ypos + "px";
                    }
                    else if (xpos <= -373) {
                        xpos = -373;
                        document.getElementById("player1").style.left = xpos + "px";
                    }
                    else if (ypos >= 386) {
                        swf = 0;
                        skystatus = 'g';
                        cxt.clearRect(0, 0, canvas.width, canvas.height);
                        ypos = 386;
                        document.getElementById("player1").style.top = ypos + "px";
                    }
            }
        },1)
    }
}
function test() {
    document.write(skystatus);
}