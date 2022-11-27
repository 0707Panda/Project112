Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:90
});
camera=document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version:', ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/XcvYXCZCF/model.json', modelLoaded);

function modelLoaded(){
    console.log('Model Loaded!');
}

function check(){
    img=document.getElementById("captured_image")
    classifier.classify(img, gotResult)
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        prediction_1=results[0].label;
        speak();
        if(results[0].label==superb){
            document.getElementById("update_emotion").innerHTML="&#128076;";
        }
        if(results[0].label==goodjob){
            document.getElementById("update_emotion").innerHTML="&#128077;";
        }
        if(results[0].label==peace){
            document.getElementById("update_emotion").innerHTML="&#9996;";
        }
        if(results[0].label==clap){
            document.getElementById("update_emotion").innerHTML="&#128079;";
        }
        if(results[0].label==love){
            document.getElementById("update_emotion").innerHTML="&#10084;";
        }
    }
}

function speak(){
    var synth=window.speechSynthesis;
    speak1="The first prediction is" + prediction_1;
    var utterThis=new SpeechSynthesisUtterance(speak1);
    synth.speak(utterThis);
}