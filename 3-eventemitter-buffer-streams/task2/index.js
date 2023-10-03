const { WithTime } = require("./WithTime"); 

const withTime = new WithTime();

withTime.on('begin', () => console.log('About to execute'));
withTime.on('end', () => console.log('Done with execute'));

console.log(withTime.rawListeners("end"));

const asyncFunction = async (url) => {
    const response = await fetch(url);

    return response.json();
};

const url = "https://jsonplaceholder.typicode.com/posts/1";
withTime.execute(asyncFunction, url);