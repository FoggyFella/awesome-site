const files = {
    "261":"file1",
    "287":"file2"
}

let currentIndex = 0;

let pages
let currentPage = 0;

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
    pages = thePage.querySelectorAll(".fileimage");

    if (yeah){
        mainPage.style.display = "none";
        linkToDesk.style.display = "none";
        thePage.style.display = "";
        outButton.style.display = "";

        const leftKey = thePage.querySelector(".leftkey")
        const rightKey = thePage.querySelector(".rightkey")
    
        if (leftKey != null && rightKey != null){
            for (let i=0; i<pages.length; i++){
                if (i == currentPage){
                    pages[i].style.display = "";
                } else {
                    pages[i].style.display = "none";
                }
            }

            leftKey.addEventListener("click",changePage,false)
            rightKey.addEventListener("click",changePage,false)

            if (currentPage == 0){
                leftKey.style.display = "none"
            } else {
                leftKey.style.display = "inline-block"
            }

            if (currentPage == pages.length-1){
                console.log('should hide right')
                rightKey.style.display = "none"
            } else {
                rightKey.style.display = "inline-block"
            }
        }
    }

    else {
        mainPage.style.display = "";
        linkToDesk.style.display = "";
        thePage.style.display = "none";
        outButton.style.display = "none";
        currentPage = 0;
    }
}

function changePage(evt){
    if (evt.currentTarget.innerText == "→"){
        currentPage++;
        showFile(true);
    } else {
        currentPage--;
        showFile(true);
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