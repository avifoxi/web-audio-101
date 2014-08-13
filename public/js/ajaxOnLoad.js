document.addEventListener('DOMContentLoaded', function(){

	var controller = new Controller(new AudioContext(), 'view tbd');
	controller.loadBuffer("/samples/Kit/CyCdh_K3Crash-07.wav");
});

var Controller = function(context, view) {
	this.context = context;
	this.view = view;
}

Controller.prototype.loadBuffer = function(url){
	var request = this.prepRequest(url);
	this.directTraffic2Buffer(request)
	request.send();
	console.log(request);
}

Controller.prototype.prepRequest = function(url) {
	var request = new XMLHttpRequest();
  request.responseType = "arraybuffer";
  request.open("GET", url, true); // Path to Audio File
  return request;
}

Controller.prototype.directTraffic2Buffer = function(request){
	var context = this.context;

	request.onload = function() {
  	context.decodeAudioData(request.response, function(sample) {
    	context.buffer = sample;
	  }, function(){ alert('error loading');});
	}
}



 //  request.onload = function() {
 //  	context.decodeAudioData(request.response, function(theBuffer) {
 //    	buffer = theBuffer;
 //    	playSound(buffer, when);
	//   }, whoops);
	// }