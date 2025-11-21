

async function check_password(){
    const passworddiv = document.querySelector(".password");
    const loading = document.querySelector(".loadinggif");
    const textfield = document.getElementById("passwordinput");
    const alertfield = document.getElementById("alerttext")
    let the_attempt = String(textfield.value).toLowerCase();
    console.log(the_attempt)
    let thejson

    passworddiv.style.display = "none";
    loading.style.opacity = 1;

    await fetch("https://mypythonworker.hrimar321.workers.dev", {
        method: "POST",
        body: JSON.stringify({
          thething: "checkpass",
          attempt: the_attempt
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }).then((response) => response.json())
      .then((json) => thejson=json);

      console.log(thejson)
    
    if (thejson == true){
      localStorage.setItem("diskactive","true");
      window.location.href = "forestgame.html"
    } else {
      passworddiv.style.display = "inline-block";
      loading.style.opacity = 0;
      alertfield.innerText = "INVALID PASSWORD, TRY AGAIN"
    }
}

function displayIcons(){
  const diskactivation = new URLSearchParams(window.location.search).has("diskactivation");
  if (diskactivation){
    const passworddiv = document.querySelector(".password");
    passworddiv.style.animation = "fadein 0.5s linear";
    passworddiv.style.opacity = 1.0;
    passworddiv.style.display = "inline-block"
    console.log("disk activation sequence")
    return
  }
  const icons = document.querySelectorAll(".compicon")
  let diskactive = localStorage.getItem("diskactive");

  icons.forEach(icon => {
    icon.style.animation = "fadein 0.5s linear";
    icon.style.opacity = 1.0;
    if (icon.id == "forestgame" && diskactive=="false"){
      icon.style.display = "none"
    } else if (icon.id != "forestgame" || diskactive=="true") {
      icon.style.display = "inline-block"
    }
  });
}