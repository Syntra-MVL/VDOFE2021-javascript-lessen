console.log('Hello World!');

let aTemplateLiteral = `
<p> 
    ik ben tekst
</p>
`;

let aNumber = 65;

let alsoANumber = Infinity;

console.log(alsoANumber - 12);

let alsoAlsoANumber = NaN;

console.log(Infinity / Infinity);

'https://google.com/map/map2/';

console.log(document.childNodes[1].children);

document.childNodes[1].children[1].innerText = 'Hello World!';

function logText(text, text2) {
    console.log(text);
    console.log(text2);
}

logText('Hello Function', 'Hello Again');

// console.log('Hello Function');
// console.log('Hello Again');

function executeFunction(callback) {
    callback('Test1', 'Test2');
}

executeFunction(logText);

// logText('Test1', 'Test2');

// console.log('Test1');
// console.log('Test2');


logText('Bla', 'Bloe');

// console.log('Bla');
// console.log('Bloe');

function executeFunctionAgain(callback) {
    callback('Bla', 'Bloe');
}

executeFunctionAgain(logText);

// logText('Bla', 'Bloe');

function afterSomeTime() {
    console.log('Waiting is over');
}

// setTimeout(afterSomeTime, 5000);

// setInterval(afterSomeTime, 2000);

// let name = prompt('What is your name?');

let name;

function askName() {
    name = prompt('What is your name?');
    console.log(name);
}

setTimeout(askName, 5000);