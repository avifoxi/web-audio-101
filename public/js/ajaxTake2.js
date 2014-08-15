// ATTEMPTING AN MVC STRUCTURE FOR WEB AUDIO API


/// EVENT LINKING UTILITY CLASS FOR IMPLEMENTING OBSERVER PATTERN super coooool... thanks to http://alexatnet.com/articles/model-view-controller-mvc-javascript

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



// MODEL HOLDS THE AUDIO CONTEXT (the web audio api utility) AND DECODED AUDIO DATA

function Model(context) {
	this._context = context;
    this._decodedBuffers = [];
}

Model.prototype = {

    playSound : function() {
        var context = this._context;
        var source = context.createBufferSource();
        source.buffer = this._decodedBuffers[0];
        source.connect(context.destination);
        source.start(0);
    }, 
    prepareSample : function(url) {
      var _this = this;
      var request= new XMLHttpRequest();
      request.open('GET', url, true);
      request.responseType = 'arraybuffer';

      request.onload = function() {
        _this._context.decodeAudioData(request.response, function(buffer) {
              _this._decodedBuffers.push(buffer);
            }, function(){alert('oh shit...')} );
        }
      request.send();
    }


}

/// THE VIEW WILL HOLD THE MODEL IN THIS STRUCTURE - TO MAINTAIN OBSERVER PATTERN. ELEMENTS WILL BE ARRAY - THOUGH ONLY 1 BUTTON IN THIS EXAMPLE

function View(model, elements) {
    this._model = model;
    this._elements = elements;

    this.buttonClicked = new Event(this);

    var _this = this;

    // attach listener to button

    this._elements.button.onclick = function(){
        _this.buttonClicked.notify();
    }

}


/// AND THE CONTROLLER - RESPONDS TO USER ACTIONS, AND INVOKES CHANGES TO MODEL

function Controller(model, view) {
    this._model = model;
    this._view = view;
    var _this = this;

    this._view.buttonClicked.attach(function() {
        _this.playSound();
    })
}

Controller.prototype = {
    playSound : function() {
        this._model.playSound();
    },
    prepareSample : function(url){
        this._model.prepareSample(url);
    }
}


/// AND ON DOCUMENT READY PUT IT ALL TOGETHER

document.addEventListener('DOMContentLoaded', function(){
    
    // first the model
    var model = new Model(new AudioContext() ); 
    
    var button = document.getElementsByTagName('button')[0];
    var view = new View(model, { 'button' : button });
    
    var controller = new Controller(model, view);
    controller.prepareSample("/samples/Kit/CyCdh_K3Crash-07.wav");
    // console.log(controller);

});

