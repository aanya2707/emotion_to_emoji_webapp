prediction1 = "";
prediction2 = "";

Webcam.set({
    width : 350,
    height : 300,
    image_format : "png",
    png_quality : 100
});

camera = document.getElementById("camera");

Webcam.attach("#camera");

function takeImage(){
    Webcam.snap(function(data_uri)
    {
        document.getElementById("result").innerHTML='<img id="image" src="'+data_uri+'"/>'
    });
}

console.log("ml5 version", ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/w-EXcf2AD/model.json",modelLoaded);

function modelLoaded(){
    console.log("Model Loaded");
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data = "The first prediction is " + prediction1;
    speak_data2 = "And the second prediction is " + prediction2;
    var utterThis = new SpeechSynthesisUtterance(speak_data+speak_data2);
    utterThis.rate=1;
    synth.speak(utterThis);
}

function Check()
{
    img = document.getElementById("image");
    classifier.classify(img,gotResult);
}

function gotResult(error,results)
{
    if(error)
    {
        console.error(error);
    }
    else
    {
        console.log(results);
        document.getElementById("emotion_name1").innerHTML=results[0].label;
        document.getElementById("emotion_name2").innerHTML=results[1].label;
        prediction1=results[0].label;
        prediction2=results[1].label;
        speak();

        if(results[0].label == "HAPPY")
        {
            document.getElementById("emoji1").innerHTML= "&#128522;";
        }
        if(results[0].label == "SAD")
        {
            document.getElementById("emoji1").innerHTML = "&#128532;";
        }
        if(results[0].label == "ANGRY")
        {
            document.getElementById("emoji1").innerHTML = "&#128545;";
        }

        if(results[1].label == "HAPPY")
        {
            document.getElementById("emoji2").innerHTML= "&#128522;";
        }
        if(results[1].label == "SAD")
        {
            document.getElementById("emoji2").innerHTML = "&#128532;";
        }
        if(results[1].label == "ANGRY")
        {
            document.getElementById("emoji2").innerHTML = "&#128545;";
        }
    }
}