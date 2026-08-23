const theURL = "https://test-workflow.hrimar321.workers.dev";
let warningSign = null;

function testIndex(){
    warningSign = document.getElementById("warningtext");
    warningSign.style.opacity = 0;
    const allElements  = $("*");

    for (let i = 0; i<allElements.length; i++){
        const element = allElements[i];
        
        const idEleme = document.createElement("fucker");
        idEleme.id = "yo"+i
        element.appendChild(idEleme);
    }

    document.getElementById("mainstuff").addEventListener('mouseover',(event)=>testsit(event));
    document.addEventListener("mouseup",mouseClicked)
    document.addEventListener("keydown",(event)=>KeyInput(event));

    loadStuff();
}

let hoveredElement = null;

function testsit(event){
    const theTarget = event.target;

    if (theTarget.id == "mainstuff" || theTarget.className == "fucker"){
        return;
    }   
    hoveredElement = theTarget;
}

let focusedElement = null;

function mouseClicked(){
    console.log("MOUSE CLICK!")
    if (hoveredElement != null){
        warningSign.style.opacity = 1;
        //console.log(hoveredElement.localName);
        if (focusedElement != null && focusedElement != hoveredElement){
            focusedElement.classList.remove("editing");
            //submitStuff();
        }
        focusedElement = hoveredElement;
        focusedElement.classList.add("editing");
    }
}

function KeyInput(event){
    if (focusedElement != null){
        //console.log(focusedElement.textContent);
        //if (event.keyCode)
        if (event.key != 'Backspace' && event.location == 0x00 && event.key != "Enter" && event.key != "Escape"){
            //changeTextContents(focusedElement,focusedElement.textContent+event.key)
            changeTextContents(focusedElement,getTextContents(focusedElement)+event.key);
        } else if (event.key == 'Backspace'){
            //changeTextContents(focusedElement,focusedElement.textContent.substring(0,focusedElement.textContent.length-1))
            changeTextContents(focusedElement,getTextContents(focusedElement).substring(0,getTextContents(focusedElement).length-1))
        } else if (event.key == "Enter"){
            submitStuff();
        } else if (event.key == "Escape"){
            if (focusedElement != null){
                focusedElement.classList.remove("editing");
            }

            warningSign.style.opacity = 0;
            focusedElement = null;
            hoveredElement = null;
        }
    }
}

function getTextContents(element){
    return element.childNodes[0].nodeValue;
}

function changeTextContents(element, newText) {
    let done = false;
    element.classList.add("edited");
    element.childNodes[0].nodeValue = newText;

    return
    element.childNodes.forEach(node => {
        if (node.nodeType == Node.TEXT_NODE && done == false) {
            node.nodeValue = newText
            done = true;
        }
    })
}

async function submitStuff(){
    const theID = focusedElement.querySelector("fucker").id;
    const theNewText = focusedElement.textContent;
    focusedElement.classList.remove("editing");
    focusedElement = null;
    hoveredElement = null;
    warningSign.style.opacity = 0;

    await fetch(theURL, {
        method: "POST",
        body: JSON.stringify({
          thething: "MAKECHANGE",
          username: window.location.pathname,
          usersafe: theID,
          message: theNewText,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
    });
}

async function loadStuff(){
    const results = 
        await fetch(theURL, {
            method: "POST",
            body: JSON.stringify({
            thething: "GETCHANGE",
            username: window.location.pathname,
            }),
            headers: {
            "Content-type": "application/json; charset=UTF-8"
            }
    });
    
    const stuff = await results.json();
    
    for (let i = 0; i < stuff.length; i++){
        const theThing = stuff[i];
        const id = theThing.theid;
        const newText = theThing.thetext;

        const idElement = document.getElementById(id);
        if (idElement != null){
            const theRealElement = idElement.parentElement;
            changeTextContents(theRealElement,newText);
        }
    }
}

