Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:90
});
camera=document.getElementById("camera");
Webcam.attach("#camera"); 

function takeSnapshot(){
    Webcam.snap(function(data){
        document.getElementById("result").innerHTML='<img id="pic1" src="'+data+'"/>';
    });
}
console.log("ml5 version",ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/dw_3WML9J/model.json",modelLoaded);

function modelLoaded(){
    console.log("model is loaded");
}

function speak(){
    var synth=window.speechSynthesis;
    data1="The first prediction is "+prediction1;
    data2="The second prediction is "+prediction2;
     var utterThis=new SpeechSynthesisUtterance(data1+data2);
     synth.speak(utterThis);
}

function check(){
    img=document.getElementById("pic1");
    classifier.classify(img,gotresults);
}

function gotresults(error,results){
if (error){
    console.error(error);
}
else {
    console.log(results);
    document.getElementById("result_emotion_name").innerHTML=results[0].label;
    document.getElementById("result_emotion_name2").innerHTML=results[1].label;
    prediction1=results[0].label;
    prediction2=results[1].label;
    speak();
    if (results[0].label=="Happy"){
        document.getElementById("update_emoji").innerHTML="&#128515;"
    }
    if (results[0].label=="Sad"){
        document.getElementById("update_emoji").innerHTML="&#128532;"
    }
    if (results[0].label=="Angry"){
        document.getElementById("update_emoji").innerHTML="&#128545;"
    }
    if (results[1].label=="Happy"){
        document.getElementById("update_emoji2").innerHTML="&#128515;"
    }
    if (results[1].label=="Sad"){
        document.getElementById("update_emoji2").innerHTML="&#128532;"
    }
    if (results[1].label=="Angry"){
        document.getElementById("update_emoji2").innerHTML="&#128545;"
    }
}
}