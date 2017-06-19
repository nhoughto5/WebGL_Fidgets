class Animation {

    constructor(ctx, can) {
        this.gl = ctx;
        this.CANVAS = can;
    }

    getShader(source, type, typeString) {
        let shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);

        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            console.error("ERROR In " + typeString + " SHADER: " + this.gl.getShaderInfoLog(shader));
            return false;
        }
        return shader;
    }
}
