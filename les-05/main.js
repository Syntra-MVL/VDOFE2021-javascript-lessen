// console.log(document);

// console.log(document.childNodes[1]);

const htmlTag = document.childNodes[1];
const bodyTag = htmlTag.children[1];

// console.log(htmlTag.childNodes);
// console.log(htmlTag.children);

const paragraphs = document.getElementsByClassName('paragraph');
console.log(paragraphs);

const input = document.getElementById('input');
const button = document.getElementById('button');
console.log(input);
console.log(button);

const buttonClicked = function() {
    console.log('button clicked');
    console.log(input.value);

    // h1.textContent = input.value';
}

button.addEventListener('click', buttonClicked);