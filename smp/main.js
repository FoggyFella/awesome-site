async function checkPassword(){
    const thePassword = String(document.getElementById("passwordinput").value).toLowerCase();

    let thejson

    await fetch("https://mypythonworker.hrimar321.workers.dev", {
        method: "POST",
        body: JSON.stringify({
          thething: "smpcheck",
          password: thePassword
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }).then((response) => response.json())
    .then((json) => thejson=json);

    if (thejson[0] == true){
        const imgContainer = document.querySelector(".bigimage")
        imgContainer.setAttribute("src",thejson[1]+".png")
    }
}