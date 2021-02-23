const $testDiv = document.getElementById('test-div');

console.log($testDiv.dataset);

$testDiv.dataset.otherTest = 'other hello';

console.log(typeof $testDiv.dataset.test);
