// ASYNC examples
// non-mochajs
// ts-node tests/2/0.ts

// Event loop
console.log('1')
console.log('2')
// This puts command from main loop to callback queue
// this will be called when main loop is empty
setImmediate(() => console.log('3'))
console.log('4')
// Process is not finished until callback queue is empty
setTimeout(() => console.log('5'), 5000)
