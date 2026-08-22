const theURL = "https://test-workflow.hrimar321.workers.dev";

function testIndex(){
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
    console.log(window.location.pathname);
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
        //console.log(hoveredElement.localName);
        focusedElement = hoveredElement;
    }
}

function KeyInput(event){
    if (focusedElement != null){
        //console.log(focusedElement.textContent);
        //if (event.keyCode)
        if (event.key != 'Backspace' && event.location == 0x00 && event.key != "Enter"){
            changeTextContents(focusedElement,focusedElement.textContent+event.key)
            //changeTextContents(focusedElement,getTextContents(focusedElement)+event.key);
        } else if (event.key == 'Backspace'){
            changeTextContents(focusedElement,focusedElement.textContent.substring(0,focusedElement.textContent.length-1))
            //focusedElement.textContent = focusedElement.textContent.substring(0,focusedElement.textContent.length-1);
        } else if (event.key == "Enter"){
            submitStuff();
        }
    }
}

function getTextContents(element){
    element.childNodes.forEach(node => {
        if (node.nodeType == Node.TEXT_NODE) {
            return node.nodeValue;
        }
    })
}

function changeTextContents(element, newText) {
    let done = false;
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
    focusedElement = null;
    hoveredElement = null;

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

