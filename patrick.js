var video

function attachstuff(){
    video = document.getElementById("thevideo");
    video.addEventListener('play',fadeOut);
}

function fadeOut(){
    video.classList.add('fadeOut');;
    const heading = document.getElementById("fadeinHeading");
    heading.style.opacity = 1
}