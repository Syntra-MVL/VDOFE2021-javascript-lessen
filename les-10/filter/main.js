const anArray = [1, 2, 3, 4, 5, 6];
const anOtherArray = ['a', 'b', 'c'];

function double(val) {
  return val * 2;
}

function isEven(val) {
  return val % 2 === 0;
}

Array.prototype.myFilter = function (callback) {
  const mappedArray = [];

  for (let i = 0; i < this.length; i++) {
    const returnVal = callback(this[i], i, this);
    if (returnVal) {
      mappedArray.push(this[i]);
    }
  }

  return mappedArray;
};

console.log(anArray.filter(isEven));
console.log(anArray.myFilter(isEven));

console.log(anArray.filter(isEven).map(double));
