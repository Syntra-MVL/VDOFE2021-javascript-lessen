const guessInput = document.getElementById('guess-input');
const guessBtn = document.getElementById('guess-btn');
const guessMessage = document.getElementById('guess-msg');
const guessCountElement = document.getElementById('guess-count');
const restartBtn = document.getElementById('restart-btn');
const playerScoreElement = document.getElementById('player-score');
const aiScoreElement = document.getElementById('ai-score');

const generateRandomNumber = function(maxRandomNumber) {
    return Math.floor(Math.random() * (maxRandomNumber + 1));
}

const compareGuess = function() {
    if (guess === randomNumber) {
        guessMessage.textContent = 'Well done';
        playerScore++;
        playerScoreElement.textContent = playerScore;
        guessBtn.disabled = 'disabled';
    } else if (guessCount === 5) {
        guessMessage.textContent = 'You lost';
        aiScore++;
        aiScoreElement.textContent = aiScore;
        guessBtn.disabled = 'disabled';
    } else {
        guessMessage.textContent = 'Try again';
    }
}

let playerScore = 0;
let aiScore = 0;
let guessCount = 0;
let randomNumber = generateRandomNumber(5);
let guess = -1;

const guessBtnClicked = function() {
    guess = parseInt(guessInput.value);
    guessCount++;
    guessCountElement.textContent = guessCount;

    compareGuess();
}

const restartBtnClicked = function() {
    // guessCount -> 0
    guessCount = 0;
    guessCountElement.textContent = guessCount;
    // new randomNumber
    randomNumber = generateRandomNumber(5);
    // input.value -> empty
    guessInput.value = '';
    // guessMessage -> empty
    guessMessage.textContent = '';
    // guessBtn -> enabled
    guessBtn.disabled = '';
}

guessBtn.addEventListener('click', guessBtnClicked);
restartBtn.addEventListener('click', restartBtnClicked);
