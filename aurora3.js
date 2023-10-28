"use strict"

let x,y = 22,z;




class Nordlicht {

    constructor(element) {
        this.el = element;
        this.treadmill = new Treadmill(this.el);

        window.requestAnimationFrame(this.render);

    }


    render = () => {
        this.el.firstChild.getContext("2d").clearRect(0, 0, window.innerWidth, window.innerHeight);
        for (let i=-99; i<100; i++) {
            this.treadmill.createLine(i,y,0.1,i,y,100,1,"red");
            this.treadmill.createLine(-100,y,i+99,+100,y,i+99,1,"red");
        }
        window.requestAnimationFrame(this.render)
    }

}

const myNordlicht = new Nordlicht(document.getElementById("aurora"));








const pane = new Tweakpane.Pane();

const PARAMS = {
    x: 0,
    y: 22,
    z: 0,
  };
  

  pane.addInput(PARAMS, 'x', {min: -500, max: 500, step: 1}).on('change', (ev) => {x = ev.value;});
  pane.addInput(PARAMS, 'y', {min: -500, max: 500, step: 1}).on('change', (ev) => {y = ev.value;});
  pane.addInput(PARAMS, 'z', {min: -500, max: 500, step: 1}).on('change', (ev) => {z = ev.value;});