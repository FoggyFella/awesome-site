async function getData() {
    const response = await fetch("https://general-messages.hrimar321.workers.dev",{
        method: "POST",
        body: JSON.stringify({thing:"GETMESSAGES",index: 1})
    });
    console.log(await response.json());
}