var tape= require('blue-tape'),
  bluebird= require('bluebird'),
  laissez= require('..')

tape('basic not resolved', function(t){
	var seq= 0

	var delay1= laissez(function(){
		t.equal(++seq, 2, "delay is called first")
		return bluebird.delay(20).return(42)
	})

	t.equal(++seq, 1, "thennable is wired up")
	return delay1.then(function(val){
		t.equal(++seq, 3, "thennable is last")
		t.equal(val, 42, "return value is correct")
	})
})
