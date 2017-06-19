/**
 * Created by Natalie on 6/18/2017.
 */
var context = null;

function getContext(CANVAS, ctxType) {
    try {
        if (ctxType === null || ctxType === "2d") {
            context = CANVAS.getContext("2d");
        } else if (ctxType === "experimental-webgl") {
            context = CANVAS.getContext("experimental-webgl", {antialias: false});
        } else {
            context = CANVAS.getContext("2d");
        }
        return context;
    } catch (e) {
        console.error("You are not using a browser with WebGL");
        return false;
    }
}

var PIXEL_RATIO = (function () {
    var ctx = document.createElement("canvas").getContext("2d"),
        dpr = window.devicePixelRatio || 1,
        bsr = ctx.webkitBackingStorePixelRatio ||
            ctx.mozBackingStorePixelRatio ||
            ctx.msBackingStorePixelRatio ||
            ctx.oBackingStorePixelRatio ||
            ctx.backingStorePixelRatio || 1;

    return dpr / bsr;
})();


function createHiDPICanvas(w, h, ratio, ctxType) {
    if (!ratio) {
        ratio = PIXEL_RATIO;
    }
    let oldCanvas = document.getElementById("canvas");
    if (oldCanvas) {
        oldCanvas.remove();
    }
    let can = document.createElement("canvas");
    can.width = w * ratio;
    can.height = h * ratio;
    can.style.width = w + "px";
    can.style.height = h + "px";
    can.id = "canvas";
    let ctx = getContext(can, ctxType);
    if(ctxType === "2d"){
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    }
    return [can, ctx];
}

Element.prototype.remove = function () {
    this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function () {
    for (var i = this.length - 1; i >= 0; i--) {
        if (this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}
