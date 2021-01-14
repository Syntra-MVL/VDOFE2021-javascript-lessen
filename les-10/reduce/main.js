const anArray = [1, 2, 3, 4, 5, 6];
const anOtherArray = ['a', 'b', 'c'];

function sum(accumulator, val, index, originalArray) {
  console.log({
    accumulator,
    val,
    index,
  });
  return accumulator + val;
}

console.log(anArray.reduce(sum, 0));

Array.prototype.myReduce = function (callback, init) {
  let accumulator = init;

  for (let i = 0; i < this.length; i++) {
    accumulator = callback(accumulator, this[i], i, this);
  }

  return accumulator;
};
