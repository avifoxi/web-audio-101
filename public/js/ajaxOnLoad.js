document.addEventListener('DOMContentLoaded', function(){
	var view = new View(document.getElementsByTagName('button')[0]);
	var controller = new Controller(new AudioContext(), view);
	controller.loadBuffer("/samples/Kit/CyCdh_K3Crash-07.wav");

	controller.view.listenToButt();

});

var View = function(triggerButt) {
	this.triggerButt = triggerButt;
}

View.prototype.listenToButt = function() {
	this.triggerButt.addEventListener('click', 
		function(){console.log('listenign')}, 
		// controller should be listening for this event - through the view... how do we do this ? 
		false);
}


var Controller = function(context, view) {
	this.context = context;
	this.view = view;
	this.buffer = 'unloaded buffer, boo hoo';
}

Controller.prototype.loadBuffer = function(url){
	var request = this.prepRequest(url);
	this.directTraffic2Buffer(request)
	request.send();
	// console.log(this.context.buffer);
}

Controller.prototype.prepRequest = function(url) {
	var request = new XMLHttpRequest();
  request.responseType = "arraybuffer";
  request.open("GET", url, true); // Path to Audio File
  return request;
}

Controller.prototype.directTraffic2Buffer = function(request){
	var context = this.context;
	var controller = this;

	request.onload = function() {
		// console.log(context);
		// console.log(request);
		// console.log(controller.buffer); // before the request
  	context.decodeAudioData(request.response, function(sample) {
    	controller.buffer = sample;
    	// console.log(controller.buffer); // on success contains a decoded Audio Buffer. WORD.
	  }, function(){ alert('error loading');});
	}
}



 //  request.onload = function() {
 //  	context.decodeAudioData(request.response, function(theBuffer) {
 //    	buffer = theBuffer;
 //    	playSound(buffer, when);
	//   }, whoops);
	// }