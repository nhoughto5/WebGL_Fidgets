class Triangles extends Animation {

    constructor(ctx, can) {
        super(ctx, can);
    }

    getVertexShader() {
        return `
        attribute vec2 position;
        attribute vec3 colour;
        varying vec3 vColor;
        void main(void){
            gl_Position = vec4(position, 0.0, 1.0);
            vColor = colour;
        }
    `;
    }

    getFragmentShader() {
        return `
        precision mediump float;
        varying vec3 vColor;
        void main(void){
            gl_FragColor = vec4(vColor, 1.0);
        }
    `;
    }

    render() {

        let vertexShader = this.getShader(this.getVertexShader(), this.gl.VERTEX_SHADER, "VERTEX");
        let fragmentShader = this.getShader(this.getFragmentShader(), this.gl.FRAGMENT_SHADER, "FRAGMENT");

        let shaderProgram = this.gl.createProgram();
        this.gl.attachShader(shaderProgram, vertexShader);
        this.gl.attachShader(shaderProgram, fragmentShader);

        this.gl.linkProgram(shaderProgram);

        var _colour = this.gl.getAttribLocation(shaderProgram, "colour");
        let _position = this.gl.getAttribLocation(shaderProgram, "position");

        this.gl.enableVertexAttribArray(_colour);
        this.gl.enableVertexAttribArray(_position);
        this.gl.useProgram(shaderProgram);

        /*========================= THE TRIANGLE ========================= */
        //POINTS :
        let triangle_vertex = [
            -1, -1, //first corner: -> bottom left of the viewport
            0, 0, 1,
            1, -1, //bottom right of the viewport
            1, 1, 0,
            1, 1, //top right of the viewport
            1, 0, 0
        ];

        let TRIANGLE_VERTEX = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, TRIANGLE_VERTEX);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(triangle_vertex), this.gl.STATIC_DRAW);

        //FACES :
        let triangle_faces = [0, 1, 2];
        let TRIANGLE_FACES = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, TRIANGLE_FACES);
        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(triangle_faces), this.gl.STATIC_DRAW);

        this.gl.clearColor(0.0, 0.0, 0.0, 0.0);

        let animate = function () {

            this.gl.viewport(0.0, 0.0, this.CANVAS.width, this.CANVAS.height);
            this.gl.clear(this.gl.COLOR_BUFFER_BIT);

            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, TRIANGLE_VERTEX);

            let totalVertexSizeInBytes = 4 * (2 + 3); // Num Bytes * (two pos + two color)
            this.gl.vertexAttribPointer(_position, 2, this.gl.FLOAT, false, totalVertexSizeInBytes, 0);
            this.gl.vertexAttribPointer(_colour, 3, this.gl.FLOAT, false, totalVertexSizeInBytes, 2 * 4);

            this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, TRIANGLE_FACES);
            this.gl.drawElements(this.gl.TRIANGLES, 3, this.gl.UNSIGNED_SHORT, 0);
            this.gl.flush();

            window.requestAnimationFrame(animate);
        }.bind(this);

        animate();
    }
}
