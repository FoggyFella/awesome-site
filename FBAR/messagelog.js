currentlyLoaded = 0;
minIndex = 0;
maxIndex = 0;

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

async function getData(theindex = 0,older=false) {
    console.log(timeConverter(1782653285));

    var data = {
        thing:"GETMESSAGES",
        minIndex: minIndex,
        maxIndex: maxIndex,
        older: older
    }

    const response = await fetch("https://general-messages.hrimar321.workers.dev",{
        method: "POST",
        body: JSON.stringify(data)
    });
    const jsonResponse = await response.json();

    currentlyLoaded += jsonResponse.length;

    if ((maxIndex==0 && minIndex == 0) || older){
        minIndex = jsonResponse.minIndex;
        console.log("New min Index is ",minIndex)
    }
    if ((maxIndex==0 && minIndex == 0) || !older){
        maxIndex = jsonResponse.maxIndex;
        console.log("New max Index is ",maxIndex)
    }
   // console.log(jsonResponse);
    //console.log(currentlyLoaded);
    writeMessages(jsonResponse,older);
}

function writeMessages(response,older=false){
    messages = response.results;

    const container = document.getElementById("messageContainer");

    const newElements = messages.map((i)=>'<p class=username>'+i.username+':</p><p class=message>'+i.message+'</p><p class=channelName>in '+i.channelname+' at '+timeConverter(i.timestamp)+'</p>');
    if (!older){
        container.insertAdjacentHTML("beforeend",newElements.join(''))
    } else{
        container.insertAdjacentHTML("beforebegin",newElements.join(''))
    }
}

function update(older=false){
    getData(currentlyLoaded,older)
}


function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  return a.toLocaleDateString()+" "+a.toLocaleTimeString();
}