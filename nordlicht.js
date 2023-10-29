

class Nordlicht {




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

		this.setup()

	}




	updateCanvas() {

		this.width = parseInt(window.getComputedStyle(this.container).getPropertyValue('width'));
		this.height = parseInt(window.getComputedStyle(this.container).getPropertyValue('height'));

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




	setup() {

		this.updateCanvas();

		this.canvas = document.createElement("canvas");
		this.ctx = this.canvas.getContext("2d");

		this.container.appendChild(this.canvas);


		window.addEventListener('resize', this.updateCanvas);

		this.normalizeRetinaScreens();

		window.requestAnimationFrame(this.render);

	}




	draw() {
		console.log(this.progress);
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


