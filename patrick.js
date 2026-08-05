var video

function attachstuff(){
    video = document.getElementById("thevideo");
    if (localStorage.getItem("patrickgone") == "true"){
        video.style.display = "none";
        fadeOut();
    }
    video.addEventListener('play',fadeOut);
}

function fadeOut(){
    video.classList.add('fadeOut');;
    const heading = document.getElementById("fadeinHeading");
    heading.style.opacity = 1;
    localStorage.setItem("patrickgone","true");
}