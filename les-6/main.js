let testElement = document.getElementById('test');
let testInput = document.getElementById('test-input');
let testButton = document.getElementById('test-button');
let parElements = document.getElementsByClassName('par');
// document.getElementsByTagName('div');
// document.getElementsByName('email');
// document.querySelector('div .test');
// document.querySelectorAll('div .test'');

console.log(testElement);
console.log(parElements);

console.log(testElement.ariaLabel);

parElements[0].textContent = '<div>test</div>';
parElements[1].innerHTML = '<div>test</div>';

console.log(testInput.value);

const btnClicked = function() {
    console.log(testInput.value);
}

testButton.addEventListener('click', btnClicked);