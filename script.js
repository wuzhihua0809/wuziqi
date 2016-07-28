function drawRect() {
	var canvas = document.getElementById("canvas");
    var rollback = document.getElementById("rollback");
    var restart = document.getElementById("restart");
    var context = canvas.getContext("2d");
    var isBlack = true;
    var isWin = false;
    var a = false;
    var m;
    var n;
    var chessData = [];
    for (var i=0; i<15; i++) {
        chessData[i] = [];
        for (var j=0; j<15; j++) {
            chessData[i][j] = 0;
        }
    }

    var drawchessBoard = function() {
    	for (var i = 0; i < 15; i ++) {
        context.beginPath();
        context.moveTo(15 + i*30, 15);
        context.lineTo(15 + i*30, 435);
        context.stroke();
        context.moveTo(15, 15 + i*30);
        context.lineTo(435, 15 + i*30);
        context.stroke();
        context.closePath();
	    }
    }
    drawchessBoard();
    var onestep = function(i, j, a) {
    	context.beginPath();
	    context.arc(15 + i*30, 15 + j*30, 13, 0, 2* Math.PI);
	    context.closePath();
	    if(a) {
	    	context.fillStyle = "#000";
	    }
	    else {
	    	context.fillStyle = "#fff";
	    }
	    context.fill();
    }
    canvas.onclick = function(e) {
        var x = e.offsetX;
        var y = e.offsetY;
        var i = Math.floor(x / 30);
        var j = Math.floor(y / 30);
        m = i;
        n = j;
        if (isWin) {
            alert("再来一局吧");
            return;
        };
        if(chessData[i][j] == 0) {
            onestep(i, j, isBlack);
            if (isBlack) {
                chessData[i][j] = 1;
                judge(i, j, 1);
            } else{
                chessData[i][j] = 2;
                judge(i, j, 2);
            };
            isBlack = !isBlack;
            a = false;
        }
    }
    function judge(x, y, chess) {
        var count1 = 0;
        var count2 = 0;
        var count3 = 0;
        var count4 = 0;

        //左右
        for (var i = x; i >= 0; i--) {
            if (chessData[i][y] != chess) {
                break;
            }
            count1++;
        }
        for (var i = x + 1; i < 15; i++) {
            if (chessData[i][y] != chess) {
                break;
            }
            count1++;
        }
        //上下
        for (var i = y; i >= 0; i--) {
            if (chessData[x][i] != chess) {
                break;
            }
            count2++;
        }
        for (var i = y + 1; i < 15; i++) {
            if (chessData[x][i] != chess) {
                break;
            }
            count2++;
        }
        //右斜线
        for (var i = x, j = y; i >= 0 && j >= 0; i--, j--) {
            if (chessData[i][j] != chess) {
                break;
            }
            count3++;
        }
        for (var i = x + 1, j = y + 1; i < 15 && j < 15; i++, j++) {
            if (chessData[i][j] != chess) {
                break;
            }
            count3++;
        }
        //左斜线
        for (var i = x, j = y; i >= 0 && j < 15; i--, j++) {
            if (chessData[i][j] != chess) {
                break;
            }
            count4++;
        }
        for (var i = x + 1, j = y - 1; i < 15 && j >= 0; i++, j--) {
            if (chessData[i][j] != chess) {
                break;
            }
            count4++;
        }

        if (count1 >= 5 || count2 >= 5 || count3 >= 5 || count4 >= 5) {
            if (chess == 1) {
                alert("黑棋赢了");
            }
            else {
                alert("白棋赢了");
            }
            isWin = true;
        }
    }
    rollback.onclick = function() {
        if (isWin) {
            alert("再来一局吧");
            return;
        }
        if (a) {
            alert("你已经悔过一次了");
            return;
        };
        context.clearRect(0, 0, 450, 450);
        drawchessBoard();
        chessData[m][n] = 0;
        for (var i=0; i<15; i++) {
            for (var j=0; j<15; j++) {
                if (chessData[i][j] == 1) {
                    onestep(i, j, true);
                }
                else if (chessData[i][j] == 2) {
                    onestep(i, j, false);
                }
            }
        }
        isBlack = !isBlack;
        a = true;
    }
    restart.onclick = function() {
        context.clearRect(0, 0, 450, 450);
        drawchessBoard();
        isBlack = true;
        isWin = false;
        chessData = [];
        for (var i=0; i<15; i++) {
            chessData[i] = [];
            for (var j=0; j<15; j++) {
                chessData[i][j] = 0;
            }
        }
    }
}