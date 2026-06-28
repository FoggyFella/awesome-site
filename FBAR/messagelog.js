currentlyLoaded = 0;

const defaultTest = [
    {
        "username": "fuvk",
        "message": "hello guys",
        "channelname": "leaks"
    },
    {
        "username": "foggy",
        "message": "whats up you",
        "channelname": "general"
    }
]

async function getData(theindex = 0) {
    const response = await fetch("https://general-messages.hrimar321.workers.dev",{
        method: "POST",
        body: JSON.stringify({thing:"GETMESSAGES",index: theindex})
    });
    const jsonResponse = await response.json();

    currentlyLoaded += jsonResponse.length;

    console.log(jsonResponse);
    console.log(currentlyLoaded);
    writeMessages(jsonResponse);
}

function writeMessages(messages){
    //messages = defaultTest;

    const container = document.getElementById("messageContainer");

    const newElements = messages.map((i)=>'<p class=username>'+i.username+':</p><p class=message>'+i.message+'</p><p class=channelName>in '+i.channelname+'</p>');
    container.insertAdjacentHTML("beforeend",newElements.join(''))
}

function update(){
    getData(currentlyLoaded)
}