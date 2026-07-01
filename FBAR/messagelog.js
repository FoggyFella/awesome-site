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
    "jpg",
    "png",
    "jpeg",
    "webp",
    "gif"
]

const videoTypes = [
    "mp4",
    "mkv",
    "avi"
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

    const newElements = messages.map((i)=>'<p class=username>'+i.username+':</p><p class=message>'+i.message+'</p>'+getAttachmentElement(i.attachment)+'<p class=channelName>in '+i.channelname+' at '+timeConverter(i.timestamp)+'</p>');
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
    const pasrsedAttachment = JSON.parse(attachment);
    if (pasrsedAttachment.length == 0){
        return ""
    }
    console.log(pasrsedAttachment)

    const fileName = pasrsedAttachment[0];
    const theUrl = pasrsedAttachment[1];

    console.log(fileName)
    console.log(theUrl)

    const split = fileName.split(".")
    const fileType = split[split.length-1]

    console.log(fileType)

    if (imgTypes.includes(fileType)){
        return "<img class=attachment src='"+theUrl+"'>"
    }else if(videoTypes.includes(fileType)){
        return "<video class=attachment controls src='"+theUrl+"'>"
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