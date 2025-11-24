const files = {
    "261":"file1",
    "287":"file2"
}

let currentIndex = 0;

function setupStuff(first=false){
    const leftKey = document.getElementById("leftbutton")
    const rightKey = document.getElementById("rightbutton")
    const fileLabel = document.getElementById("filename")
    const coverImage = document.getElementById("coverimage")

    if (first){
        leftKey.addEventListener("click",changeFile,false)
        rightKey.addEventListener("click",changeFile,false)
    }

    if (currentIndex == 0){
        leftKey.style.display = "none"
    } else {
        leftKey.style.display = "inline-block"
    }

    if (currentIndex == Object.keys(files).length-1){
        rightKey.style.display = "none"
    } else {
        rightKey.style.display = "inline-block"
    }

    fileLabel.innerText = "FILE №"+String(Object.keys(files)[currentIndex])
    coverImage.style.transform = "rotate("+String(Math.random()*2.0)+"deg)"
}

function showFile(yeah=true){
    const mainPage = document.getElementById("mainpage");
    const outButton = document.getElementById("outOfFile");
    const linkToDesk = document.getElementById("linkToDesk");

    const pageName = Object.values(files)[currentIndex]
    const thePage = document.getElementById(pageName);

    if (yeah){
        mainPage.style.display = "none";
        linkToDesk.style.display = "none";
        thePage.style.display = "";
        outButton.style.display = "";
    } else {
        mainPage.style.display = "";
        linkToDesk.style.display = "";
        thePage.style.display = "none";
        outButton.style.display = "none";
    }
}

function changeFile(evt){
    if (evt.currentTarget.innerText == "→"){
        currentIndex++;
        setupStuff();
    } else {
        currentIndex--;
        setupStuff();
    } 
}