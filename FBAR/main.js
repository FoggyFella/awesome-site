function whenLoaded(){
    var links = document.querySelectorAll('a');

    links.forEach(element => {
        element.addEventListener("click",leaving)
    });

    var audio = document.querySelector("audio");
    audio.currentTime = parseInt(getCookie("musictime"));
    audio.volume = 0.2;
}

function leaving(){
    var audio = document.querySelector("audio");
    document.cookie = "musictime="+(audio.currentTime+0.25).toString();
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}