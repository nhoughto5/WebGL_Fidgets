const width = 600;
const height = 300;
let canvas = null;
let ctx = null;

function main(){
    let arr = createHiDPICanvas(width, height);
    canvas = arr[0];
    ctx = arr[1];
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Welcome, lets Draw!",width / 2,height / 2);
    document.getElementById("canvasDiv").appendChild(canvas);
}

function triangles(){
    let arr = createHiDPICanvas(width, height, null, "experimental-webgl");
    canvas = arr[0];
    ctx = arr[1];
    canvas.style.backgroundColor = "red";
    document.getElementById("canvasDiv").appendChild(canvas);

    let triangles = new Triangles(ctx, canvas);
    triangles.render();
}

function triangles_3d(){
    let arr = createHiDPICanvas(width, height, null, "experimental-webgl");
    canvas = arr[0];
    ctx = arr[1];
    canvas.style.backgroundColor = "black";
    document.getElementById("canvasDiv").appendChild(canvas);

    let triangles = new Triangles_3D(ctx, canvas);
    triangles.render();
}

window.onload = main;
