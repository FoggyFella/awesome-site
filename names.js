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
    const container = document.getElementById("namecontainer");
    var the_id = 0
    var plus = true
    for (user in names){
        const userdata  = names[user]
        const name = userdata["name"]
        const color = userdata["color"]

        const mything = document.createElement("p")
        mything.style.color = color
        if (plus){
            mything.style.transform = 'rotate('+String(Math.random()*3)+')';
        }
        else{
            mything.style.transform = 'rotate('+String(Math.random()*-3)+')';
        }
        const node = document.createTextNode(name);
        mything.appendChild(node)
        setProperty(mything,"--charindex",the_id)

        container.appendChild(mything)
        the_id += 1
        plus = !plus

    }
}

function setProperty(el, varName, value) {
    el.style.setProperty(varName, value);
} 