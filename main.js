prediction_1 = ""
prediction_2 = ""

Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach("#camera");

function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log("ml5 version" , ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/yoiA-x63n/model.json" , modelLoaded);

function modelLoaded()
{
    console.log("Model Loaded");
}

function check()
{
    img = document.getElementById("captured_image");
    classifier.classify(img , gotResult);
}


function gotResult(error , results)
{
    if(error){
        console.error(error);
    } else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name_2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        

        if(results[0].label == "Amazing")
        {
            document.getElementById("update_emoji").innerHTML = "&#128076;";
        }

        if(results[0].label == "Victory")
        {
            document.getElementById("update_emoji").innerHTML = "&#128077;";
        }

        if(results[0].label == "Best")
        {
            document.getElementById("update_emoji").innerHTML = "&#9996;";
        }

        if(results[1].label == "Amazing")
        {
            document.getElementById("update_emoji_2").innerHTML = "&#128076;";
        }

        if(results[1].label == "Victory")
        {
            document.getElementById("update_emoji_2").innerHTML = "&#128077;";
        }

        if(results[1].label == "Best")
        {
            document.getElementById("update_emoji_2").innerHTML = "&#9996;";
        }
        speak();
    }
}


function speak()
{
    var synth = window.speechSynthesis;
    speakdata_1 = "The first prediction is" + prediction_1;
    speakdata_2 = "The first prediction is" + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speakdata_1 + speakdata_2);
    synth.speak(utterThis);
}