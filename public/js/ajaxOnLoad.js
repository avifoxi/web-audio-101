document.addEventListener('DOMContentLoaded', function(){
	
	var context = new AudioContext(); // first the model
	var view = new View(context, document.getElementsByTagName('button')[0]); // view must reference model

	var controller = new Controller(context, view); // model must hold model, AND view... which contains viewmodel. oh observer... 
	
	controller.loadBuffer("/samples/Kit/CyCdh_K3Crash-07.wav");

	controller.view.listenToButt( callBackPlay );

});

var View = function(context, triggerButt) {
	this.context = context;
	this.triggerButt = triggerButt; 
}

View.prototype.listenToButt = function( cb ) {
	this.triggerButt.addEventListener('click', 
		this.context.cb, 
		// controller should be listening for this event - through the view... how do we do this ? 
		false);
}

View.prototype.ctlCallback = function(){

}


var Controller = function(context, view) {
	this.context = context;
	this.view = view;
	this.buffer = 'unloaded buffer, boo hoo'; // this is bad design temporarily - a controller should not be holding this info - probbably some sort of buffer holder object? or can the audio context do this with persistence? 
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

  	context.decodeAudioData(request.response, function(sample) {
    	controller.buffer = sample;
    	console.log(controller.buffer);
    	// on success contains a decoded Audio Buffer. WORD.
	  }, function(){ alert('error loading sounds ');});
	}
}

Controller.prototype.callBackPlay = function(){
	var ctr = this;
	console.log(this);

}


/// IMPLEMENTING OBSERVER PATTERN 

function Event(sender) {
    this._sender = sender;
    this._listeners = [];
}

Event.prototype = {
    attach : function (listener) {
        this._listeners.push(listener);
    },
    notify : function (args) {
        var index;

        for (index = 0; index < this._listeners.length; index += 1) {
            this._listeners[index](this._sender, args);
        }
    }
};










