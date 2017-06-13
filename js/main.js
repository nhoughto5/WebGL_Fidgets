var CANVAS;
var GL;

function getContext(){
    try{
        GL = CANVAS.getContext("experimental-webgl", {antialias: false});
    }catch(e){
        alert("You are not using a browser with WebGL");
        return false;
    }
}

function getVertexShader(){
    return `
        attribute vec2 position;
        void main(void){
            gl_Position = vec4(position, 0.0, 1.0);
        }
    `;
}

function getFragmentShader(){
    return `
        void main(void){
            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
        }
    `;
}

function getShader(source, type, typeString){
    let shader = GL.createShader(type);
    GL.shaderSource(shader, source);
    GL.compileShader(shader);

    if(!GL.getShaderParameter(shader, GL.COMPILE_STATUS)){
        alert("ERROR In " + typeString + " SHADER: " + GL.getShaderInfoLog(shader));
        return false;
    }
    return shader;
}


function main(){
    CANVAS = document.getElementById("canvas");
    getContext();

    let vertexShader = getShader(getVertexShader(), GL.VERTEX_SHADER, "VERTEX");
    let fragmentShader = getShader(getFragmentShader(), GL.FRAGMENT_SHADER, "FRAGMENT");

    let shaderProgram = GL.createProgram();
    GL.attachShader(shaderProgram, vertexShader);
    GL.attachShader(shaderProgram, fragmentShader);

    GL.linkProgram(shaderProgram);

    let _position = GL.getAttribLocation(shaderProgram, "position");
    GL.enableVertexAttribArray(_position);
    GL.useProgram(shaderProgram);

    /*========================= THE TRIANGLE ========================= */
    //POINTS :
    let triangle_vertex=[
        -1,-1, //first corner: -> bottom left of the viewport
        1,-1, //bottom right of the viewport
        1,1,  //top right of the viewport
    ];

    let TRIANGLE_VERTEX= GL.createBuffer ();
    GL.bindBuffer(GL.ARRAY_BUFFER, TRIANGLE_VERTEX);
    GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(triangle_vertex), GL.STATIC_DRAW);

    //FACES :
    let triangle_faces = [0,1,2];
    let TRIANGLE_FACES= GL.createBuffer ();
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TRIANGLE_FACES);
    GL.bufferData(GL.ELEMENT_ARRAY_BUFFER, new Uint16Array(triangle_faces), GL.STATIC_DRAW);

    GL.clearColor(0.0, 0.0, 0.0, 0.0);

    let animate=function() {

        GL.viewport(0.0, 0.0, CANVAS.width, CANVAS.height);
        GL.clear(GL.COLOR_BUFFER_BIT);

        GL.bindBuffer(GL.ARRAY_BUFFER, TRIANGLE_VERTEX);

        GL.vertexAttribPointer(_position, 2, GL.FLOAT, false,4*2,0) ;

        GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TRIANGLE_FACES);
        GL.drawElements(GL.TRIANGLES, 3, GL.UNSIGNED_SHORT, 0);
        GL.flush();

        window.requestAnimationFrame(animate);
    };

    animate();
}
