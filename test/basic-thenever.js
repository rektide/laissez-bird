var tape= require('blue-tape'),
  bluebird= require('bluebird'),
  laissez= require('..')

tape('basic not resolved', function(t){
	var seq= 0

	var delay1= laissez(function(){
		t.fail('factory is not called')
		return bluebird.delay(75).return(42)
	})

	return delay1.thenever(function(val){
		t.fail('delay is never successful')
	  })
	  .timeout(15)
	  .catch(bluebird.TimeoutError, function(){
		t.ok('delay times out')
	  })
})
