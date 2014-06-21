var canvas=document.getElementById('myCanvas');
var ctx=canvas.getContext('2d');
document.body.appendChild(canvas);

var bg = false;
var background = new Image();
background.src = "img/sky.jpg";
background.onload = function () {
	ctx.drawImage(background,0,0);
};

var bug = {
	speed: 256, // movement in pixels per second
	x: 0,
	y: 0
};


for (var i=0;i<10;i++){
	var monster = {
	posX: Math.floor(Math.random()*(1200)),
	posY: Math.floor(Math.random()*(600))	
	}
};

var monstersCaught = 0;


// function bug()
// ctx.fillStyle="hsl(200, 100%, 60%)";
// ctx.fillRect(posX, posY,50,50);