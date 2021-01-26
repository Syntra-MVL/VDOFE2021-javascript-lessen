const anArray = [1, 2, 3, 4, 5, 6];
const anOtherArray = ['a', 'b', 'c'];

function double(val) {
  return val * 2;
}

function plusFive(val) {
  return val + 5;
}

function capitalize(val) {
  return val.toUpperCase();
}

Array.prototype.myMap = function (callback) {
  const mappedArray = [];

  for (let i = 0; i < this.length; i++) {
    const returnVal = callback(this[i], i, this);
    mappedArray.push(returnVal);
  }

  return mappedArray;
};

console.log(anArray.map(double));
console.log(anArray.myMap(double));

console.log(anOtherArray.map(capitalize));

console.log(anArray.map(double).map(plusFive));
console.log(anArray.map(plusFive).map(double));
