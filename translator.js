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

const secretwords = [
    "eggshell",
    "plum",
    "smog",
    "radiate",
    "dictionary",
    "green",
    "reload",
    "fortnite",
    "undermine",
    "construct",
    "clear",
    "enemy",
    "new",
    "pickle",
    "tumult",
    "trial",
    "cheesyburger"
]

const cipherwords = {
    "triffid":"🟩🟩🟩",
    "pigpen":"⬛⬜🟪",
    "beaufort":"🟫🟫🟨",
    "wadsworth":"⬛⬜⬛",
    "caesar":"🟩🟥🟩",
    "autokey":"🟦🟨🟦",
    "book":"🟫⬜🟫",
    "alphabet":"🟥🟦🟨"
}

function get_random_secret(){
    return secretwords[Math.floor(Math.random() * (secretwords.length-1))]
}

function get_random_secret_encoded(){
    return Object.keys(cipherwords)[Math.floor(Math.random() * (Object.keys(cipherwords).length))]
}

function shuffle(array,seed) {
  console.log("TEST STUFF");
  var myrng = new Math.seedrandom(seed);

  let currentIndex = array.length;
    console.log(currentIndex);

  while (currentIndex != 0) {

    let randomIndex = Math.floor(myrng() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  console.log(array);
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

function initiate_translation(){
    console.log(get_random_secret_encoded())
    const textElement = document.getElementById("texttolang")
    let text = textElement.value

    if (checkIfKeyExist(dictionary,text[0])){
        translate_text_into_lang();
    }
    else{
        translate_lang_into_text();
    }
}

function translate_text_into_lang(){
    const textElement = document.getElementById("texttolang")
    var text = textElement.value
    var the_secret = get_random_secret_encoded()
    var secret_as_emojis = cipherwords[the_secret]

    console.log(text)

    let shuffled_text = Array.from(text);
    shuffle(shuffled_text,the_secret)
    let translated_text = ""

    let chars = Array.from(shuffled_text)

    textElement.value = ""

    for (let char of chars){
        console.log(char)
        if (checkIfKeyExist(dictionary,char)){
            translated_text += dictionary[char];
            console.log(dictionary[char]);
        }
        else {
            translated_text += char;
            console.log("idk bruv");
        }
        translated_text += "‎" 
    }
    console.log(translated_text.length);

    translated_text += "\n/"+secret_as_emojis
    textElement.value = translated_text;
    console.log(shuffled_text)
    unshuffle(shuffled_text,the_secret)
    console.log(shuffled_text)
}

function translate_lang_into_text(){
    const textElement = document.getElementById("texttolang")
    var text = textElement.value

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
         console.log(char)
         if (char != "‎"){
           if (Object.values(dictionary).includes(char)){
             console.log("holy moly")
            translated_text += getKeyByValue(dictionary,char);
              }
             else {
                 translated_text += char;
                 console.log("idk bruv")
              }
         }
    }
    
    if (split_text.length != 1){
        var the_secret = split_text[1].trim().toLowerCase()
        console.log("the secret is:")
        console.log(the_secret)
        console.log(translated_text.length)
        console.log(translated_text);
        let unshuffled_string = Array.from(translated_text);
        unshuffle(unshuffled_string,the_secret)
        textElement.value = unshuffled_string.join("").toString();
    }
    else{
        textElement.value = translated_text;
    }
}

const checkIfKeyExist = (objectName, keyName) => {
    let keyExist = Object.keys(objectName).some(key => key === keyName);
    return keyExist;
};

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}