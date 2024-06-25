

async function fetchData(){
    const IdThing = document.getElementById("loading");
    console.log(IdThing.con)
    const response = await fetch("https://mypythonworker.hrimar321.workers.dev");
    IdThing.remove();
}