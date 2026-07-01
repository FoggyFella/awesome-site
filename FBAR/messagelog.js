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

const imgTypes = [
    ".jpg",
    ".png",
    ".jpeg",
    ".webp",
    ".gif"
]

const videoTypes = [
    ".mp4",
    ".mkv",
    ".avi"
]

async function getData(theindex = 0,older=false) {
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

    const newElements = messages.map((i)=>'<p class=username>'+i.username+':</p><p class=message>'+i.message+'</p><p class=channelName>in '+i.channelname+' at '+timeConverter(i.timestamp)+'</p>'+getAttachmentElement(i.attachment));
    if (!older){
        container.insertAdjacentHTML("beforeend",newElements.join(''))
    } else{
        container.insertAdjacentHTML("beforebegin",newElements.join(''))
    }
}

function getAttachmentElement(attachment){
    if (attachment == null){
        return ""
    }
    if (attachment.length == 0){
        return ""
    }

    const fileName = attachment[0];
    const theUrl = attachment[1];

    const split = fileName.split(".")
    const fileType = split[split.length-1]

    if (imgTypes.includes(fileType)){
        console.log('ok this one is an image')
    }else if(videoTypes.includes(fileType)){
        console.log('ok this one is a video')
    }else{
        console.log('what the fuck is this one')
    }

    return ""
}

function update(older=false){
    getData(currentlyLoaded,older)
}


function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  return a.toLocaleDateString()+" "+a.toLocaleTimeString();
}