/*    SETTINGS    */


let colour = "rgb(32,223,133)"
let feather = 15;

let rotation = 0;

let spikeWidth = 8;
let spikeDistance = spikeWidth;

let blur = 12;

let perspective = 0;
let focalLength = 35;

let fps = 40;





/*    ALL GLOBAL VARIABLES  */

const canvas = document.createElement("canvas");
const aurora = document.getElementById("aurora");
const ctx = canvas.getContext("2d");

let width = parseInt(window.getComputedStyle(document.getElementById('aurora')).getPropertyValue('width'));
let height = parseInt(window.getComputedStyle(document.getElementById('aurora')).getPropertyValue('height'));

let progress = 0;
let lastTimestamp = 0;







function s(x, cx, sp) {

    sp *= 0.0001
    x = x + (perspective * x - perspective)*3;
    let result = 1;

    for (let i = 0; i < cx; i++) {
        result += (Math.sin(0.8 / cx * i * (x * 0.4 + (1 / cx * i * -3 * (-1 * i)) * progress * sp)) + 1) / 2;
    }

    result += (Math.sin(0.05 * x + progress * sp * 2) + 1) * 5;

    return result / (cx + 3)
}













function setup(width, height) {

    aurora.innerHTML = "";

    updateSpikes();

    aurora.appendChild(canvas);

    const dpi = window.devicePixelRatio;

    // No idea why but you have to set CSS size as well otherwise the retina display has a bad time
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";

    // Setting the size of the canvas
    canvas.width = width * dpi;
    canvas.height = height * dpi;

    // Normalizing the canvas to use device pixels and not the 2x retina pixels for the coordination system
    ctx.scale(dpi, dpi);

    // Setting styles for the container object
    aurora.style.transform = "translate(-50%,-50%)";
    aurora.style.overflow = "hidden";
    aurora.style.marginTop = "50vh";
    aurora.style.marginLeft = "50%";



    window.requestAnimationFrame(render);

}


function updateSpikes() {
    spikeCount = Math.floor(width / spikeDistance);
}














// Render the Aurora Spikes (It is inverted so think upside down)
function render(timestamp) {

    progress++

    spikeDistance = spikeWidth - (Math.sqrt(rotation * rotation) / 90 * spikeWidth) + 2;
    aurora.style.filter = "blur(" + blur + "px)";

    if (timestamp - lastTimestamp > (1000 / fps)) {

        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < spikeCount; i++) {

            let y = height - s(i, 12, 4) * 100 -100;

            let spikeHeight = (s(i*i, 2, 30) * 50 + s(i,10, 15) * 250) + ((i - spikeCount * 0.5) / (spikeCount * 0.5)) * rotation * -3;


            // Opacity modifiers
            let opacity = Math.min(Math.max(((Math.sqrt(Math.pow(i - ((spikeCount - (spikeCount % 2)) / 2), 2)) * -1 + ((spikeCount - (spikeCount % 2 - 1)) / 2)) / (Math.round(spikeCount / 2) * feather / 100)), 0), 1);
            opacity *= ((s(i*i, 10, 25) * 0.6)) * 0.3 + (s(i, 12, 16)-0.9)  * 0.5 + s(progress * 0.001, 12, 5) * 0.1;
            //opacity *= (( i / spikeCount ));
            opacity = Math.min(Math.max(opacity, 0), 1);

            // Draw Spikes
            ctx.beginPath();
            const grd = ctx.createLinearGradient(0, y, 0, y - spikeHeight);
            grd.addColorStop(0, transformColor(colour, 1));
            grd.addColorStop(1, transformColor(colour, 0));


            ctx.fillStyle = grd;
            ctx.globalAlpha = opacity;

            ctx.roundRect(spikeDistance * i + (width - spikeDistance * spikeCount) / 2, y, spikeDistance, -spikeHeight, spikeDistance / 2);
            ctx.fill();


        }

        lastTimestamp = timestamp;

    }

    anim = window.requestAnimationFrame(render);

}


















// Transform rgb (c) to rgba with variable opacity inputs (o)
function transformColor(c, o) {
    c = (c.slice(0, 3) + "a" + c.slice(3)).substring(0, c.length) + "," + o + ")";
    return c
}



/*
var resizeObserver = new ResizeObserver(entries => {
    for (let entry of entries) {
        const element = entry.contentRect;
        generateSpikes(element.width, element.height)
    }
});

resizeObserver.observe(aurora);
*/



setup(width, height)


const pane = new Tweakpane.Pane();

const PARAMS = {
    Feather: 15,
    Perspective: 0,
    Rotation: 0,
    Blur: 12,
    theme: 'dark',
    Color: {r: 32, g: 223, b: 133}
  };
  
// Feather
  pane.addInput(PARAMS, 'Feather', {min: 0, max: 100, step: 1}).on('change', (ev) => {feather = ev.value;});
  pane.addInput(PARAMS, 'Perspective', {min: 0, max: 100, step: 1}).on('change', (ev) => {perspective = ev.value;});
  pane.addInput(PARAMS, 'Rotation', {min: -90, max: 90, step: 1}).on('change', (ev) => {rotation = ev.value; updateSpikes()});
  pane.addInput(PARAMS, 'Blur', {min: 0, max: 20, step: 1}).on('change', (ev) => {blur = ev.value;});
  pane.addInput(PARAMS, 'Color').on('change', (ev) => {colour = "rgb(" + ev.value.r + "," + ev.value.g + "," + ev.value.b + ")";});



























