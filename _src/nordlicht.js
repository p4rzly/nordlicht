

import { createNoise2D } from 'simplex-noise';






class Spike {

	constructor(index) {
		this.index = index;
	}


	value (progress, noise) {
		const obj = {
			x: this.index * 5,
			y: noise(this.index / 80 + progress / 120, progress / 230) * 30 + 400,
			width: 5,
			height: 20,
			color: "rgb(32,223,133)",
			opacity: 1
		}

		return obj
	}


}











export default class Nordlicht {




	constructor(containerID) {

		if (!document.getElementById(containerID)) {
			throw new Error("HTML container is missing");
			return
		}

		this.container = document.getElementById(containerID);

		this.width = 0;
		this.height = 0;

		this.lastTimestamp = 0;

		this.progress = 0;
		this.maxFPS = 60;


		this.spikes = [];

		this.noise = createNoise2D();

		this.setupCanvas()

	}





	normalizeRetinaScreens() {

		// Resizing for 2X resolution/Retina screens
		const dpi = window.devicePixelRatio;
		this.canvas.style.width = this.width + "px";
		this.canvas.style.height = this.height + "px";


    	// Setting the size of the canvas
    	this.canvas.width = this.width * dpi;
    	this.canvas.height = this.height * dpi;


    	// Normalizing the canvas to use device pixels and not the 2x retina pixels for the coordination system
    	this.ctx.scale(dpi, dpi);

	}














	updateCanvas() {

		this.width = parseInt(window.getComputedStyle(this.container).getPropertyValue('width'));
		this.height = parseInt(window.getComputedStyle(this.container).getPropertyValue('height'));


		this.spikes = [];

		for (let i = 0; i < this.width / 5; i++) {
			this.spikes[i] = new Spike(i);
		}
		
		this.normalizeRetinaScreens();

	}


















	setupCanvas() {

		this.canvas = document.createElement("canvas");
		this.ctx = this.canvas.getContext("2d");

		this.container.appendChild(this.canvas);


		this.updateCanvas();



		window.addEventListener('resize', this.updateCanvas.bind(this));

		window.requestAnimationFrame(this.render);


	}












	setupRender() {

		

	}











	draw() {

		// console.log("frame");

		this.ctx.clearRect(0, 0, this.width, this.height);
		

		for (let i = 0; i < this.spikes.length; i++) {
			const spike = this.spikes[i].value(this.progress, this.noise);

			this.ctx.beginPath();
				this.ctx.roundRect(spike.x, spike.y, spike.width, spike.height, 2);
				this.ctx.fillStyle = spike.color;
         	this.ctx.fill();

		}





	}










	render = () => {

		const timestamp = Date.now();

		if (timestamp - this.lastTimestamp > ( 1000 / this.maxFPS )) {

			this.draw();

			this.lastTimestamp = timestamp;
			this.progress++

		}

		window.requestAnimationFrame(this.render);

	}











}





