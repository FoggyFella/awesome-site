//Used for movement
const opposites = {
    "right":"left",
    "left":"right",
    "up":"down",
    "down":"up"
};

//Used for movement
const translations = {
    "↓":"down",
    "↑":"up",
    "←":"left",
    "→":"right"
}

//Used for seed generation
const values = {
    "right":"2",
    "left":"4",
    "up":"1",
    "down":"3"
}

//This should be names of background pngs which will get picked randomly based on the seed
const backgroundVariations = [
    "var1",
    "var2",
    "var3",
    "var4",
    "var5"
]


const correct_path = "11123211432212234"

async function processMovement(){
    const myParams = Array.from(new URLSearchParams(window.location.search).keys());
    var theSeed = generateSeed(myParams);
    var myrng = new Math.seedrandom(parseInt(theSeed));

    console.log("The current seed is: " + theSeed);
    
    const diskactive = localStorage.getItem("diskactive");
    if (diskactive!="true"){
        const gameimg = document.getElementById("gameimg");
        gameimg.setAttribute("src","assets/gamescreens/notfound.png")
        return;
    }

    const results = await checkPath(theSeed);
    const finished = results[0];
    const imgpath = results[1];

    if (finished == true){
        const gameimg = document.getElementById("gameimg");
        gameimg.setAttribute("src","assets/gamescreens/"+imgpath+".png")
        return;
    }

    const upb = document.getElementById("upbutton");
    const leftb = document.getElementById("leftbutton");
    const rightb = document.getElementById("rightbutton");
    const downb = document.getElementById("downbutton");

    upb.addEventListener("click",move,false);
    upb.params = myParams;

    downb.addEventListener("click",move,false);
    downb.params = myParams;

    leftb.addEventListener("click",move,false);
    leftb.params = myParams;

    rightb.addEventListener("click",move,false);
    rightb.params = myParams;

    setDebugText(myParams, getRandomBackground(myrng));
}

async function checkPath(theseed){
    let thejson

    await fetch("https://mypythonworker.hrimar321.workers.dev", {
        method: "POST",
        body: JSON.stringify({
          thething: "checkpath",
          attempt: String(theseed)
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }).then((response) => response.json())
      .then((json) => thejson=json);

      console.log(thejson[0],thejson[1])
      return thejson;
}

function generateSeed(params){
    //This makes a seed based on the current path you have taken
    var newSeed = "";

    if (params.length == 0){
        newSeed = "1";
        return newSeed;
    }

    for (const key of params){
        newSeed += values[key]
    }
    return newSeed;
}

function getRandomBackground(therng){
    //Uses the seed to get a random picture for the background

    let randomnum = Math.abs(therng() * backgroundVariations.length-1);
    let randomIndex = Math.round(randomnum);
    let randomBackground = backgroundVariations[randomIndex]

    const gameimg = document.getElementById("gameimg");
    gameimg.setAttribute("src","assets/gamescreens/"+randomBackground+".png")

    return randomBackground;
}

function setDebugText(params, variation){
    //This is just for debug and it displays the path you have taken with text at the bottom

    const debuglabel = document.getElementById("debug");
    debuglabel.innerText = "";
    debuglabel.remove();
    return

    if (params.length == 0){
        debuglabel.innerText = "Current path: none";
        debuglabel.innerText += "\n"+variation.toString();
        return;
    }

    var new_text = "";
    var ind = 0;
    for (const key of params){
        new_text += key+"|";
        ind++;
    }

    debuglabel.innerText = new_text;
    debuglabel.innerText += "\n"+variation.toString();
}

function move(evt){
    //Gets called when you press a movement key
    const beep = document.getElementById("beep")
    const buttonlabel = translations[evt.currentTarget.innerText];
    const params = evt.currentTarget.params;
    const lastinput = params.at(params.length-1);

    var new_text = "?";
    beep.play();

    if (params.length >= 1){;
        if (opposites[lastinput] == buttonlabel){
            params.pop();

            for (const key of params){
                new_text += key+"&";
            }
            
        }
        else {
            for (const key of params){
                new_text += key+"&";
            }
            new_text += buttonlabel;
        }

    } else {
        for (const key of params){
            new_text += key+"&";
        }
        new_text += buttonlabel;
    }

    window.location.href = new_text;
}