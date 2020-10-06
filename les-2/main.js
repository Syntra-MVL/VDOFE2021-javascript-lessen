console.log('Ik werk');

const printNumbersUntil = function(endNumber) {
    for (let i=0; i<=endNumber; i++) {
        console.log(i);
    }

    // let i = 0;
    // while(i<=endNumber) {
    //     console.log(i);
    //     i++;
    // }
}

// printNumbersUntil(8);

const printNumbersFromUntil = function(startNumber, endNumber) {
    for (let i=startNumber; i<=endNumber; i++) {
        console.log(i);
    }
}

// printNumbersFromUntil(4,12);

const printTablesOf = function(endNumber, multiplier) {
    for (let i=0; i<=endNumber; i++) {
        console.log(i*multiplier);
    }
}

// printTablesOf(10, 4);

// prompt();
// alert('Goed gedaan, je hebt het geraden');

// console.log(Math.floor(Math.random()*11));

const promptInt = function(question) {
    let guessString = prompt(question);
    let guessNumber = parseInt(guessString);

    while (Number.isNaN(guessNumber)) {
        guessString = prompt('Geen geldig nummer. \n' + question);
        guessNumber = parseInt(guessString);
    }

    return guessNumber;
}

const guessNumber = function(maxGuesses) {
    const maxRandomNumber = promptInt('Max random number:');
    const randomNumber = Math.floor(Math.random() * (maxRandomNumber + 1));
    let questionGuess = 'Raad een nummer tussen 0 en ' + maxRandomNumber + ':';
    let guessNumber = promptInt(questionGuess);
    let guessCount = 1;

    while (guessNumber !== randomNumber && guessCount < maxGuesses) {
        guessNumber = promptInt(questionGuess);
        guessCount++;
    }

    if (guessNumber === randomNumber) {
        alert('Goed zo!');
    } else {
        alert('Jammer, het getal was ' + randomNumber);
    }
}

guessNumber(5);

