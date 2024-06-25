var selected_color= '#ed2450'

function pressedcolor(the_color,the_color_name){
    selectedPointer = document.getElementById("selectedcolor")
    selected_color = the_color
    console.log("We have selected the color: " + the_color_name)
    selectedPointer.innerHTML = "Selected color is " + the_color_name
}

async function submitAll(){
    const nameElement = document.getElementById("uname")
    const username = nameElement.value
    var nameallowed = checkName(username)
    if (nameallowed){
        await make_post_request(username,selected_color)
        alert("Succesfully submitted!")
        window.location.replace("https://foggydude.dev/names");
    }
}

function checkName(the_name){
    { 
        var letters = /^[A-Za-z]+$/;
        if(the_name.match(letters))
        {
        return true;
        }
        else
        {
        alert('Please input alphabet characters only');
        return false;
        }
    }
}

async function make_post_request(username,le_color){
    await fetch("https://mypythonworker.hrimar321.workers.dev", {
        method: "POST",
        body: JSON.stringify({
          name: username,
          color: le_color,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      });
}