let promise = new Promise(function (resolve, reject) {
  const rejectTimeout = setTimeout(function () {
    reject(new Error('failed'));
  }, Math.random() * 2000);

  const resolveTimeout = setTimeout(function () {
    resolve('success');
  }, Math.random() * 2000);
});

// promise.then(
//   function (val) {
//     console.log(val);
//   },
//   function (error) {
//     console.error(error);
//   },
// );

promise
  .finally(function () {
    console.log('promise completed');
  })
  .then(function (val) {
    console.log(val);
    return new Promise(function (resolve) {
      setTimeout(function () {
        resolve('newVal');
      }, 1000);
    });
  })
  .catch(function (error) {
    console.error('Something else did not work');
  })
  .then(function (val) {
    console.log(val);
    return 'otherVal';
  })
  .then(function (val) {
    blabla();
  });

document.getElementById('test-btn').addEventListener('click', function () {
  console.log(promise);
});

// const exSomething = function (callback) {
//   function resolve(val) {
//     console.log('resolved ' + val);
//   }
//
//   function reject(val) {
//     console.log('rejected ' + val);
//   }
//
//   callback(resolve, reject);
// };
//
// exSomething(function (resolve, reject) {
//   let name = 'Lisa';
//
//   if (name === 'Korneel') {
//     resolve(name);
//   } else {
//     reject(name);
//   }
// });
