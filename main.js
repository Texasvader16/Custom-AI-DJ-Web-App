song1 = "";
song2 = "";
song3 = "";
song4 = "";
song5 = "";
counter = 0;

function preload()
{
	song1 = loadSound("Acapulco.mp3");
	song2 = loadSound("Harry-Potter-Remix.mp3");
	song3 = loadSound("Ghost.mp3");
	song4 = loadSound("Light-Switch.mp3")
	song5 = loadSound("Stay.mp3")
}

scoreRightWrist = 0;
scoreLeftWrist = 0;

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

function setup() {
	canvas =  createCanvas(600, 500);
	canvas.center();

	video = createCapture(VIDEO);
	video.hide();

	poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);
}

function modelLoaded() {
  console.log('PoseNet Is Initialized');
}

function gotPoses(results)
{
  if(results.length > 0)
  {
	console.log(results);
	scoreRightWrist = results[0].pose.keypoints[10].score;
	scoreLeftWrist =  results[0].pose.keypoints[9].score;
	console.log("scoreRightWrist = " + scoreRightWrist + "scoreLeftWrist" + scoreLeftWrist);

	
	rightWristX = results[0].pose.rightWrist.x;
	rightWristY = results[0].pose.rightWrist.y;
	console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);

	leftWristX = results[0].pose.leftWrist.x;
	leftWristY = results[0].pose.leftWrist.y;
	console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);
		
  }
}

function draw() {
	image(video, 0, 0, 600, 500);

	fill("#FF0000");
	stroke("#FF0000");

if(scoreRightWrist > 0.2)
{

	circle(rightWristX , rightWristY , 20)

	if(rightWristY >0 && rightWristY <= 100)
	{
		document.getElementById("speed").innerHTML = "Speed = 0.5x"
		song.rate(0.5)
	}
	else if(rightWristY >100 && rightWristY <= 200)
	{
		document.getElementById("speed").innerHTML = "Speed = 1"
		song.rate(1)
	}
	else if(rightWristY >200 && rightWristY <= 300)
	{
		document.getElementById("speed").innerHTML = "Speed = 1.5"
		song.rate(1.5)
	}
	else if(rightWristY >300 && rightWristY <= 400)
	{
		document.getElementById("speed").innerHTML = "Speed = 2"
		song.rate(2)
	}
	else if(rightWristY >400 && rightWristY <= 500)
	{
		document.getElementById("speed").innerHTML = "Speed = 2.5"
		song.rate(2.5)
	}

}
	if(scoreLeftWrist > 0.2)
	{
		circle(leftWristX,leftWristY,20);
		InNumberleftWristY = Number(leftWristY); 
		remove_decimals = floor(InNumberleftWristY);
		volume = remove_decimals/500;
		document.getElementById("volume").innerHTML = "Volume = " + volume;		
		song.setVolume(volume);	
	}

}

function play()
{
	counter = counter + 1
	if(counter == 1)
	{
	song5.stop()
		song1.play()
	console.log("Playing 1")
	}
	else if (counter == 2)
	{	
		song1.stop()
		song2.play()
		console.log('Playing 2')
	}
	else if (counter == 3)
	{	
		song2.stop()
		song3.play()
		console.log('Playing 3')
	}
	else if (counter == 4)
	{
		song3.stop()
		song4.play()
		console.log("Playing 4")
	}
	else if (counter == 5)
	{
		song4.stop()
		song5.play()
		console.log("Playing 5")
		counter = 0;
	}
}