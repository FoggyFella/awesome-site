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
    ":":"⛓"
}

function translate_text_into_lang(){
    const textElement = document.getElementById("texttolang")
    const text = textElement.value

    console.log(text)

    let un_text = text.toLowerCase();
    let translated_text = ""

    let chars = Array.from(un_text)

    for (let char of chars){
        console.log(char)
        if (checkIfKeyExist(dictionary,char)){
            translated_text += dictionary[char];
            console.log(dictionary[char])
        }
        else {
            translated_text += char;
            console.log("idk bruv")
        }
    }

    console.log(translated_text);
    textElement.value = translated_text;
}

function translate_lang_into_text(){
    const textElement = document.getElementById("langtotext")
    const text = textElement.value

    console.log(text)

    let un_text = text.toLowerCase();
    let translated_text = ""

    let chars = Array.from(un_text)

    for (let char of chars){
        console.log(char)
        if (Object.values(dictionary).includes(char)){
            console.log("holy moly")
            translated_text += getKeyByValue(dictionary,char);
        }
        else {
            translated_text += char;
            console.log("idk bruv")
        }
    }

    console.log(translated_text);
    textElement.value = translated_text;
}

const checkIfKeyExist = (objectName, keyName) => {
    let keyExist = Object.keys(objectName).some(key => key === keyName);
    return keyExist;
};

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}