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
    const debuglabel = document.getElementById("debug");
    //console.log(window.location.search);
    const myParams = Array.from(new URLSearchParams(window.location.search).keys());
    debuglabel.innerText = "";

    if (myParams.length == 0){
        debuglabel.innerText = "Current path: none";
        return;
    }

    var new_text = "?";
    var ind = 0;
    for (const key of myParams){
        new_text += key+"&";
        ind++;
    }

    debuglabel.innerText = new_text;

    const upb = document.getElementById("upbutton");
    const leftb = document.getElementById("leftbutton");
    const rightb = document.getElementById("rightbutton");
    const downb = document.getElementById("downbutton");

    const lastinput = myParams.at(myParams.length-1);

    upb.addEventListener("click",test);

    //upb.setAttribute("href",new_text+"up");;
    //leftb.setAttribute("href",new_text+"left");
    //rightb.setAttribute("href",new_text+"right");
    //downb.setAttribute("href",new_text+"down");
    //changeButtonPath(myParams,downb,lastinput);
}

function test(){
    console.log("fuck");
}

function changeButtonPath(params,button,lastinput){
    const buttonlabel = translations[button.innerText];
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

    button.setAttribute("href",new_text);
}