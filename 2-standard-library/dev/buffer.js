// Create
const buffer = Buffer.from('Test');
console.log(buffer.toString());

// Write
const buffer2 = Buffer.alloc(5);
buffer2.write('123456'); // 

console.log(buffer2.toString());