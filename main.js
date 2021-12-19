img="";
status1="";
objects=[];
song="";

function preload(){
    song=loadSound("lost.mp3");
}

function setup(){
canvas=createCanvas(380,380);
canvas.center();
video=createCapture(VIDEO);
video.hide();
video.size(380,380);
objectDetector = ml5.objectDetector('cocossd',modelLoaded);
document.getElementById("status").innerHTML = "Status = Detecting Objects";
}
function modelLoaded(){
    console.log("modelLoaded");
    status1=true;
    objectDetector.detect(video,gotResult);
}
function gotResult(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects=results;
}

function draw(){
    image(video,0,0,380,380);

    if(status1 !=""){
        r=random(255);
        g=random(255);
        b=random(255);
        objectDetector.detect(video,gotResult);
        for(i=0;i<objects.length;i++){
if(objects[i].label=="person"){
    song.stop();
            document.getElementById("status").innerHTML="Status : Object Detected ";
            document.getElementById("number").innerHTML="Baby Found";
            fill(r,g,b);
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+"" + percent + "%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }else{
            document.getElementById("number").innerHTML="Baby Not Found";
            song.play();
            song.setVolume(0.5);
        }}
    }
}
