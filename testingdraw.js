let ctx
let mousedown = false;
var drawArray = [];

function setupStuff(){
    var canvas = document.getElementById("drawing");
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx = canvas.getContext("2d");
    //canvas.addEventListener("click",drawDot);
    canvas.addEventListener('mousemove',drawDot);

    canvas.addEventListener('mousedown',function(){mousedown=true});
    canvas.addEventListener('mouseup',function(){mousedown=false});
}

function drawDot(ev){
    //var canvas = document.getElementById("drawing");
    //var ctx = canvas.getContext("2d");

    if (mousedown){
        ctx.fillRect(ev.pageX,ev.pageY,10,10);
        drawArray.push(ev.pageX,ev.pageY);
        console.log(drawArray);
    }
}
