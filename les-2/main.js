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

const guessNumber = function(maxGuesses, maxRandomNumber) {
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
        return true;
    } else {
        alert('Jammer, het getal was ' + randomNumber);
        return false;
    }
}

const guessNumberCompetition = function() {
    const name = prompt('What is your name?');
    const numberOfGames = promptInt('How many games will you play?');
    const maxRandomNumber = promptInt('Max random number:');
    const maxGuesses = promptInt('How many guesses can you make?');

    const $playerName = document.getElementById('player-name');
    const $playerScore = document.getElementById('player-score');
    const $aiScore = document.getElementById('ai-score');
    const $message = document.getElementById('message');

    $playerName.innerText = name;

    let playerScore = 0;
    let aiScore = 0;
    let gameOver = false;
    
    while (!gameOver) {
        const playerWins = guessNumber(maxGuesses, maxRandomNumber);
        if (playerWins) {
            playerScore++;
        } else {
            aiScore++;
        }

        // alert(`AI: ${aiScore} | ${name}: ${playerScore}`);

        $aiScore.innerText = aiScore;
        $playerScore.innerText = playerScore;

        gameOver = playerScore * 2 > numberOfGames || aiScore * 2 > numberOfGames;
    }

    let message;

    if (playerScore === aiScore) {
        message = 'TIE';
    } else if (playerScore < aiScore) {
        message = 'AI rules!!';
    } else {
        message = name + ' won!';
    }

    $message.innerText = message;
}

guessNumberCompetition();