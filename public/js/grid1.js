document.addEventListener('DOMContentLoaded', function(){

	console.log("we're listening");


	$('#machine1').submit(function( event ) {
	  event.preventDefault();
	  var bpm = 60 / ( $('#bpm')[0].value );
	  console.log( bpm  );

	  var steps = $('.step');
	  console.log(steps);

	  for (var i=0; i < steps.length; i++){
	  	console.log(steps[i].checked)
	  }


	  // rockNroll( (60/bpm), sampleUrls )
	});
});