"use strict";







class Treadmill {

    constructor(el) {
        this.treadmill = new TreadmillScene();
        this.treadmill.init(el);
    }

    createRect(x,y,z,width,height,borderRadius,color) {
        new createRect(this.treadmill.canvas, this.treadmill.ctx, x,y,z,width,height,borderRadius,color);
    }

    createLine(x0,y0,z0,x1,y1,z1,lineWidth, color) {
        new createLine(this.treadmill.canvas, this.treadmill.ctx,x0,y0,z0,x1,y1,z1,lineWidth, color);
    }

}







class TreadmillScene {






    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext("2d");
    }






    init = (el) => {
        this.el = el;
        this.fps = 60;
        console.log(this);
        this.el.innerHTML = "";

        this.lastTimestamp = 0;
        this.progress = 0;

        this.el.appendChild(this.canvas);

        this.setCanvas();


        window.addEventListener('resize', () => {
            this.updateCanvas();
        });

    }








    setCanvas() {


        this.updateCanvas();


    }









    updateCanvas() {

        this.width = parseInt(window.getComputedStyle(this.el).getPropertyValue("width"));
        this.height = parseInt(window.getComputedStyle(this.el).getPropertyValue("height"));

        this.dpi = window.devicePixelRatio;

        // No idea why but you have to set CSS size as well otherwise the retina display has a bad time
        this.canvas.style.width = this.width + "px";
        this.canvas.style.height = this.height + "px";

        // Setting the size of the canvas
        this.canvas.width = this.width * this.dpi;
        this.canvas.height = this.height * this.dpi;

        // Normalizing the canvas to use device pixels and not the 2x retina pixels for the coordination system
        this.ctx.scale(this.dpi, this.dpi);

    }




    draw = (x, y, z, width, height, borderRadius, color) => {

        const ctx = this.ctx;

        const p = 1 / z * 20;

        x = x * p + this.canvas.clientWidth / 2 - width * p  / 2;
        y = y * p + this.canvas.clientHeight / 2 - height * p / 2;
        width = width * p;
        height = height * p;

        borderRadius = Math.max(borderRadius*p, 0)

        ctx.beginPath()
        ctx.roundRect(x, y, width, height, borderRadius);
        ctx.fillStyle = "blue";
        ctx.fill();
        ctx.closePath();
        this.animation = window.requestAnimationFrame(this.draw);
    }



}





















class createRect {

    constructor(canvas, ctx, x, y, z, width, height, borderRadius, color) {
        const p = 1 / z * 30;

        this.x = x * p + canvas.clientWidth / 2 - width * p  / 2;;
        this.y = y * p + canvas.clientHeight / 2 - height * p / 2;
        this.width = width * p;
        this.height = height * p;
        this.borderRadius = borderRadius * p;
        this.color = color;

        ctx.beginPath()
        ctx.roundRect(this.x, this.y, this.width, this.height, this.borderRadius);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();

    }

}






class createLine {

    constructor(canvas, ctx, x0, y0, z0, x1, y1, z1, lineWidth, color) {

        const p0 = 1 / z0 * 40;
        const p1 = 1 / z1 * 40;

        this.x0 = x0 * p0 + canvas.clientWidth / 2;
        this.y0 = y0 * p0 + canvas.clientHeight / 2;
        this.x1 = x1 * p1 + canvas.clientWidth / 2;
        this.y1 = y1 * p1 + canvas.clientHeight / 2;
        this.lineWidth = lineWidth;

        this.color = color;

        ctx.beginPath();
        ctx.moveTo(this.x0, this.y0);
        ctx.lineTo(this.x1, this.y1);
        ctx.strokeStyle = "white";
        ctx.stroke();

    }

}