// INITIALIZE (hopefully) GLOBAL AUDIO CONTEXT

var context = new AudioContext();

function loadSound(index, urls, when) {
	var request = new XMLHttpRequest();
  request.open("GET", urls[index], true); // Path to Audio File
  request.responseType = "arraybuffer"; // Read as Binary Data

  request.onload = function() {
  	context.decodeAudioData(request.response, function(theBuffer) {
    	buffer = theBuffer;
    	playSound(buffer, when);
	  }, whoops);
	}

  request.send();
}


function playSound(buffer, when) {
	// hi(buffer);
	var source = context.createBufferSource();
  source.buffer = buffer;
  source.connect(context.destination);
  source.start(context.currentTime + when);
}


function whoops(){
	alert('oh shit');
}
