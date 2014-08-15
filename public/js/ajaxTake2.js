document.addEventListener('DOMContentLoaded', function(){
	
	var model = new Model(new AudioContext() ); // first the model
	console.log(context);

});


var Model = function(context) {
	this.context = context;
}



/// IMPLEMENTING OBSERVER PATTERN - thanks to 

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