async function fetchData(){
    const IdThing = document.getElementById("loading");
    const ResultsThing = document.getElementById("results");

    console.log(IdThing.con)
    const response = await fetch("https://mypythonworker.hrimar321.workers.dev");
    IdThing.remove();
    const stuff = await response.text();

    console.log(stuff)
    const test = JSON.parse(stuff)
    console.log(test[0])
    //ResultsThing.textContent = stuff;
}