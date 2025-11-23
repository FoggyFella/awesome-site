const dialogue = [
    "⛟‎⛩‎⚯‎☲‎♜‎◔‎☲‎⛇‎❦‎⛬‎⚭‎⚯‎⛬‎☲‎⛛‎",
    "♾‎⛯‎⚄‎☺‎⛟‎☺‎☣‎⚯‎♫‎☲‎☢‎⚭‎⛬‎☲‎☺‎☺‎⚇‎'‎⚄‎⚭‎𝇧‎⚭‎☲‎✯‎☲‎⛟‎𝇧‎☲‎⛟‎⛟‎⛛‎⛩‎",
    "✯‎☲‎☲‎☲‎⛛‎𝇧‎⛛‎✯‎⚯‎◔‎☺‎⛬‎⚯‎☺‎⛟‎☲‎❦‎⚭‎⚭‎☲‎❦‎⛛‎♫‎⚭‎⛩‎⚭‎⛩‎☺‎⚄‎⛟‎☲‎☲‎⛇‎⛟‎⛩‎◔‎♲‎⚄‎✯‎"
];

let currentIndex = -1;

function playDialogue(){
    const textBox = document.querySelector(".alientext")

    if (currentIndex < dialogue.length - 1){
        currentIndex++;
    } else {
        textBox.style.opacity = 0.0;
        currentIndex = -1;
        return;
    }

    textBox.style.opacity = 1.0;
    textBox.innerText = dialogue[currentIndex];
}