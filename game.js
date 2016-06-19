//目前問題 slash有時會卡住
//跑步速度 3 刺殺 4 勾索 5

function ini() {
    xpos = -250; //紀錄目前位置
    active = 0; //to record the move state , 1 for left , 2 for right , 0 for still
    // 'g' for ground , 'j' for jumping , 's' for slashing to anemy , 'c' for get close animation after slash, 'w' for hooking the wall
    active2 = 0;
    skystatus = 'g';
    skystatus2 = 'g';
    ypos = 620;
    xpos2 = 250;
    ypos2 = 620;
    swf = 0; //slash and wall flag
    c = 0;
    upf = 0; //up arrow flag
    dof = 0; //down arrow flag
    wd = 0; //wall時的方向，1是上，順時針方向
    sactive = 0;
    swf2 = 0;
    c2 = 0;
    upf2 = 0;
    dof2 = 0;
    wd2 = 0;
    sactive2 = 0;
    document.getElementById("player1").style.position = "relative";
    document.getElementById("player1").style.top = ypos + "px";
    document.getElementById("player1").style.left = xpos + "px";
    document.getElementById("player2").style.position = "relative";
    document.getElementById("player2").style.top = (ypos2-105) + "px";
    document.getElementById("player2").style.left = xpos2 + "px";
    document.addEventListener('keydown', move, false);
    document.addEventListener('keydown', move3, false);
    document.addEventListener('keyup', move2, false);
    document.addEventListener('keyup', move4, false);
    canvas = document.getElementById("canv");
    cxt =  canvas.getContext("2d");
    cxt.lineWidth = 3;
    canvas2 = document.getElementById("canv2");
    cxt2 =  canvas2.getContext("2d");
    cxt2.lineWidth = 3;
    bf = 0;
    bf2 = 0;
    blockl = 0;
    blockr = 0;
    blockl2 = 0;
    blockr2 = 0;
    ss = 0; //斬殺衝突(紀錄誰先砍誰)
}

function move(event) {
    var myevent = event ? event : window.event;
    var wallv;
    if ((myevent.keyCode == 89) && (skystatus != 's') && (skystatus != 'c') && sactive == 0) { //t
        if (skystatus2 == 's') ss = 1;
        bf = 0;
        blockl = 0;
        blockr = 0;
        wd = 0;
        sactive = 1;
        cxt.clearRect(0, 0, canvas.width, canvas.height);
        skystatus = 's';
        swf = 1;
        slash();
    }
    else if (myevent.keyCode == 84) { //r
        if (upf == 1 && active == 0 && wd != 1) { //上
            if (ss == 1) ss = 0;
            cxt.clearRect(0, 0, canvas.width, canvas.height);
            wd = 1;
            wallv = 0;
            cxt.beginPath();
            cxt.moveTo(xpos + 600,ypos + 40);
            cxt.lineTo(xpos + 600, 0);
            cxt.closePath();
            cxt.stroke();
            skystatus = 'w';
            swf = 1;
            wall(upf,dof,wallv);
        }
        else if (dof == 1 && active == 0 && skystatus != 'g' && wd != 5) { //下
            if (ss == 1) ss = 0;
            cxt.clearRect(0, 0, canvas.width, canvas.height);
            wd = 5;
            wallv = 0;
            cxt.beginPath();
            cxt.moveTo(xpos + 600,ypos + 40);
            cxt.lineTo(xpos + 600, 720);
            cxt.closePath();
            cxt.stroke();
            skystatus = 'w';
            swf = 1;
            wall(upf,dof,wallv);
        }
        else if (upf == 0 && dof ==0 && active == 1 && wd != 3) { //右
            if (ss == 1) ss = 0;
            cxt.clearRect(0, 0, canvas.width, canvas.height);
            wd = 3;
            wallv = 1;
            cxt.beginPath();
            cxt.moveTo(xpos + 600,ypos + 40);
            cxt.lineTo(0, ypos + 40);
            cxt.closePath();
            cxt.stroke();
            skystatus = 'w';
            swf = 1;
            wall(upf,dof,wallv);
        }
        else if (upf == 0 && dof ==0 && active == 2 && wd != 7) { //左
            if (ss == 1) ss = 0;
            cxt.clearRect(0, 0, canvas.width, canvas.height);
            wd = 7;
            wallv = 2;
            cxt.beginPath();
            cxt.moveTo(xpos + 600,ypos + 40);
            cxt.lineTo(1200, ypos + 40);
            cxt.closePath();
            cxt.stroke();
            skystatus = 'w';
            swf = 1;
            wall(upf,dof,wallv);
        }
        else if (upf == 1 && active == 2 && wd != 8) { //左上
            if (ss == 1) ss = 0;
            cxt.clearRect(0, 0, canvas.width, canvas.height);
            wd = 8;
            wallv = 2;
            cxt.beginPath();
            cxt.moveTo(xpos + 600,ypos + 40);
            cxt.lineTo(1200, ypos + 40 - (600-xpos));
            cxt.closePath();
            cxt.stroke();
            skystatus = 'w';
            swf = 1;
            wall(upf,dof,wallv);
        }
        else if (upf == 1 && active == 1 && wd != 2) { //右上
            if (ss == 1) ss = 0;
            cxt.clearRect(0, 0, canvas.width, canvas.height);
            wd = 2;
            wallv = 1;
            cxt.beginPath();
            cxt.moveTo(xpos + 600,ypos + 40);
            cxt.lineTo(0, ypos + 40 - (600+xpos));
            cxt.closePath();
            cxt.stroke();
            skystatus = 'w';
            swf = 1;
            wall(upf,dof,wallv);
        }
        else if (dof == 1 && active == 1 && skystatus != 'g' && wd != 6) { //左下
            if (ss == 1) ss = 0;
            cxt.clearRect(0, 0, canvas.width, canvas.height);
            wd = 6;
            wallv = 1;
            cxt.beginPath();
            cxt.moveTo(xpos + 600,ypos + 40);
            cxt.lineTo(xpos + ypos - 40, 720);
            cxt.closePath();
            cxt.stroke();
            skystatus = 'w';
            swf = 1;
            wall(upf,dof,wallv);
        }
        else if (dof == 1 && active == 2 && skystatus != 'g' && wd != 4) { //右下
            if (ss == 1) ss = 0;
            cxt.clearRect(0, 0, canvas.width, canvas.height);
            wd = 4;
            wallv = 2;
            cxt.beginPath();
            cxt.moveTo(xpos + 600,ypos + 40);
            cxt.lineTo(xpos + 1240 - ypos, 720);
            cxt.closePath();
            cxt.stroke();
            skystatus = 'w';
            swf = 1;
            wall(upf,dof,wallv);
        }
    }
    else if (myevent.keyCode == 85 && skystatus != 's') { //u
        if (active == 1) {
            bf = 1;
            blockl = 1;
            blockr = 0;
        }
        else if (active == 2) {
            bf = 1;
            blockr = 1;
            blockl = 0;
        }
    }
    if ((myevent.keyCode == 32) && (skystatus == 'g')) { //space
        skystatus = 'j';
        jstatus = 1; // 1 up , 0 down
        jump(jstatus);
    }
    if ((myevent.keyCode == 65) && (active != 1) && (bf != 1)) {
        active = 1;
        if (swf == 0) {
            document.getElementById("player1").style.top = ypos + "px";
            document.getElementById("test").src="playerLM.png";
            left();
        }
    }
    else if ((myevent.keyCode == 68) && (active != 2) && (bf != 1)) {
        active = 2;
        if (swf == 0) {
            document.getElementById("player1").style.top = ypos + "px";
            document.getElementById("test").src="playerRM.png";
            right();
        }
    }
    if (myevent.keyCode == 87) {
        upf = 1;
        dof = 0;
    }
    else if (myevent.keyCode == 83) {
        dof = 1;
        upf = 0;
    }
}

function move2(event2) {
    var myevent = event2 ? event2 : window.event;
    if (myevent.keyCode == 65 && active == 1) {
        active = 0;
    }
    else if (myevent.keyCode == 68 && active == 2) {
        active = 0;
    }
    if (myevent.keyCode == 87 && upf == 1) upf = 0;
    else if (myevent.keyCode == 83 && dof == 1) dof = 0;
    if (myevent.keyCode == 89) sactive = 0;
    if (myevent.keyCode == 85 && bf == 1) {
        bf = 0;
        blockl = 0;
        blockr = 0;
    }
}

function left() {
    if ((active == 1) && (xpos > -550) && (swf == 0) && (bf != 1)) {
        xpos -= 3;
        document.getElementById("player1").style.left = xpos + "px";
        setTimeout("left()", 1);
    }
    else if ((active == 1) && (xpos <= -550) && (swf == 0) && (bf != 1)) {
        xpos = -550;
        document.getElementById("player1").style.left = xpos + "px";
        active = 0;
    }
}

function right() {
    if ((active == 2) && (xpos < 533) && (swf == 0) && (bf != 1)) {
        xpos += 3;
        document.getElementById("player1").style.left = xpos + "px";
        setTimeout("right()", 1);;
    }
    else if ((active == 2) && (xpos >= 533) && (swf == 0) && (bf != 1)) {
        xpos = 533;
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
                if (ypos < 400) jstatus = 0;
                jump(jstatus);
            }
            else if (jsta == 0) {
                ypos+=3;
                document.getElementById("player1").style.top = ypos + "px";
                if (ypos >= 620) {
                    skystatus = 'g';
                    ypos = 620;
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
            if (i > 0) document.getElementById("test").src="playerLS.png";
            else document.getElementById("test").src="playerRS.png";
            if (Math.abs(i) < 50 && Math.abs(j) < 75) {
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
                if ((ss == 2) || (a < 0 && blockl2 != 1) || (a > 0 && blockr2 != 1) || (skystatus == 'w' && xpos2 == xpos)) {
                    document.removeEventListener('keydown', move, false);
                    document.removeEventListener('keydown', move3, false);
                    document.removeEventListener('keyup', move2, false);
                    document.removeEventListener('keyup', move4, false);
                    document.getElementById("result").innerHTML = "PALYER1 WIN!!";
                }
                a /=abs; //i ,x-index
                b /=abs; //j ,y-index
                if (Math.abs(b) > Math.abs(a) && ypos >= 620) {
                    ypos = 620;
                    if (xpos <= -550) xpos = -550;
                    else if (xpos >= 533) xpos = 533;
                    else xpos -= (a/Math.abs(a))*4;
                }
                else if (Math.abs(a) > Math.abs(b) && xpos >= 533) {
                    xpos = 533;
                    if (ypos <= 0) ypos = 0;
                    else if (ypos >= 620) ypos = 620;
                    else ypos -= (b/Math.abs(b))*4;
                }
                else if (Math.abs(a) > Math.abs(b) && xpos <= -550) {
                    xpos = -550;
                    if (ypos <= 0) ypos = 0;
                    else if (ypos >= 620) ypos = 620;
                    else ypos -= (b/Math.abs(b))*4;
                }
                else {
                    if (xpos <= -550) xpos = -550;
                    else if (xpos >= 533) xpos = 533;
                    else xpos -= a*4;
                    if (ypos <= 0) ypos = 0;
                    else if (ypos >= 620) ypos = 620;
                    else ypos -= b*4;
                }
                document.getElementById("player1").style.top = ypos + "px";
                document.getElementById("player1").style.left = xpos + "px";
                c++;
                close(a,b);
            },1)
        }
    }
    else {
        if(a < 0 ){
            document.getElementById("test").src="playerRM.png";
        }
        else if(a > 0 ){
            document.getElementById("test").src="playerLM.png";
        }
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
                        cleary = ypos + 50;
                        clearx = xpos + 580;
                        ypos-=5;
                        document.getElementById("player1").style.top = ypos + "px";
                        cxt.clearRect(clearx, cleary, 80, 5);
                        wall(1,0,0); 
                    }
                    else {
                        ypos = 0;
                        document.getElementById("player1").style.top = ypos + "px";
                    }
                }
                else if (hori == 1 && verti == 0 && wd == 5) { //下
                    if (ypos < 620) {
                        cleary = ypos + 30;
                        clearx = xpos + 580;
                        ypos+=5;
                        document.getElementById("player1").style.top = ypos + "px";
                        cxt.clearRect(clearx, cleary, 80, 5);
                        wall(0,1,0);
                    }
                    else {
                        swf = 0;
                        skystatus = 'g';
                        cxt.clearRect(0, 0, canvas.width, canvas.height);
                        ypos = 620;
                        document.getElementById("player1").style.top = ypos + "px";
                    }
                }
                else if (hori == 0 && verti == 1 && wd == 3) { //左
                    document.getElementById("test").src="playerLM.png";
                    if (xpos > -550) {
                        xpos-=5;
                        cleary = ypos+30;
                        clearx = xpos + 600;
                        document.getElementById("player1").style.left = xpos + "px";
                        cxt.clearRect(clearx, cleary, 25, 30);
                        wall(0,0,1);
                    }
                    else {
                        xpos = -550;
                        document.getElementById("player1").style.left = xpos + "px";
                    }
                }
                else if (hori == 0 && verti == 2 && wd == 7) { //右
                    document.getElementById("test").src="playerRM.png";
                    if (xpos < 533) {
                        xpos+=5;
                        cleary = ypos+30;
                        clearx = xpos + 580;
                        document.getElementById("player1").style.left = xpos + "px";
                        cxt.clearRect(clearx, cleary, 25, 30);
                        wall(0,0,2);
                    }
                    else {
                        xpos = 533;
                        document.getElementById("player1").style.left = xpos + "px";
                    }
                    
                }
                else if (hori == 2 && verti == 2 && wd == 8) { //右上
                    document.getElementById("test").src="playerRM.png";
                    if (xpos < 533 && ypos > 0) {
                        ypos-=5;
                        xpos+=5;
                        cleary = ypos+20;
                        clearx = xpos + 580;
                        document.getElementById("player1").style.left = xpos + "px";
                        document.getElementById("player1").style.top = ypos + "px";
                        cxt.clearRect(clearx, cleary, 25, 30);
                        wall(1,0,2); 
                    }
                    else if (xpos >= 533 && ypos <= 0) {
                        xpos = 533;
                        ypos = 0;
                        document.getElementById("player1").style.left = xpos + "px";
                        document.getElementById("player1").style.top = ypos + "px";
                    }
                    else if (xpos >= 533) {
                        xpos = 533;
                        document.getElementById("player1").style.left = xpos + "px";
                    }
                    else if (ypos <= 0) {
                        ypos = 0;
                        document.getElementById("player1").style.top = ypos + "px";
                    }
                }
                else if (hori == 2 && verti == 1 && wd == 2) { //左上
                    document.getElementById("test").src="playerLM.png";
                    if (xpos > -550 && ypos > 0) {
                        ypos-=5;
                        xpos-=5;
                        cleary = ypos + 30;
                        clearx = xpos + 600;
                        document.getElementById("player1").style.left = xpos + "px";
                        document.getElementById("player1").style.top = ypos + "px";
                        cxt.clearRect(clearx, cleary, 25, 30);
                        wall(1,0,1);
                    }
                    else if (xpos <= -550 && ypos <= 0) {
                        xpos = -550;
                        ypos = 0;
                        document.getElementById("player1").style.left = xpos + "px";
                        document.getElementById("player1").style.top = ypos + "px";
                    }
                    else if (xpos <= -550) {
                        xpos = -550;
                        document.getElementById("player1").style.left = xpos + "px";
                    }
                    else if (ypos <= 0) {
                        ypos = 0;
                        document.getElementById("player1").style.top = ypos + "px";
                    }
                }
                else if (hori == 1 && verti == 2 && wd == 4) { //右下
                    document.getElementById("test").src="playerRM.png";
                    if (xpos < 533 && ypos < 620) {
                        ypos+=5;
                        xpos+=5;
                        cleary = ypos+20;
                        clearx = xpos+560;
                        document.getElementById("player1").style.left = xpos + "px";
                        document.getElementById("player1").style.top = ypos + "px";
                        cxt.clearRect(clearx, cleary, 30, 30);
                        wall(0,1,2);
                    }
                    else if (xpos >= 533 && ypos >= 620) {
                        xpos = 533;
                        ypos = 620;
                        document.getElementById("player1").style.left = xpos + "px";
                        document.getElementById("player1").style.top = ypos + "px";
                    }
                    else if (xpos >= 533) {
                        xpos = 533;
                        document.getElementById("player1").style.left = xpos + "px";
                    }
                    else if (ypos >= 620) {
                        swf = 0;
                        skystatus = 'g';
                        cxt.clearRect(0, 0, canvas.width, canvas.height);
                        ypos = 620;
                        document.getElementById("player1").style.top = ypos + "px";
                    }
                }
                else if (hori == 1 && verti == 1 && wd == 6) { //左下
                    document.getElementById("test").src="playerLM.png";
                    if (xpos > -550 && ypos < 620) {
                        ypos+=5;
                        xpos-=5;
                        cleary = ypos+30;
                        clearx = xpos+600;
                        document.getElementById("player1").style.left = xpos + "px";
                        document.getElementById("player1").style.top = ypos + "px";
                        cxt.clearRect(clearx, cleary, 25, 30);
                        wall(0,1,1);
                    }
                    else if (xpos <= -550 && ypos >= 620) {
                        xpos = -550;
                        ypos = 620;
                        document.getElementById("player1").style.left = xpos + "px";
                        document.getElementById("player1").style.top = ypos + "px";
                    }
                    else if (xpos <= -550) {
                        xpos = -550;
                        document.getElementById("player1").style.left = xpos + "px";
                    }
                    else if (ypos >= 620) {
                        swf = 0;
                        skystatus = 'g';
                        cxt.clearRect(0, 0, canvas.width, canvas.height);
                        ypos = 620;
                        document.getElementById("player1").style.top = ypos + "px";
                    }
            }
        },1)
    }
}
function test() {
    document.write(skystatus);
}

//---------------------------------------------------------------------------------

function move3(event) {
    var myevent = event ? event : window.event;
    var wallv;
    if ((myevent.keyCode == 219) && (skystatus2 != 's') && (skystatus2 != 'c') && sactive2 == 0) { //{
        if (skystatus == 's') ss = 2;
        bf2 = 0;
        blockl2 = 0;
        blockr2 = 0;
        wd2 = 0;
        sactive2 = 1;
        cxt2.clearRect(0, 0, canvas2.width, canvas2.height);
        skystatus2 = 's';
        swf2 = 1;
        slash2();
    }
    else if (myevent.keyCode == 221) { //}
        if (upf2 == 1 && active2 == 0 && wd2 != 1) { //上
            if (ss == 2) ss = 0;
            cxt2.clearRect(0, 0, canvas2.width, canvas2.height);
            wd2 = 1;
            wallv = 0;
            cxt2.beginPath();
            cxt2.moveTo(xpos2 + 600,ypos2 + 40);
            cxt2.lineTo(xpos2 + 600, 0);
            cxt2.closePath();
            cxt2.stroke();
            skystatus2 = 'w';
            swf2 = 1;
            wall2(upf2,dof2,wallv);
        }
        else if (dof2 == 1 && active2 == 0 && skystatus2 != 'g' && wd2 != 5) { //下
            if (ss == 2) ss = 0;
            cxt2.clearRect(0, 0, canvas2.width, canvas2.height);
            wd2 = 5;
            wallv = 0;
            cxt2.beginPath();
            cxt2.moveTo(xpos2 + 600,ypos2 + 40);
            cxt2.lineTo(xpos2 + 600, 720);
            cxt2.closePath();
            cxt2.stroke();
            skystatus2 = 'w';
            swf2 = 1;
            wall2(upf2,dof2,wallv);
        }
        else if (upf2 == 0 && dof2 ==0 && active2 == 1 && wd2 != 3) { //右
            if (ss == 2) ss = 0;
            cxt2.clearRect(0, 0, canvas2.width, canvas2.height);
            wd2 = 3;
            wallv = 1;
            cxt2.beginPath();
            cxt2.moveTo(xpos2 + 600,ypos2 + 40);
            cxt2.lineTo(0, ypos2 + 40);
            cxt2.closePath();
            cxt2.stroke();
            skystatus2 = 'w';
            swf2 = 1;
            wall2(upf2,dof2,wallv);
        }
        else if (upf2 == 0 && dof2 ==0 && active2 == 2 && wd2 != 7) { //左
            if (ss == 2) ss = 0;
            cxt2.clearRect(0, 0, canvas2.width, canvas2.height);
            wd2 = 7;
            wallv = 2;
            cxt2.beginPath();
            cxt2.moveTo(xpos2 + 600,ypos2 + 40);
            cxt2.lineTo(1200, ypos2 + 40);
            cxt2.closePath();
            cxt2.stroke();
            skystatus2 = 'w';
            swf2 = 1;
            wall2(upf2,dof2,wallv);
        }
        else if (upf2 == 1 && active2 == 2 && wd2 != 8) { //左上
            if (ss == 2) ss = 0;
            cxt2.clearRect(0, 0, canvas2.width, canvas2.height);
            wd2 = 8;
            wallv = 2;
            cxt2.beginPath();
            cxt2.moveTo(xpos2 + 600,ypos2 + 40);
            cxt2.lineTo(1200, ypos2 + 40 - (600-xpos2));
            cxt2.closePath();
            cxt2.stroke();
            skystatus2 = 'w';
            swf2 = 1;
            wall2(upf2,dof2,wallv);
        }
        else if (upf2 == 1 && active2 == 1 && wd2 != 2) { //右上
            if (ss == 2) ss = 0;
            cxt2.clearRect(0, 0, canvas2.width, canvas2.height);
            wd2 = 2;
            wallv = 1;
            cxt2.beginPath();
            cxt2.moveTo(xpos2 + 600,ypos2 + 40);
            cxt2.lineTo(0, ypos2 + 40 - (600+xpos2));
            cxt2.closePath();
            cxt2.stroke();
            skystatus2 = 'w';
            swf2 = 1;
            wall2(upf2,dof2,wallv);
        }
        else if (dof2 == 1 && active2 == 1 && skystatus2 != 'g' && wd2 != 6) { //左下
            if (ss == 2) ss = 0;
            cxt2.clearRect(0, 0, canvas2.width, canvas2.height);
            wd2 = 6;
            wallv = 1;
            cxt2.beginPath();
            cxt2.moveTo(xpos2 + 600,ypos2 + 40);
            cxt2.lineTo(xpos2 + ypos2 - 40, 720);
            cxt2.closePath();
            cxt2.stroke();
            skystatus2 = 'w';
            swf2 = 1;
            wall2(upf2,dof2,wallv);
        }
        else if (dof2 == 1 && active2 == 2 && skystatus2 != 'g' && wd2 != 4) { //右下
            if (ss == 2) ss = 0;
            cxt2.clearRect(0, 0, canvas2.width, canvas2.height);
            wd2 = 4;
            wallv = 2;
            cxt2.beginPath();
            cxt2.moveTo(xpos2 + 600,ypos2 + 40);
            cxt2.lineTo(xpos2 + 1240 - ypos2, 720);
            cxt2.closePath();
            cxt2.stroke();
            skystatus2 = 'w';
            swf2 = 1;
            wall2(upf2,dof2,wallv);
        }
    }
    else if (myevent.keyCode == 220 && skystatus2 != 's') { //\
        if (active2 == 1) {
            bf2 = 1;
            blockl2 = 1;
            blockr2 = 0;
        }
        else if (active2 == 2) {
            bf2 = 1;
            blockr2 = 1;
            blockl2 = 0;
        }
    }
    if ((myevent.keyCode == 17) && (skystatus2 == 'g')) { //ctrl
        skystatus2 = 'j';
        jstatus2 = 1; // 1 up , 0 down
        jump2(jstatus2);
    }
    if ((myevent.keyCode == 37) && (active2 != 1)) {
        active2 = 1;
        if (swf2 == 0) {
            document.getElementById("test2").src="playerLM.png";
            left2();
        }
    }
    else if ((myevent.keyCode == 39) && (active2 != 2)) {
        active2 = 2;
        if (swf2 == 0) {
            document.getElementById("test2").src="playerRM.png";
            right2();
        }
    }
    if (myevent.keyCode == 38) {
        upf2 = 1;
        dof2 = 0;
    }
    else if (myevent.keyCode == 40) {
        dof2 = 1;
        upf2 = 0;
    }
}

function move4(event2) {
    var myevent = event2 ? event2 : window.event;

    if (myevent.keyCode == 37 && active2 == 1) {
        active2 = 0;
    }
    else if (myevent.keyCode == 39 && active2 == 2) {
        active2 = 0;
    }
    if (myevent.keyCode == 38 && upf2 == 1) upf2 = 0;
    else if (myevent.keyCode == 38 && dof2 == 1) dof2 = 0;
    if (myevent.keyCode == 219) sactive2 = 0;
    if (myevent.keyCode == 220 && bf2 == 1) {
        bf2 = 0;
        blockl2 = 0;
        blockr2 = 0;
    }
}

function left2() {
    if ((active2 == 1) && (xpos2 > -550) && (swf2 == 0) && (bf2 != 1)) {
        xpos2 -= 3;
        document.getElementById("player2").style.left = xpos2 + "px";
        setTimeout("left2()", 1);
    }
    else if ((active2 == 1) && (xpos2 <= -550) && (swf2 == 0) && (bf2 != 1)) {
        xpos2 = -550;
        document.getElementById("player2").style.left = xpos2 + "px";
        active2 = 0;
    }
}

function right2() {
    if ((active2 == 2) && (xpos2 < 533) && (swf2 == 0) && (bf2 != 1)) {
        xpos2 += 3;
        document.getElementById("player2").style.left = xpos2 + "px";
        setTimeout("right2()", 1);;
    }
    else if ((active2 == 2) && (xpos2 >= 533) && (swf2 == 0) && (bf2 != 1)) {
        xpos2 = 533;
        document.getElementById("player2").style.left = xpos2 + "px";
        active2 = 0;
    }
}

function jump2(jsta2) {
    if (skystatus2 == 'j') {
        setTimeout(function(){
            if (jsta2 == 1) {
                ypos2-=3;
                document.getElementById("player2").style.top = (ypos2 - 105) + "px";
                if (ypos2 < 400) jstatus2 = 0;
                jump2(jstatus2);
            }
            else if (jsta2 == 0) {
                ypos2+=3;
                document.getElementById("player2").style.top = (ypos2 - 105) + "px";
                if (ypos2 >= 620) {
                    skystatus2 = 'g';
                    ypos2 = 620;
                    document.getElementById("player2").style.top = (ypos2 - 105) + "px";
                }
                jump2(jstatus2);
            }
        },1)
    }
}

function slash2() {
    if (skystatus2 == 's') {
        setTimeout(function(){
            var i,j;
            i = xpos2 - xpos;
            j = ypos2 - ypos;
            if (i > 0) document.getElementById("test2").src="playerLS.png";
            else document.getElementById("test2").src="playerRS.png";
            if (Math.abs(i) < 50 && Math.abs(j) < 75) {
                ss = 0;
                skystatus2 = 'c';
                close2(i , j);
            }
            else {
            var abs =  Math.abs(i) > Math.abs(j) ? Math.abs(i) : Math.abs(j);
            i/=abs;
            j/=abs;
            xpos2 -= i*4;
            ypos2 -= j*4;
            document.getElementById("player2").style.top = (ypos2 - 105) + "px";
            document.getElementById("player2").style.left = xpos2 + "px";
            slash2();
            }
        },1)
    }
}
function close2(a,b) {
    if (c2 < 50) {
        if (skystatus2 == 'c') {
            setTimeout(function(){
                var abs =  Math.abs(a) > Math.abs(b) ? Math.abs(a) : Math.abs(b);
                if ((ss == 1) || (a < 0 && blockl != 1) || (a > 0 && blockr != 1) || (skystatus == 'w' && xpos2 == xpos)) {
                    document.removeEventListener('keydown', move, false);
                    document.removeEventListener('keydown', move3, false);
                    document.removeEventListener('keyup', move2, false);
                    document.removeEventListener('keyup', move4, false);
                    document.getElementById("result").innerHTML = "PALYER2 WIN!!";
                }
                a /=abs; //i ,x-index
                b /=abs; //j ,y-index
                if (Math.abs(b) > Math.abs(a) && ypos2 >= 620) {
                    ypos2 = 620;
                    if (xpos2 <= -550) xpos2 = -550;
                    else if (xpos2 >= 533) xpos2 = 533;
                    else xpos2 -= (a/Math.abs(a))*4;
                }
                else if (Math.abs(a) > Math.abs(b) && xpos2 >= 533) {
                    xpos2 = 533;
                    if (ypos2 <= 0) ypos2 = 0;
                    else if (ypos2 >= 620) ypos2 = 620;
                    else ypos2 -= (b/Math.abs(b))*4;
                }
                else if (Math.abs(a) > Math.abs(b) && xpos2 <= -550) {
                    xpos2 = -550;
                    if (ypos2 <= 0) ypos2 = 0;
                    else if (ypos2 >= 620) ypos2 = 620;
                    else ypos2 -= (b/Math.abs(b))*4;
                }
                else {
                    if (xpos2 <= -550) xpos2 = -550;
                    else if (xpos2 >= 533) xpos2 = 533;
                    else xpos2 -= a*4;
                    if (ypos2 <= 0) ypos2 = 0;
                    else if (ypos2 >= 620) ypos2 = 620;
                    else ypos2 -= b*4;
                }
                document.getElementById("player2").style.top = (ypos2 - 105) + "px";
                document.getElementById("player2").style.left = xpos2 + "px";
                c2++;
                close2(a,b);
            },1)
        }
    }
    else {
        if(a < 0 ){
            document.getElementById("test2").src="playerRM.png";
        }
        else if(a > 0 ){
            document.getElementById("test2").src="playerLM.png";
        }
        c2 = 0;
        skystatus2 = 'j';
        jstatus2 = 0;
        jump2(0);
        swf2 = 0;
    }
}

function wall2(u,d,v) {
    var hori;// 2 for up ,1 for down ,0 for still
    if (u == 1) hori = 2;
    else if ( d == 1) hori = 1;
    else hori = 0;
    var verti = v;
    var cleary;
    var clearx;
    if (skystatus2 == 'w') {
        setTimeout(function(){
                if (hori == 2 && verti == 0 && wd2 == 1) { //上
                    if (ypos2 > 0) {
                        cleary = ypos2 + 50;
                        clearx = xpos2 + 580;
                        ypos2-=5;
                        document.getElementById("player2").style.top = (ypos2 - 105) + "px";
                        cxt2.clearRect(clearx, cleary, 80, 5);
                        wall2(1,0,0); 
                    }
                    else {
                        ypos2 = 0;
                        document.getElementById("player2").style.top = (ypos2 - 105) + "px";
                    }
                    
                }
                else if (hori == 1 && verti == 0 && wd2 == 5) { //下
                    if (ypos2 < 620) {
                        cleary = ypos2 + 30;
                        clearx = xpos2 + 580;
                        ypos2+=5;
                        document.getElementById("player2").style.top = (ypos2 - 105) + "px";
                        cxt2.clearRect(clearx, cleary, 80, 5);
                        wall2(0,1,0);
                    }
                    else {
                        swf2 = 0;
                        skystatus2 = 'g';
                        cxt2.clearRect(0, 0, canvas.width, canvas.height);
                        ypos2 = 620;
                        document.getElementById("player2").style.top = (ypos2 - 105) + "px";
                    }
                }
                else if (hori == 0 && verti == 1 && wd2 == 3) { //左
                    document.getElementById("test2").src="playerLM.png";
                    if (xpos2 > -550) {
                        xpos2-=5;
                        cleary = ypos2+30;
                        clearx = xpos2 + 600;
                        document.getElementById("player2").style.left = xpos2 + "px";
                        cxt2.clearRect(clearx, cleary, 25, 30);
                        wall2(0,0,1);
                    }
                    else {
                        xpos2 = -550;
                        document.getElementById("player2").style.left = xpos2 + "px";
                    }
                }
                else if (hori == 0 && verti == 2 && wd2 == 7) { //右
                    document.getElementById("test2").src="playerRM.png";
                    if (xpos2 < 533) {
                        xpos2+=5;
                        cleary = ypos2+30;
                        clearx = xpos2 + 580;
                        document.getElementById("player2").style.left = xpos2 + "px";
                        cxt2.clearRect(clearx, cleary, 25, 30);
                        wall2(0,0,2);
                    }
                    else {
                        xpos2 = 533;
                        document.getElementById("player2").style.left = xpos2 + "px";
                    }
                    
                }
                else if (hori == 2 && verti == 2 && wd2 == 8) { //右上
                    document.getElementById("test2").src="playerRM.png";
                    if (xpos2 < 533 && ypos2 > 0) {
                        ypos2-=5;
                        xpos2+=5;
                        cleary = ypos2+20;
                        clearx = xpos2 + 580;
                        document.getElementById("player2").style.left = xpos2 + "px";
                        document.getElementById("player2").style.top = (ypos2 - 105) + "px";
                        cxt2.clearRect(clearx, cleary, 25, 30);
                        wall2(1,0,2); 
                    }
                    else if (xpos2 >= 533 && ypos2 <= 0) {
                        xpos2 = 533;
                        ypos2 = 0;
                        document.getElementById("player2").style.left = xpos2 + "px";
                        document.getElementById("player2").style.top = (ypos2 - 105) + "px";
                    }
                    else if (xpos2 >= 533) {
                        xpos2 = 533;
                        document.getElementById("player2").style.left = xpos2 + "px";
                    }
                    else if (ypos2 <= 0) {
                        ypos2 = 0;
                        document.getElementById("player2").style.top = (ypos2 - 105) + "px";
                    }
                }
                else if (hori == 2 && verti == 1 && wd2 == 2) { //左上
                    document.getElementById("test2").src="playerLM.png";
                    if (xpos2 > -550 && ypos2 > 0) {
                        ypos2-=5;
                        xpos2-=5;
                        cleary = ypos2+30;
                        clearx = xpos2 + 600;
                        document.getElementById("player2").style.left = xpos2 + "px";
                        document.getElementById("player2").style.top = (ypos2 - 105) + "px";
                        cxt2.clearRect(clearx, cleary, 25, 30);
                        wall2(1,0,1);
                    }
                    else if (xpos2 <= -550 && ypos2 <= 0) {
                        xpos2 = -550;
                        ypos2 = 0;
                        document.getElementById("player2").style.left = xpos2 + "px";
                        document.getElementById("player2").style.top = (ypos2 - 105) + "px";
                    }
                    else if (xpos2 <= -550) {
                        xpos2 = -550;
                        document.getElementById("player2").style.left = xpos2 + "px";
                    }
                    else if (ypos2 <= 0) {
                        ypos2 = 0;
                        document.getElementById("player2").style.top = (ypos2 - 105) + "px";
                    }
                }
                else if (hori == 1 && verti == 2 && wd2 == 4) { //右下
                    document.getElementById("test2").src="playerRM.png";
                    if (xpos2 < 533 && ypos2 < 620) {
                        ypos2+=5;
                        xpos2+=5;
                        cleary = ypos2+20;
                        clearx = xpos2+560;
                        document.getElementById("player2").style.left = xpos2 + "px";
                        document.getElementById("player2").style.top = (ypos2 - 105) + "px";
                        cxt2.clearRect(clearx, cleary, 30, 30);
                        wall2(0,1,2);
                    }
                    else if (xpos2 >= 533 && ypos2 >= 620) {
                        xpos2 = 533;
                        ypos2 = 620;
                        document.getElementById("player2").style.left = xpos2 + "px";
                        document.getElementById("player2").style.top = (ypos2 - 105) + "px";
                    }
                    else if (xpos2 >= 533) {
                        xpos2 = 533;
                        document.getElementById("player2").style.left = xpos2 + "px";
                    }
                    else if (ypos2 >= 620) {
                        swf2 = 0;
                        skystatus2 = 'g';
                        cxt2.clearRect(0, 0, canvas.width, canvas.height);
                        ypos2 = 620;
                        document.getElementById("player2").style.top = (ypos2 - 105) + "px";
                    }
                }
                else if (hori == 1 && verti == 1 && wd2 == 6) { //左下
                    document.getElementById("test2").src="playerLM.png";
                    if (xpos2 > -550 && ypos2 < 620) {
                        ypos2+=5;
                        xpos2-=5;
                        cleary = ypos2+30;
                        clearx = xpos2+600;
                        document.getElementById("player2").style.left = xpos2 + "px";
                        document.getElementById("player2").style.top = (ypos2 - 105) + "px";
                        cxt2.clearRect(clearx, cleary, 25, 30);
                        wall2(0,1,1);
                    }
                    else if (xpos2 <= -550 && ypos2 >= 620) {
                        xpos2 = -550;
                        ypos2 = 620;
                        document.getElementById("player2").style.left = xpos2 + "px";
                        document.getElementById("player2").style.top = (ypos2 - 105) + "px";
                    }
                    else if (xpos2 <= -550) {
                        xpos2 = -550;
                        document.getElementById("player2").style.left = xpos2 + "px";
                    }
                    else if (ypos2 >= 620) {
                        swf2 = 0;
                        skystatus2 = 'g';
                        cxt2.clearRect(0, 0, canvas.width, canvas.height);
                        ypos2 = 620;
                        document.getElementById("player2").style.top = (ypos2 - 105) + "px";
                    }
            }
        },1)
    }
}