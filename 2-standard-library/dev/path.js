const path = require('path');

console.log('=============<PATH>===============');

// baseName
let baseName = path.basename('public/page.html');
console.log(baseName);

let absolutePath = 'C:\\temp\\myfile.html';
console.log('posix: ', path.posix.basename(absolutePath)); // 'C:\temp\myfile.html'
console.log('Win: ', path.basename(absolutePath)); // 'myfile.html'

// dirname
let dirName = path.dirname('C://some/folder/public/index.html');
console.log(dirName);

// extname
const extension = path.extname('public/log.jk');
console.log(extension);

// format

const formattedPath = path.format({
    dir: 'some-dir',
    base: 'name.js',
});

console.log(formattedPath);

// isAbsolutePath

console.log(path.isAbsolute('')); // false
console.log('node/js', path.isAbsolute('node/js')); // false
console.log('/node/js', path.isAbsolute('/node/js/')); // true
console.log('\\node\\js\\', path.isAbsolute('\\node\\js\\')); // true
console.log('C://', path.isAbsolute('C://')); // true
console.log('https://some', path.isAbsolute('https://some')); // false

// join

console.log(path.join('/public', 'some', 'index.html')); // \public\some\index.html
