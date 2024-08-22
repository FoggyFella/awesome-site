async function submitAll(){
    const nameElement = document.getElementById("uname")
    const msgElement = document.getElementById("umsg")

    const username = nameElement.value
    const message = msgElement.value

    const nameallowed = true

    if (nameallowed){
        await make_post_request(username,message)
        alert("Succesfully submitted!")
        window.location.replace("https://foggydude.dev/assets/thank.png");
    }
}

async function make_post_request(username,le_message){
    await fetch("https://birthday-thing.hrimar321.workers.dev", {
        method: "POST",
        body: JSON.stringify({
          name: username,
          message: le_message,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      });
}