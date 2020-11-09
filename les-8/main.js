const $tryBtn = document.getElementById('try-submit-btn');
const $retryBtn = document.getElementById('winner-submit-btn');
const $tryContainer = document.getElementById('tries-container');
const $winnerMessageContainer = document.getElementById(
  'winner-message-container',
);

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
  const $inputs = document.getElementsByClassName('try-input');

  let guess = [];
  for (let i = 0; i < 5; i++) {
    guess.push(parseInt($inputs[i].value));
  }
  console.log(guess);

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

const playMastermind = function () {
  // const solution = generateSolution();
  //
  // let correctNumberAndPlace = 0;
  // let correctNumber = 0;
  // let numberOfGuesses = 0;
  //
  // while (correctNumberAndPlace < 5 && numberOfGuesses < 3) {
  //   const guess = askGuess();
  //   numberOfGuesses++;
  //   console.log(guess);
  //   correctNumberAndPlace = checkCorrectNumberAndPlace(solution, guess);
  //   correctNumber = checkCorrectNumber(solution, guess, correctNumberAndPlace);
  //   alert(
  //     `Your ${numberOfGuesses}th guess was: ${guess}
  // ${correctNumber} numbers are correct but not in the right spot
  // ${correctNumberAndPlace} numbers are correct and in the right spot`,
  //   );
  // }
  //
  //   if (correctNumberAndPlace === 5) {
  //     alert('Well done!! You guessed the code.');
  //   } else {
  //     alert('You lose!, the code was: ' + solution);
  //   }
};

const initMastermind = function () {
  mastermindState.solution = generateSolution();
  $winnerMessageContainer.classList.add('dont-show');

  $tryContainer.innerHTML = '';
};

const makeGuess = function () {
  const guess = getGuess();
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
    $winnerMessageContainer.firstElementChild.textContent =
      'You won, try again?';
    $winnerMessageContainer.classList.remove('dont-show');
  } else if (mastermindState.guessCount === 3) {
    $winnerMessageContainer.firstElementChild.textContent =
      'You lost, try again?';
    $winnerMessageContainer.classList.remove('dont-show');
  }
};

initMastermind();

$tryBtn.addEventListener('click', makeGuess);
$retryBtn.addEventListener('click', initMastermind);
