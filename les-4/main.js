const promptInt = function (question) {
  let guessString = prompt(question);
  let guessNumber = parseInt(guessString);

  while (Number.isNaN(guessNumber) || guessNumber < 0 || guessNumber > 4) {
    guessString = prompt("Geen geldig nummer. \n" + question);
    guessNumber = parseInt(guessString);
  }

  return guessNumber;
};

const generateSolution = function () {
  let solution = [];

  // for (let i=0; i<5; i++) {
  while (solution.length < 5) {
    const randomNumber = Math.floor(Math.random() * 5);
    solution.push(randomNumber);
  }

  return solution;
};

const askGuess = function () {
  const guess = [];

  // for (let i=0; i<5; i++) {
  while (guess.length < 5) {
    const guessNumber = promptInt("Geef een nummer tussen 0 en 4:");
    // guess[i] = guessNumber;
    guess.push(guessNumber);
  }

  return guess;
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

  // let solCountZero = 0;
  // let guessCountZero = 0;
  // let solCountOne = 0;
  // let guessCountOne = 0;
  // let solCountTwo = 0;
  // let guessCountTwo = 0;
  // let solCountThree = 0;
  // let guessCountThree = 0;
  // let solCountFour = 0;
  // let guessCountFour = 0;

  // for (let i = 0; i < 5; i++) {
  //   if (guess[i] === 0) {
  //     guessCountZero++;
  //   } else if (guess[i] === 1) {
  //     guessCountOne++;
  //   } else if (guess[i] === 2) {
  //     guessCountTwo++;
  //   } else if (guess[i] === 3) {
  //     guessCountThree++;
  //   } else if (guess[i] === 4) {
  //     guessCountFour++;
  //   }

  //   if (solution[i] === 0) {
  //     solCountZero++;
  //   } else if (solution[i] === 1) {
  //     solCountOne++;
  //   } else if (solution[i] === 2) {
  //     solCountTwo++;
  //   } else if (solution[i] === 3) {
  //     solCountThree++;
  //   } else if (solution[i] === 4) {
  //     solCountFour++;
  //   }
  // }

  // correctNumber + Math.min(solCountZero, guessCountZero);
  // correctNumber + Math.min(solCountOne, guessCountOne);
  // correctNumber + Math.min(solCountTwo, guessCountTwo);
  // correctNumber + Math.min(solCountThree, guessCountThree);
  // correctNumber + Math.min(solCountFour, guessCountFour);


  let solCount = [0,0,0,0,0];
  let guessCount = [0,0,0,0,0];

  for (let i=0; i<5; i++) {
    // solCount[i] -> count i in solution array
    // guessCount[i] -> count i in guess array

    for (let j=0; j<5; j++) {
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
  const solution = generateSolution();
  console.log(solution);
  let correctNumberAndPlace = 0;
  let correctNumber = 0;
  let numberOfGuesses = 0;

  while (correctNumberAndPlace < 5 && numberOfGuesses < 3) {
    const guess = askGuess();
    numberOfGuesses++;
    console.log(guess);
    correctNumberAndPlace = checkCorrectNumberAndPlace(solution, guess);
    correctNumber = checkCorrectNumber(solution, guess, correctNumberAndPlace);
    alert(
      `Your ${numberOfGuesses}th guess was: ${guess}
${correctNumber} numbers are correct but not in the right spot
${correctNumberAndPlace} numbers are correct and in the right spot`
    );
  }

  if (correctNumberAndPlace === 5) {
    alert("Well done!! You guessed the code.");
  } else {
    alert("You lose!, the code was: " + solution);
  }
};

playMastermind();
