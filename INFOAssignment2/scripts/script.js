var lineHeight = 100;
var lineWidth = 10;
var ballRadius = 15;
var playerSpeed = 0;
var PlayerStartTop = 200;
var CPUSpeed = 10;
var CPUStartTop = 200;
var YPositionOfBall = 250;
var XPositionOfBall = 450;
var YSpeedOfBall = 0;
var XSpeedOfBall = 0;
var PlayerScore = 0;
var CPUScore = 0;
var timer;
var btn = document.getElementById("start-btn");
//start button
function start() {
    if(btn.innerHTML.trim() === 'Start') {
        timer = setInterval(function() {
            game();
        }, 15);
        btn.innerHTML = 'Stop';
    } else {
        clearInterval(timer);
        btn.innerHTML = 'Start';
    }
    gameBeginning()
};
//game reset
function gameBeginning() {
    if(PlayerScore >= 20) {
        clearInterval(timer);
        btn.innerHTML = 'Game over Player wins!';
    } else if(CPUScore >= 20) {
        clearInterval(timer);
        btn.innerHTML = 'Game over CPU wins!';
    }
    YPositionOfBall = 250;
    XPositionOfBall = 450;
    if(Math.random() < 0.5) {
        var side = 1
    } else {
        var side = -1
    }
    YSpeedOfBall = Math.random() * 2 + 3;
    XSpeedOfBall = side * (Math.random() * 2 + 3);
}

//player control
document.addEventListener('keydown', function(e) {
    if(e.keyCode == 38 || e.which == 38) { // up arrow
        playerSpeed = -10;
        if(PlayerStartTop <= 0) PlayerStartTop = 0;
    }
    if(e.keyCode == 40 || e.which == 40) { // down arrow
        if(PlayerStartTop >= 400) PlayerStartTop = 400;
        playerSpeed = 10;
    }
}, false);
document.addEventListener('keyup', function(e) {
    if(e.keyCode == 38 || e.which == 38) {
        playerSpeed = 0;
    }
    if(e.keyCode == 40 || e.which == 40) {
        playerSpeed = 0;
    }
}, false);



function game() {
    PlayerStartTop += playerSpeed;
    YPositionOfBall += YSpeedOfBall;
    XPositionOfBall += XSpeedOfBall;
    //ball collision with wall
    if(YPositionOfBall <= 0 || YPositionOfBall >= 500 - ballRadius) {
        YSpeedOfBall = -YSpeedOfBall
    }
    //scoring system
    if(XPositionOfBall <= lineWidth) {
        if(YPositionOfBall > PlayerStartTop && YPositionOfBall < PlayerStartTop + lineHeight) {
            XSpeedOfBall = -XSpeedOfBall;
        } else {
            CPUScore++;
            gameBeginning();
        }
    }
    if(XPositionOfBall >= 900 - ballRadius - lineWidth) {
        if(YPositionOfBall > CPUStartTop && YPositionOfBall < CPUStartTop + lineHeight) {
            XSpeedOfBall = -XSpeedOfBall
        } else {
            PlayerScore++
            gameBeginning();
        }
    }
    // cpu moving up and down
    if(CPUStartTop > YPositionOfBall - (lineHeight / 2)) {
        if(YSpeedOfBall > 0) CPUStartTop -= CPUSpeed / 1.5;
        else CPUStartTop -= CPUSpeed / 4;
    }

    if(CPUStartTop < YPositionOfBall - (lineHeight / 2)) {
        if(YSpeedOfBall > 0) CPUStartTop += CPUSpeed / 1.5;
        else CPUStartTop += CPUSpeed / 4;

    }
    // cpu wall collision
    if(CPUStartTop >= 500 - lineHeight) CPUStartTop = 500 - lineHeight;
    else if(CPUStartTop <= 0) CPUStartTop = 0;
    //convert to DOM
    document.getElementById('player').style.top = (PlayerStartTop) + "px";
    document.getElementById('CPU').style.top = (CPUStartTop) + "px";
    document.getElementById("ball").style.top = (YPositionOfBall) + "px";
    document.getElementById("ball").style.left = (XPositionOfBall) + "px";
    document.getElementById('PlayerScore').innerHTML = PlayerScore.toString();
    document.getElementById('CPUScore').innerHTML = CPUScore.toString();
};