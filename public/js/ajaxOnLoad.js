document.addEventListener('DOMContentLoaded', function(){

	var controller = new Controller(new AudioContext(), 'view tbd');
	controller.loadBuffer("/samples/Kit/CyCdh_K3Crash-07.wav");


});

var Controller = function(context, view) {
	this.context = context;
	this.view = view;
}

Controller.prototype.loadBuffer = function(url){
	var request = new XMLHttpRequest();
  request.open("GET", url, true); // Path to Audio File
	console.log(request);
}