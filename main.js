var canvas=document.getElementById('myCanvas');
var ctx=canvas.getContext('2d');
document.body.appendChild(canvas);
var debug;
var lives = 3;
var fingers = [];
var bugs = [];
var then = Date.now();
var temp = 0;
var bugImage = new Image();
var fingerImage = new Image();
fingerImage.src= "img/cloud.png";

var background = new Image();
background.src = "img/sky.jpg";

var init = function(){
	lives = 3;	

	// Take finger coordinates
	for (var i=0;i<10;i++){
		var finger = {
		posX: i*120,
		posY: 500	
		};
		fingers.push(finger);
	};

	// call bug and main control functions
	initBug();
	main(fingers);
};

var main = function(fingers){
	// time controls position updates for bugs and fingers
	var now = Date.now();
	var delta = now - then;

	// update positions according to time elapsed and draw on canvas
	update(delta / 1000);
	render();

	// reset time
	then = now;
	requestAnimationFrame(main);
};

var initBug = function(){
	// build one bug with random x position and random speed
	for(var i=0;i<1;i++){
		var bug = {
			speedX: 120, // movement in pixels per second
			speedY: 20,
			posX: Math.floor(Math.random()*(1200)),
			posY: 0,
			fall: true
		};

		bug.speedX = Math.floor(Math.random()*(256+156)-156);
		// assign appropriate image according to travel direction
		if (bug.speedX > 0){
			bug.path = "img/LadybugRight.png";
		}
		else {
			bug.path ="img/Ladybug.png"
		}
		bugImage.src = bug.path;
		bugs.push(bug);
		}
};

var update = function(time){
	// add a new ladybug every 20 seconds

	console.log(time);
	// count = time;
	// count -= temp;
	// if (count*10 > 1){
	// 	temp = time;
	// 	initBug();
	// }


	for(var i=0;i<bugs.length;i++){
		// calculate bug position based on whether falling or not
		for(var j=0;j<fingers.length;j++){
			// check for bug/hand collision - if true, set fall to false, if false, set fall to true
			if(
				bugs[i].posX <= (fingers[j].posX + 50)
				&& fingers[j].posX <= (bugs[i].posX + 50)
				&& bugs[i].posY <= (fingers[j].posY + 30)
				&& fingers[j].posY <= (bugs[i].posY + 30)
				){
				bugs[i].fall = false;
			}
			else {
				bugs[i].fall = true;
			}

			// check if bugs fall between cracks
			if(bugs[i].fall){
				bugs[i].posY = bugs[i].posY + bugs[i].speedY*time;

				if(bugs[i].posY >= 600){
					bugs[i].fall = false;
					bugs.splice(i, 1);
					lives -= 1;
					if (lives >= 1){
						initBug();
					}
					else{
						alert("You lost :(");
					}
				}
			}
			else {
				bugs[i].posY = fingers[j].posY -30;
				bugs[i].posX = bugs[i].posX+bugs[i].speedX*time;
			}
		}
	};
};

var render = function() {
	ctx.drawImage(background, 0, 0);

	for(var i=0;i<bugs.length;i++){
		ctx.drawImage(bugImage, bugs[i].posX, bugs[i].posY);
	}

	for(var j=0;j<fingers.length;j++){
		ctx.drawImage(fingerImage, fingers[j].posX, fingers[j].posY);
		// ctx.fillStyle="hsl(100, 100%, 60%)";
		// ctx.fillRect(fingers[j].posX,fingers[j].posY,60,60);
	}

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Lives: " + lives, 32, 32);
};

init();