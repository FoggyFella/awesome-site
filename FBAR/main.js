function whenLoaded(){
    var links = document.querySelectorAll('a');

    links.forEach(element => {
        element.addEventListener("click",leaving)
    });
}

function leaving(){
    var audio = document.querySelector("audio");
    document.cookie = "musictime="+audio.currentTime.toString();
}