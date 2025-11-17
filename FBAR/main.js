const lowVolumes = ["/FBAR/interrogation","/FBAR/computer"];

  const songs = [
    "indream",
    "prayer",
    "chains"
  ]

function whenLoaded(){
    var links = document.querySelectorAll('a');

    links.forEach(element => {
        element.addEventListener("click",leaving)
    });

    var audio = document.getElementById("musicPlayer");
    var theMusic = getCookie("musicName");
    if (theMusic == "null"){
      theMusic = getRandomSong();
      document.cookie = "musicName="+theMusic;
    }

    audio.addEventListener("ended",onMusicEnded);
    if (songs.includes(theMusic)){
      audio.src = "assets/music/"+theMusic+".mp3";
    } else {
      audio.src = "assets/music/indream.mp3";
    }
    audio.load();
    var name = document.location.pathname;
    audio.volume = 0.08;
    if (lowVolumes.includes(name)){
      audio.volume = 0.04;
    }
    audio.play();

    var newTime = getCookie("musictime");
    if (newTime != "null"){
      audio.currentTime = parseInt(newTime);
    }
    getRandomSong();
}

function enableSuperSpeed(){
  var audio = document.getElementById("musicPlayer");
  audio.playbackRate=10.0;
}

function onMusicEnded(){
    var theMusic = getRandomSong();
    document.cookie = "musicName="+theMusic;
    var audio = document.getElementById("musicPlayer");
    audio.src = "assets/music/"+theMusic+".mp3";
    audio.load();
    audio.volume = 0.08;
    audio.play();
}

function leaving(){
    var audio = document.getElementById("musicPlayer");
    document.cookie = "musictime="+(audio.currentTime+0.25).toString();
}

function getRandomSong(){
  var random_ind = Math.round(Math.random()*(songs.length-1));
  return songs[random_ind];
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
  return "null";
}
