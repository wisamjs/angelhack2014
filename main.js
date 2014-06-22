var canvas=document.getElementById('myCanvas');
var ctx=canvas.getContext('2d');
document.body.appendChild(canvas);
var debug;
var lives = 3;
var fall = true;
var fingers = [];
var bugs = [];
var then = Date.now();
// var bugImage = new Image();
// var fingerImage = new Image();


var background = new Image();
background.src = "img/sky.jpg";
// background.onload = function () {[]
// 	ctx.drawImage(background,0,0);
// };

var init = function(){

	lives = 3;
	
	// bugImage.src = "img/75860_14041_128_tools_report_bug_icon.png";
	// fingerImage.src= "img/75860_14041_128_tools_report_bug_icon.png";

	for (var i=0;i<10;i++){
		var finger = {
		posX: i*120,
		posY: 500	
		};
		fingers.push(finger);
	};


	main(fingers);
};

var main = function(fingers){
	var now = Date.now();
	var delta = now - then;

	initBug();
	update(delta / 1000);
	render();

	then = now;

	requestAnimationFrame(main);
};



var initBug = function(){
	for(var i=0;i<3;i++){
		var bug = {
			speedX: 120, // movement in pixels per second
			speedY: 120,
			posX: Math.floor(Math.random()*(100)),
			posY: Math.floor(Math.random()*(600))
		};

		console.log(bug.posX, bug.posY);
		bug.speedX = Math.floor(Math.random()*(256+256)-256);
		bugs.push(bug);
		}
};

var update = function(time){

	for(var i=0;i<bugs.length;i++){
		bugs[i].posX = bugs[i].posX+bugs[i].speedX*time;

		while(fall){
			
			for(var j=0;j<fingers.length;j++){
				if(bugs[i].posX <= (fingers[j].posX + 20) || bugs[i].posX >= (fingers[j].posX - 20)){
					bugs[i].posY = fingers[j].posY;
					fall = false;
				}
				else {
					bugs[i].posY = bugs[i].posY + bugs[i].speedY*time;
				}
			}
			console.log(bugs[i].posY);
			if (bugs[i].posY <= 0){
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
	render(bugs, fingers);
};

var render = function() {
	ctx.drawImage(background, 0, 0);

	// ctx.drawImage(bugImage, bug.posX, bug.posY);

	for(var i=0;i<bugs.length;i++){
		ctx.fillStyle="rgb(100,100,100)";
		ctx.fillRect(bugs[i].posX,bugs[i].posY,50,50);
	}

	for(var j=0;j<fingers.length;j++){
		// ctx.drawImage(fingerImage, fingers[j].posX, fingers[j].posY);
		ctx.fillStyle="hsl(100, 100%, 60%)";
		ctx.fillRect(fingers[j].posX,fingers[j].posY,100,100);
	}

	// Score
	// ctx.fillStyle = "rgb(250, 250, 250)";
	// ctx.font = "24px Helvetica";
	// ctx.textAlign = "left";
	// ctx.textBaseline = "top";
	// ctx.fillText("Lives: " + lives, 32, 32);
};


init();

