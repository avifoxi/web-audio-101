// INITIALIZE (hopefully) GLOBAL AUDIO CONTEXT

var context = new AudioContext();

var drumBufferArray = []

var sampleUrls = [ 
	"/samples/Kit/CyCdh_K3Kick-01.wav", 
	"/samples/Kit/CyCdh_K3Snr-01.wav",
	"/samples/Kit/CyCdh_K3ClHat-03.wav",
	"/samples/Kit/CyCdh_K3Crash-07.wav"
	]

// on ready

document.addEventListener('DOMContentLoaded', function(){
	var oscButton = document.getElementById('osc');

	var kickButt = document.getElementById('kick');
	var snareButt = document.getElementById('snare');
	var hihatButt = document.getElementById('hihat');
	var crashButt = document.getElementById('crash');


	oscButton.addEventListener('mouseover', oscillate, false);

	kickButt.addEventListener('click', playKick, false)
	snareButt.addEventListener('click', playSnare, false)
	hihatButt.addEventListener('click', playHat, false)
	crashButt.addEventListener('click', playCrash, false)

	rockNroll(0.25, sampleUrls)

	// loadSamples(sampleRoutes);
});


function oscillate() {

	var gainNode, osc;
	osc = context.createOscillator();
	gainNode = context.createGain();
	osc.connect(gainNode);
	gainNode.connect(context.destination);
	osc.frequency.value = 440;
	osc.start();
	alert('Do You Hear Me??');

	var oscButton = document.getElementById('osc');
	oscButton.addEventListener('mouseleave', dis, false);

	function dis() {
		gainNode.disconnect(context.destination);
	}
}

function playKick() {
	loadSound(0, sampleUrls, 0);
}

function playSnare() {
	loadSound(1, sampleUrls, 0);
}

function playHat() {
	loadSound(2, sampleUrls, 0);
}

function playCrash() {
	loadSound(3, sampleUrls, 0);
}




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


function hi(wazzup){
	console.log(wazzup)
}


// loadSound(index, urls, when)
// indexes: 0=kick, 1=snare, 2=hat, 3=crash

function rockNroll(eighthNote, urls){ 
	
	for (var bar = 0; bar < 2; bar++) {
	  
	  var time = context.currentTime + bar * 8 * eighthNote;
	  // Play the bass (kick) drum on beats 1, 5
	  
	  loadSound(0, urls, time);
	  loadSound(0, urls, (time + 4 * eighthNote) );


	  // Play the snare drum on beats 3, 7
	  loadSound(1, urls, (time + 2 * eighthNote) );
	  loadSound(1, urls, (time + 6 * eighthNote) );

	  loadSound(3, urls, (time + 7 * eighthNote));
	  // Play the hi-hat every eighth note.
	  
	  for (var i = 0; i < 8; ++i) {
	    loadSound(2, urls, (time + i * eighthNote) );
	  }
	}
}






