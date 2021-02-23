const $tryBtn = document.getElementById('try-submit-btn');
const $retryBtn = document.getElementById('winner-submit-btn');
const $tryContainer = document.getElementById('tries-container');
const $winnerMessageContainer = document.getElementById(
  'winner-message-container',
);
const $solutionContainer = document.getElementById('solution-container');
const $inputs = document.getElementsByClassName('try-input');

const mastermindState = {
  solution: null,
  guessCount: 0,
};

const generateSolution = function () {
  const $solutionOptions = document.getElementsByClassName('solution-option');
  let solution = [];

  for (let i = 0; i < 5; i++) {
    const randomNumber = Math.floor(Math.random() * 5);
    solution.push(randomNumber);

    $solutionOptions[i].textContent = randomNumber;
  }

  return solution;
};

const getGuess = function () {
  let guess = [];
  for (let i = 0; i < 5; i++) {
    const inputVal = parseInt($inputs[i].value);

    if (isNaN(inputVal) || inputVal < 0 || inputVal > 4) {
      return false;
    }

    guess.push(inputVal);
  }

  return guess;
};

const writeGuess = function (guess, correctNumberAndPlace, correctNumber) {
  const guessHTML = `<div class="try">
          <div class="try-option-container">
            <div class="try-option">${guess[0]}</div>
            <div class="try-option">${guess[1]}</div>
            <div class="try-option">${guess[2]}</div>
            <div class="try-option">${guess[3]}</div>
            <div class="try-option">${guess[4]}</div>
          </div>
          <p>Juiste nummer: <span class="correct-color">${correctNumber}</span></p>
          <p>
            Waarvan op de juiste plaats: <span class="correct-place">${correctNumberAndPlace}</span>
          </p>
        </div>`;

  $tryContainer.innerHTML += guessHTML;
};

const checkCorrectNumberAndPlace = function (solution, guess) {
  let correctNumberAndPlace = 0;

  for (let i = 0; i < 5; i++) {
    if (solution[i] === guess[i]) {
      correctNumberAndPlace++;
    }
  }

  return correctNumberAndPlace;
};

const checkCorrectNumber = function (solution, guess, correctNumberAndPlace) {
  let correctNumber = 0;

  let solCount = [0, 0, 0, 0, 0];
  let guessCount = [0, 0, 0, 0, 0];

  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if (guess[j] === i) {
        guessCount[i]++;
      }

      if (solution[j] === i) {
        solCount[i]++;
      }
    }

    correctNumber += Math.min(solCount[i], guessCount[i]);
  }

  return correctNumber - correctNumberAndPlace;
};

const endGame = function (message) {
  $winnerMessageContainer.firstElementChild.textContent = message;
  $winnerMessageContainer.classList.remove('dont-show');
  $solutionContainer.classList.remove('hidden');
  $tryBtn.disabled = 'disabled';
};

const initMastermind = function () {
  mastermindState.solution = generateSolution();
  mastermindState.guessCount = 0;
  $winnerMessageContainer.classList.add('dont-show');
  $solutionContainer.classList.add('hidden');
  $tryBtn.disabled = '';

  for (let i = 0; i < 5; i++) {
    $inputs[i].value = '';
  }

  $tryContainer.innerHTML = '';
};

const makeGuess = function () {
  const guess = getGuess();

  if (guess === false) {
    $tryBtn.textContent = 'Incorrect input, try again';
    return;
  } else {
    $tryBtn.textContent = 'Try';
  }

  const correctNumberAndPlace = checkCorrectNumberAndPlace(
    mastermindState.solution,
    guess,
  );
  const correctNumber = checkCorrectNumber(
    mastermindState.solution,
    guess,
    correctNumberAndPlace,
  );

  mastermindState.guessCount++;

  writeGuess(guess, correctNumberAndPlace, correctNumber);

  if (correctNumberAndPlace === 5) {
    endGame('You won, try again?');
  } else if (mastermindState.guessCount === 3) {
    endGame('You lost, try again?');
  }
};

initMastermind();

$tryBtn.addEventListener('click', makeGuess);
$retryBtn.addEventListener('click', initMastermind);
