let data; 
function reqListener() {
	data = this.response;
	let i = 0;
	while (i < data.length) {
		data[i].file = loadImage(data[i].file);
		i = i + 1;
	}
}
function preload() {
	let req = new XMLHttpRequest();
	req.addEventListener('load', reqListener);
	req.open('GET', '/pseudoserver/');
	req.responseType = 'json';
	req.send();
} 

function setup() {
	createCanvas(400, 100000);

	console.log(data);
	let i = 0;
	while (i < data.length) {
		textSize(20);
		text(data[i].name, 50, i * 100 + 50);
		image(data[i].file, 50, i * 100 + 80, 50, 50, 0, 0, 0, 0, CONTAIN);
		i = i + 1;
	}
}
