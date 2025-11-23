const dictionary = {
    "a":"⛛",
    "b":"⚆",
    "c":"⚇",
    "d":"⚯",
    "e":"⚭",
    "f":"♲",
    "g":"♫",
    "h":"⛟",
    "i":"☺",
    "j":"⛯",
    "k":"☣",
    "l":"𝇧",
    "m":"♾",
    "n":"⚄",
    "o":"◔",
    "p":"♜",
    "q":"⚔",
    "r":"☢",
    "s":"✯",
    "t":"⛩",
    "u":"⛬",
    "v":"⛢",
    "w":"⛇",
    "x":"ჯ",
    "y":"❦",
    "z":"⛱",
    "!":"❕",
    ",":"⛏",
    ".":"⚬",
    "/":"⛆",
    ":":"⛓",
    "A":"☿",
    "B":"⚿",
    "C":"⛝",
    "D":"╫",
    "E":"ᢅ",
    "F":"෴",
    "G":"♣",
    "H":"〲",
    "I":"𝒻",
    "J":"𝔊",
    "K":"깆",
    "L":"꒦",
    "M":"〠",
    "N":"〄",
    "O":"〇",
    "P":"𐌸",
    "Q":"ª",
    "R":"©",
    "S":"؃",
    "T":"ܓ",
    "U":"₳",
    "V":"𐐞",
    "W":"𝅙",
    "X":"╳",
    "Y":"𝍖",
    "Z":"𝄸",
    " ":"☲"
}

let current_focus

function whenLoaded(){
    const dropbtns = document.querySelectorAll(".dropbtn");
    const colorbtns = document.querySelectorAll(".colormenu button");

    dropbtns.forEach(btn => {
        btn.addEventListener("click",onMouseClicked,false)
    });

    colorbtns.forEach(btn => {
        btn.addEventListener("click",onColorPressed,false)
    });
}

function onMouseClicked(evt){
    showMenu(true);
    if (evt.currentTarget == current_focus){
        current_focus.style.transform = "";
        current_focus = null;
        showMenu(false);
        return;
    }
    
    if (current_focus){
        current_focus.style.transform = "";
    }
    current_focus = evt.currentTarget;
    current_focus.style.transform = "scale(1.15)";
}

function showMenu(visible){
    const colormenu = document.querySelectorAll(".colormenu")
    colormenu.forEach(menu => {
        if (visible){
            menu.style.display = "block";
        } else {
            menu.style.display = "none";
        }
    });
}

function onColorPressed(evt){
    if (current_focus != null){
        showMenu(false);
        current_focus.innerText = evt.currentTarget.innerText;
        current_focus.style.transform = "";
    }
}

async function translateTheStuff(){
    let text = document.getElementById("translatearea").value;
    const key = document.getElementById("inputarea").value;
    let seq = "";

    const dropbtns = document.querySelectorAll(".dropbtn");
    dropbtns.forEach(btn => {
        seq += btn.innerText;
    });

    text += "\n/"+key;

    console.log(text);
    console.log(seq);

    showLoading(true);
    const results = document.getElementById("resultarea");
    results.value = await translate_lang_into_text(text,key,seq);
    showLoading(false);

    showResult(true);
}

function playBeep(){
    const beep = document.getElementById("beep")
    beep.play();
}

function showLoading(yeah){
    const results = document.getElementById("resultspage");
    const main = document.getElementById("mainpage");
    const loading = document.querySelector(".loadinggif");

    if (yeah){
        results.style.display = "none";
        main.style.display = "none";
        loading.style.opacity = 1;
    } else {
        loading.style.opacity = 0;
    }
}

function showResult(yeah){
    const results = document.getElementById("resultspage");
    const main = document.getElementById("mainpage");
    playBeep();

    if (yeah){
        main.style.display = "none";
        results.style.display = "inline-block";
    } else {
        main.style.display = "inline-block";
        results.style.display = "none";
    }
}

function unshuffle(array, seed) {
  var myrng = new Math.seedrandom(seed);
  let currentIndex = array.length;
  let swaps = [];

  while (currentIndex !== 0) {
    let randomIndex = Math.floor(myrng() * currentIndex);
    currentIndex--;
    swaps.push([currentIndex, randomIndex]);
  }

  for (let i = swaps.length - 1; i >= 0; i--) {
    let [a, b] = swaps[i];
    [array[a], array[b]] = [array[b], array[a]];
  }
}

async function translate_lang_into_text(text,key,seq){
    let split_text = text.split("/")

    let the_needed_text = ""

    if (split_text.length != 1){
        the_needed_text = split_text[0].substring(0,split_text[0].length-1)
    }
    else{
        the_needed_text = split_text[0]
    }

    let translated_text = ""

     let chars = Array.from(the_needed_text)

     for (let char of chars){
         if (char != "‎"){
           if (Object.values(dictionary).includes(char)){
                translated_text += getKeyByValue(dictionary,char);
              }
             else {
                 translated_text += char;
              }
         }
    }
    
    if (split_text.length != 1){
        let match = await doItMatch(key,seq);
        var the_secret = split_text[1].trim().toLowerCase()
        if (!match){
            the_secret = String(Math.random()*100.0)
        }
        let unshuffled_string = Array.from(translated_text);
        unshuffle(unshuffled_string,the_secret)
        let result = unshuffled_string.join("").toString();
        return result;
    }
    else{
        return translated_text;
    }
}

async function doItMatch(key,seq){
    let thejson

    await fetch("https://mypythonworker.hrimar321.workers.dev", {
        method: "POST",
        body: JSON.stringify({
          thething: "checkmatch",
          attemptkey: key,
          attemptsequence: seq
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }).then((response) => response.json())
      .then((json) => thejson=json);

    console.log(thejson)

    return thejson;
}

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}