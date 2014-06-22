var canvas=document.getElementById('myCanvas');
var ctx=canvas.getContext('2d');
document.body.appendChild(canvas);
var debug;
var lives = 3;
var score = 0;
var fingers = [];
var bugs = [];
var bug = {};
var then = Date.now();
var there = Date.now();
var count = 0;
var bugImage = new Image();
var fingerImage = new Image();
fingerImage.src= "images/cloud.png";

var background = new Image();
background.src = "images/sky.jpg";

var init = function(){
	lives = 3;

	for (var i=0;i<2;i++){

		if (i <1){
			var finger = {
			maxX: left.getMaxX()[0],
			minX: left.getMinX()[0],
			maxY: left.getMinX()[1],
			minY: left.getMaxX()[1]
			};
		}else{
			var finger = {
			maxX: right.getMaxX()[0],
			minX: right.getMinX()[0],
			maxY: right.getMaxX()[1],
			minY: right.getMinX()[1]
			};
		}

		console.log(finger);
		fingers.push(finger);
	};

	initBug();
	main();
};


var main = function(fingers){
	// time controls position updates for bugs and fingers
	var now = Date.now();
	var here = Date.now();
	var delta = now - then;
	var change = here - there;

	score = parseInt(change/1000);

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
		bug = {
			speedX: 120, // movement in pixels per second
			speedY: 20,
			posX: Math.floor(Math.random()*(600-400))+400,
			posY: 0,
			fall: true
		};

		bug.speedX = Math.floor(Math.random()*(256+156)-156);
		// assign appropriate image according to travel direction
		if (bug.speedX > 0){
			bug.path = "images/LadybugRight.png";
		}
		else {
			bug.path ="images/Ladybug.png"
		}
		bugImage.src = bug.path;
		bugs.push(bug);
		}
};

var update = function(time){
	// add a new ladybug every 20 seconds
	count += time;
	if (count >= 20){
		initBug();
	}


	for(var i=0;i<bugs.length;i++){
		// calculate bug position based on whether falling or not
		for(var j=0;j<fingers.length;j++){
			$('.finger4').text("Bug position x,y: " + (bugs[i].posX) +", " + bugs[i].posY);
			//console.log(bugs[i].posX);
			//console.log(fingers[j].maxX);
			// check for bug/hand collision - if true, set fall to false, if false, set fall to true
			if(
				bugs[i].posX <= (fingers[j].maxX)
				&& bugs[i].posX > (fingers[j].minX)
				&& bugs[i].posY >= fingers[j].maxY
				// && fingers[j].maxX <= (bugs[i].posX)
				// && fingers[j].minX >= (bugs[i].posX)

				// && fingers[j].maxX <= (bugs[i].posX + 50)
				// && bugs[i].posY <= (fingers[j].minY + 30)
				// && fingers[j].minY <= (bugs[i].posY + 30)
				){
				//console.log("!!!!!!");
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
					count = 0;
					if (lives == 0){
						//alert("You lost!");

					}
					else {
						initBug();
					}
				}
			}
			else {
				bugs[i].posY = fingers[j].maxY;
				// change ladybug direction every few seconds
                count += time;
                var rand = Math.random()*(15-4)+2;
                //console.log(rand);
                if (count >= rand){
                    bugs[i].speedX = Math.floor(Math.random()*(256+156)-156);
                    bugs[i].speedX *= -1;
                    count = 0;
                    	if (bug.speedX > 0){
                        	bug.path = "images/LadybugRight.png";
                    	}
                    else {
                            bug.path ="images/Ladybug.png"
                    }
                    bugImage.src = bug.path;
                }
				bugs[i].posX = bugs[i].posX-bugs[i].speedX*time;

			}
		}
	};
};

var render = function() {
	// draw background, bugs, fingers and text
	ctx.drawImage(background, 0, 0);

	for(var i=0;i<bugs.length;i++){
		ctx.drawImage(bugImage, bugs[i].posX, bugs[i].posY);
	}

	for(var j=0;j<fingers.length;j++){
		ctx.drawImage(fingerImage, fingers[j].posX, fingers[j].posY);
	}

	// Lives
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "30px";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Lives: " + lives, 32, 32);

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "30px";
	ctx.textAlign = "right";
	ctx.textBaseline = "top";
	ctx.fillText("Score: " + score, 1132, 32);
};

//updating hand positions
var updateFingers = function(){
	for (var i=0;i<fingers.length;i++){

	if (i <1){
		
		fingers[i].maxX = left.getMaxX()[0];
		fingers[i].minX = left.getMinX()[0];
		fingers[i].maxY = left.getMaxX()[1];
		fingers[i].minY = left.getMinX()[1];
	}else{

		fingers[i].maxX = right.getMaxX()[0];
		fingers[i].minX = right.getMinX()[0];
		fingers[i].maxY = right.getMaxX()[1];
		fingers[i].minY = right.getMinX()[1];
	}

	//fingers.push(finger);
};

	// for(var j=0;j<5;j++){
	// 	ctx.fillStyle="hsl(100, 100%, 60%)";
	// 	ctx.fillRect(left.getFinger(j)[0] * 2,600 - left.getFinger(j)[1],100,100);
	// 	//ctx.fillRect(fingers[j].posX,fingers[j].posY,100,100);

	// 	ctx.fillStyle="hsl(100, 100%, 60%)";
	// 	ctx.fillRect(right.getFinger(j)[0] * 2 ,600 - right.getFinger(j)[1],100,100);

	// }




};
