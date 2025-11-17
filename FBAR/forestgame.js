const opposites = {
    "right":"left",
    "left":"right",
    "up":"down",
    "down":"up"
};

const translations = {
    "↓":"down",
    "↑":"up",
    "←":"left",
    "→":"right"
}

function processMovement(){
    const myParams = Array.from(new URLSearchParams(window.location.search).keys());

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

    setDebugText(myParams);
}

function setDebugText(params){
    const debuglabel = document.getElementById("debug");
    debuglabel.innerText = "";

    if (params.length == 0){
        debuglabel.innerText = "Current path: none";
        return;
    }

    var new_text = "";
    var ind = 0;
    for (const key of params){
        new_text += key+",";
        ind++;
    }

    debuglabel.innerText = new_text;
}

function move(evt){
    const buttonlabel = translations[evt.currentTarget.innerText];
    const params = evt.currentTarget.params;
    const lastinput = params.at(params.length-1);

    var new_text = "?";

    if (params.length >= 1){
        console.log("fick");
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