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
    const intVal = parseInt($numberInputs[i].value);
    if (!isNaN(intVal)) {
      totalSum += intVal;
    }
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
    const intVal = parseInt($numberInputs[i].value);
    if (!isNaN(intVal)) {
      totalProduct *= intVal;
    }
  }

  return totalProduct;
}

function printProduct(product) {
  // print the product of all the numbers
  $productResultContainer.textContent = product;
}

function getNumberInputCount() {
  return document.getElementsByClassName('number-input').length;
}

function printNumberCount() {
  $numberCountContainer.textContent = getNumberInputCount();
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

  $numberInputContainer.insertAdjacentHTML('beforeend', numberInputMarkup);
  printNumberCount();
  doBoth();
}

function removeNumberInput(event) {
  console.log(event.target);
  if (getNumberInputCount() > 2 && event.target.matches('.delete-number-input')) {
    console.log(event.target.parentElement.parentElement);
    console.log(event.target.closest('.number-input-group'));
    const $numberInputGroup = event.target.closest('.number-input-group');
    $numberInputGroup.remove();
    printNumberCount();
    doBoth();
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

printNumberCount();

// add event listeners
$sumSubmitBtn.addEventListener('click', doSum);
$productSubmitBtn.addEventListener('click', doMultiply);
$addInputBtn.addEventListener('click', addNumberInput);
$numberInputContainer.addEventListener('input', doBoth);
$numberInputContainer.addEventListener('click', removeNumberInput);
