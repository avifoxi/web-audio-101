var sampleUrls = [ 
	"/samples/Kit/CyCdh_K3Kick-01.wav", 
	"/samples/Kit/CyCdh_K3Snr-01.wav",
	"/samples/Kit/CyCdh_K3ClHat-03.wav",
	"/samples/Kit/CyCdh_K3Crash-07.wav"
	]



document.addEventListener('DOMContentLoaded', function(){

	console.log("we're listening");


	$('#machine1').submit(function( event ) {
	  event.preventDefault();
	  var bpm = 60 / ( $('#bpm')[0].value );
	  var kicksteps = $('.kickstep');
	  var snaresteps = $('.snarestep');
	  var hatsteps = $('.hatstep');
		var crashsteps = $('.crashstep');

	  console.log(crashsteps);
	  // console.log(snaresteps);

	  for (var i=0; i < kicksteps.length; i++){
	  	var beat = i + 1;
	  	var time = context.currentTime + (beat * bpm);

	  	if(kicksteps[i].checked){
	  		loadSound(0, sampleUrls, time);
	  	} 
	  	if (snaresteps[i].checked) {
	  		loadSound(1, sampleUrls, time);
	  	} 
	  	if (hatsteps[i].checked) {
	  		loadSound(2, sampleUrls, time);
	  	} 
	  	if (crashsteps[i].checked){
	  		loadSound(3, sampleUrls, time);
	  	}
	  };


	  // rockNroll( (60/bpm), sampleUrls )
	});
});