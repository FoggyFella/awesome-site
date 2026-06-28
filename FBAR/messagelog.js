async function getData() {
    const response = await fetch("https://general-messages.hrimar321.workers.dev",{
        method: "GET",
        body: JSON.stringify({index: 1})
    });
    console.log(await response.json());
}