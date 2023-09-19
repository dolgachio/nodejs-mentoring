// console
console.log("This is the outer level");
console.group("First group");
console.log("In the first group");
console.groupEnd("Second group");

const doSomething = () => console.log('test');

const measureDoingSomething = () => {
  console.time('doSomething()');
  // do something, and measure the time it takes
  doSomething();
  console.timeEnd('doSomething()');
};

measureDoingSomething();
