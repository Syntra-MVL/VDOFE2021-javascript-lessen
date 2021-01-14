const anArray = [1, 2, 3, 4, 5, 6];
const anOtherArray = ['a', 'b', 'c'];

function logVal(val, index, originalArray) {
  console.log(val);
  console.log(index);
  console.log(originalArray);
}

function logDouble(val) {
  console.log(val * 2);
}

// anArray.forEach(function(val) {
//
// });

// anArray.forEach((val) => {
//
// });

// anOtherArray.forEach(logVal);

Array.prototype.myForEach = function (callback) {
  for (let i = 0; i < this.length; i++) {
    callback(this[i], i, this);
  }
};

console.log('myForEach');
// anOtherArray.myForEach(logVal);
console.log('forEach');
// anOtherArray.forEach(logVal);

anArray.forEach(logDouble);
