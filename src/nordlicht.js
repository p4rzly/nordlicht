

import { createNoise2D } from 'simplex-noise';
import { Pane } from 'tweakpane';









class Spike {

	constructor(index) {
		this.index = index;
	}


	value (progress, noise, params) {
		const obj = {
			x: this.index * 5,
			y: noise(this.index / 1000 * params.frequency + progress / 1000 * params.speed, progress / 1000 * params.variance) * params.size + 400,
			width: 5,
			height: 20,
			color: "rgb(" + params.color.r + "," + params.color.g + "," + params.color.b + ")",
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

		this.setupCanvas();






		// Tweakpane for Dev


		const pane = new Pane();



		const PARAMS = {
			frequency: 3,
			speed: 3,
			variance: 3,
			size: 30,
			theme: 'dark',
			color: {r: 32, g: 223, b: 133}
		};


		pane.addBinding(PARAMS, 'frequency', {min: 0.1, max: 15, step: 0.1});
		pane.addBinding(PARAMS, 'speed', {min: 0.1, max: 15, step: 0.1});
		pane.addBinding(PARAMS, 'variance', {min: 0.1, max: 15, step: 0.1});
		pane.addBinding(PARAMS, 'size', {min: 1, max: 50, step: 1});
		pane.addBinding(PARAMS, 'color');

		pane.on('change', (ev) => {
  			this.params = PARAMS;
		});

		this.params = PARAMS;

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
			const spike = this.spikes[i].value(this.progress, this.noise, this.params);

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






















