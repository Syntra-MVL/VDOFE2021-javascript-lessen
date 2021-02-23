let $sumSubmitBtn = document.getElementById('sum-submit-btn');
let $sumResultContainer = document.getElementById('sum-result-container');
let $productSubmitBtn = document.getElementById('product-submit-btn');
let $productResultContainer = document.getElementById(
  'product-result-container',
);
let $numberInputContainer = document.getElementById('input-container');
let $addInputBtn = document.getElementById('add-input-btn');
let $numberCountContainer = document.getElementById('number-count-container');

function sumNumbers() {
  // return the sum value of all the numbers
  const $numberInputs = document.getElementsByClassName('number-input');
  let totalSum = 0;
  for (let i = 0; i < $numberInputs.length; i++) {
    totalSum += parseInt($numberInputs[i].value);
  }

  return totalSum;
}

function printSum(sum) {
  // print the sum value of all the numbers
  $sumResultContainer.textContent = sum;
}

function multiplyNumbers() {
  // return the product of all the numbers
  const $numberInputs = document.getElementsByClassName('number-input');
  let totalProduct = 1;
  for (let i = 0; i < $numberInputs.length; i++) {
    totalProduct *= parseInt($numberInputs[i].value);
  }

  return totalProduct;
}

function printProduct(product) {
  // print the product of all the numbers
  $productResultContainer.textContent = product;
}

function printNumberCount() {
  // get and print the number of input fields
  const $numberInputs = document.getElementsByClassName('number-input');

  $numberCountContainer.textContent = $numberInputs.length;
}

function addNumberInput() {
  //# add a number input
  // do not forget event listeners
  const numberInputMarkup = `<div class="field has-addons number-input-group">
          <div class="control">
            <input
              class="input number-input"
              type="number"
              step="1"
              value="0"
            />
          </div>
          <div class="control">
            <a class="button is-danger delete-number-input">X</a>
          </div>
        </div>`;

  $numberInputContainer.innerHTML += numberInputMarkup;
}

function removeNumberInput(event) {
  //# remove a number input
  // htmlELement.remove()
  console.log(event.target);

  if (event.target.matches('.delete-number-input')) {
    console.log(event.target.parentElement.parentElement);
    console.log(event.target.closest('.number-input-group'));
    const $numberInputGroup = event.target.closest('.number-input-group');
    $numberInputGroup.remove();
  }
}

function doSum() {
  const sum = sumNumbers();
  printSum(sum);
}

function doMultiply() {
  const product = multiplyNumbers();
  printProduct(product);
}

function doBoth() {
  doSum();
  doMultiply();
}

// add event listeners

$sumSubmitBtn.addEventListener('click', doSum);
$productSubmitBtn.addEventListener('click', doMultiply);
$addInputBtn.addEventListener('click', addNumberInput);
$numberInputContainer.addEventListener('click', removeNumberInput);
