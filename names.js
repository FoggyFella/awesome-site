async function fetchData(){

    const IdThing = document.getElementById("loading");
    const ResultsThing = document.getElementById("results");

    console.log(IdThing.con)
    const response = await fetch("https://mypythonworker.hrimar321.workers.dev");
    IdThing.remove();
    const stuff = await response.json();

    console.log(stuff["results"])
    writenames(stuff["results"])
    //ResultsThing.textContent = stuff;
}

function writenames(names){
    for (user in names){
        console.log(user)
    }
}