async function submitAll(){
    const nameElement = document.getElementById("uname")
    const msgElement = document.getElementById("umsg")
    const theButton = document.getElementById("elButton")

    const username = nameElement.value
    const message = msgElement.value

    const nameallowed = true

    if (nameallowed){
        theButton.remove()
        await make_post_request(username,message)
        alert("Succesfully submitted!")
        window.location.replace("https://foggydude.dev/assets/images/thank.png");
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