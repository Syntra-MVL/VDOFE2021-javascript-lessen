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

const guessNumber = function() {
    const randomNumber = Math.floor(Math.random() * 11);

    let guess = prompt('Raden:');
    console.log(guess);

    while (guess != randomNumber) {
        guess = prompt('Raden:');
    }

    alert('Goed zo!');
}

guessNumber();
