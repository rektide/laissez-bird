var Bluebird= require('bluebird'),
  util= require('util')

function Promise(factory){
	this.factory= factory
	var defer = this.defer= Bluebird.defer()
	Promise._super.call(this, function(resolve, reject){
		defer.then(function(val){
			resolve(val)
		}, function(err){
			reject(err)
		})
	})
}
util.inherits(Promise, Bluebird)

Promise.prototype._then = (function _then(didFulfill, didReject, didProgress, received, internalDate){
	if(this.factory){
		// run the factory
		var underlying= factory()
		this.factory= null

		// set our own value
		if(underlying instanceof Error) // it's bad
			this.defer.reject(underlying)
		else // simple case
			this.defer.resolve(underlying)

		// call any thenevers
		var len = this.thenevers.length
		while(i > 0){
			this.defer.then.apply(this.defer, this.thenevers[--i])
		}
	}
	return Bluebird.prototype._then.call(this, didFulfill, didReject, didProgress, received, internalDate)
})

Promise.prototype.thenever= (function thenever(didFulfil, didReject, didProgress){
	if(this.factory){
		var args= Array.prototype.slice(arguments, 0)
		if(this.thenevers)
			this.thenevers.push(args)
		else
			this.thenevers= [args]
	}else
		this.defer.then(didFulfil, didReject, didProgress)
})
