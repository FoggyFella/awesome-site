currentlyLoaded = 0;

async function getData(theindex = 0) {
    const response = await fetch("https://general-messages.hrimar321.workers.dev",{
        method: "POST",
        body: JSON.stringify({thing:"GETMESSAGES",index: theindex})
    });
    const jsonResponse = await response.json();

    currentlyLoaded = jsonResponse.length;
    console.log(jsonResponse);
    console.log(currentlyLoaded)
}