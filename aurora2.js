"use strict"


let focalLength = 100;
let Y = -170;
let X = 0;
let Z = 0;
const context2d = document.createElement("canvas").getContext("2d");


Object.getPrototypeOf(context2d).round3DRect = function(x, y, z, width, height, borderRadius) {

    const p = 1 / z * 100;

    x = x * p + this.canvas.clientWidth / 2 - width * p  / 2;
    y = y * p + this.canvas.clientHeight / 2 - height * p / 2;

    borderRadius = Math.min(borderRadius*p, 0)

    return this.roundRect(x, y, width * p, height * p, borderRadius)

}






class Nordlicht {




    constructor(el) {
            this.el = document.getElementById(el.toString());
            this.color = { r: 32, g: 233, b: 133 };
            this.blur = 12;
            this.transform = { rotateX: 0, rotateY: 0, rotateZ: 0, perspective: 0, scale: 1 };
            this.focalLength = 35;
            this.fps = 60;
            this.init()

            window.addEventListener('resize', () => {
                this.updateCanvas();
            })
    }






    init() {
        this.el.innerHTML = "";
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext("2d");

        this.lastTimestamp = 0;
        this.progress = 0;

        this.el.appendChild(this.canvas);

        this.setCanvas();
    }







    setCanvas() {

        this.updateCanvas();

        // Setting styles for the container object
        this.el.style.overflow = "hidden";
        this.el.style.marginTop = "50vh";
        this.el.style.marginLeft = "50%";

        this.animation = requestAnimationFrame(this.draw)

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





    draw = currentTimestamp => {

        if (currentTimestamp - this.lastTimestamp > (1000 / this.fps)) {

            this.progress += 1/this.fps;
            this.lastTimestamp = currentTimestamp;
            
            let ctx = this.ctx;

            ctx.clearRect(0, 0, this.width, this.height);

            for (let i=1; i<200; i++) {
                const z = i * 1.4 + Z;
                const x = this.s(z,1) * 20;

                const rect = this.transform3D({
                    x: x * 100 + X,
                    y: Y,
                    width: 16,
                    height: 300,
                    borderRadius: 8
                }, z)

                ctx.beginPath();
                ctx.roundRect(rect.x, rect.y, rect.width, rect.height, rect.borderRadius)
                const grd = ctx.createLinearGradient(rect.x - rect.width/2, rect.y + rect.height / 2, rect.x + rect.width/2, rect.y - rect.height / 2);
                grd.addColorStop(1, this.transformColor("rgb(32,223,133)", 1));
                grd.addColorStop(0, this.transformColor("rgb(32,223,133)", 0));
                ctx.fillStyle = grd;
                ctx.fill();
                ctx.closePath();
            }


        }

        this.animation = requestAnimationFrame(this.draw);

    }




    s(x, sp) {
        sp *= 0.01;
        let cx = 13;
        let result = 1;

        function sine(min, max, speed) {
            return max * Math.sin(sp * speed) + min
        }

        for (let i = 0; i < cx; i++) {
            result += (Math.sin(1 / cx * i * (x * 0.3 + (1 / cx * i * -3 * (-1 * i)) * this.progress * sp)) - 1) / 2;
        }
    
        result += (Math.sin(0.04 * x + this.progress * sp * 2) + 1) * 5;
    
        return result /(cx + 10)
    }


    
    transformColor(c, o) {
        c = (c.slice(0, 3) + "a" + c.slice(3)).substring(0, c.length) + "," + o + ")";
        return c
    }


    transform3D(rect, z) {
        const p = 1 / z * 100;

        let transform = {
            x: rect.x,
            y: rect.y,
            width: rect.width,
            height: rect.height,
            borderRadius: rect.borderRadius
        }

        transform.x = transform.x * p + this.canvas.clientWidth / 2 - rect.width * p  / 2;
        transform.y = transform.y * p + this.canvas.clientHeight / 2 - rect.height * p / 2;

        transform.borderRadius = Math.abs(transform.borderRadius*p)

        return transform
    }



}


const myNordlicht = new Nordlicht("aurora");














const pane = new Tweakpane.Pane();

const PARAMS = {
    FocalLength: 100,
    X: 0,
    Y: -170,
    Z: 0
  };
  
// Feather
  pane.addInput(PARAMS, 'FocalLength', {min: 0, max: 300, step: 1}).on('change', (ev) => {focalLength = ev.value;});
  pane.addInput(PARAMS, 'X', {min: -600, max: 600, step: 1}).on('change', (ev) => {X = ev.value;});
  pane.addInput(PARAMS, 'Y', {min: -800, max: 800, step: 1}).on('change', (ev) => {Y = ev.value;});
  pane.addInput(PARAMS, 'Z', {min: -400, max: 400, step: 1}).on('change', (ev) => {Z = ev.value;});

 