# Laissez-Bird

A library for lazy promises. Laissez looks like a regular promise, but under the hood it has a factory method (passed via constructor) that is only evaluated the first time someone binds a handler to the promise.

Useful for creating possible things that someone *might* need.

# Use - Then

```
var laissez = require('laissez-bird')
var wait2 = laissez(function(){
	return bluebird.delay(20)
})

// ... time passes (& no one else depends on wait2) ...

console.log('going to fire in two seconds')
wait2.then(function(){
	console.log('two seconds have ellapsed')
})
```

# Use - Thenever 

In addition to the normal Promises A+ implementation, Laissez-Bird promises present a `.thenever` method which can be used like `.then` except it will not trigger the underlying factory.
