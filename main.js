var canvas=document.getElementById('myCanvas');
var ctx=canvas.getContext('2d');
document.body.appendChild(canvas);

// var background = new Image();
// background.src = "img/sky.jpg";
// background.onload = function () {
// 	ctx.drawImage(background,0,0);
// };

var init = function(){
	var lives = 3;
	var fall = true;
	var fingers = [];

	for (var i=0;i<10;i++){
		var finger = {
		posX: Math.floor(Math.random()*1200),
		posY: Math.floor(Math.random()*600)	
		}
		fingers.push(finger);
	};
	initBug(fall, lives, fingers);
};

var initBug = function(fall, lives, fingers){
	var bug = {
		speedX: 120, // movement in pixels per second
		speedY: 120,
		posX: 600,
		posY: 600
	};

	bug.speedX = Math.floor(Math.random()*(256+256)-256);
	update(bug, fall, lives, fingers);
};

var update = function(bug, fall, lives, fingers){
	bug.posX += bug.posX*bug.speedX;

	while (fall){
		for(var i=0;i<fingers.length;i++){
			if(bug.posX >= fingers[i].posX + 20 || bug.posX <= fingers[i].posX -20){
				bug.posY = fingers[i].posY;
				fall = false;
			}
			else {
				bug.posY -= bug.speedY;
			}
		}
		console.log(bug.posY);
		if (bug.posY <= 0){
			lives -= 1;
			initBug();
		}

		console.log(lives);
		if (lives <= 0){
			alert("You are a loser");
			init();
		}
	};
};

var render = function () {
	ctx.drawImage(background, 0, 0);

	ctx.drawImage(heroImage, hero.x, hero.y);

	ctx.drawImage(monsterImage, monster.x, monster.y);

	// Score
	// ctx.fillStyle = "rgb(250, 250, 250)";
	// ctx.font = "24px Helvetica";
	// ctx.textAlign = "left";
	// ctx.textBaseline = "top";
	// ctx.fillText("Monsterrs caught: " + monstersCaught, 32, 32);
};

init();