const promptQuestion = function () {
  let bladSteenSchaar = prompt('Kies: blad? steen? schaar?');
  let rightAnswer = checkCorrectAnswer(bladSteenSchaar);
  while (!rightAnswer) {
    bladSteenSchaar = prompt(
      'Geen geldig antwoord. Kies: Blad? Steen? Schaar?',
    );
    rightAnswer = checkCorrectAnswer(bladSteenSchaar);
  }
  return bladSteenSchaar;
};

const checkCorrectAnswer = function (answer) {
  let lowerAnswer = answer.toLowerCase();
  return (
    lowerAnswer === 'blad' ||
    lowerAnswer === 'schaar' ||
    lowerAnswer === 'steen'
  );
};

const rockPaperScissors = function () {
  const rockPS = ['blad', 'steen', 'schaar']; // array van maken
  const randomRPS = Math.floor(Math.random() * 3); //randomnumber tussen 0 en 2 omdat we floor gebruiken.
  return rockPS[randomRPS];
};

const promptInt = function (question) {
  let guessString = prompt(question);
  let guessNumber = parseInt(guessString);
  while (Number.isNaN(guessNumber)) {
    guessString = prompt('Geen geldig nummer. \n' + question);
    guessNumber = parseInt(guessString);
  }
  return guessNumber;
};

const theGame = function () {
  let userAnswer = promptQuestion();
  let pcAnswer = rockPaperScissors();
  let userWins = true;
  while (userAnswer === pcAnswer) {
    alert('Same answer');
    userAnswer = promptQuestion();
    pcAnswer = rockPaperScissors();
  }
  if (
    (userAnswer === 'steen' && pcAnswer === 'blad') ||
    (userAnswer === 'blad' && pcAnswer === 'schaar') ||
    (userAnswer === 'schaar' && pcAnswer === 'steen')
  ) {
    userWins = false;
  }
  if (userWins) {
    alert('You win, AI chose: ' + pcAnswer);
  } else {
    alert('You lose, AI chose: ' + pcAnswer);
  }
  return userWins;
};

const theCompetition = function () {
  const userName = prompt('What is your name?'); //geen spatie na prompt
  const manyRounds = promptInt('How many rounds do you want to play?');
  let userScore = 0;
  let programScore = 0;
  let gameOver = false;

  while (!gameOver) {
    let playerWins = theGame();
    if (playerWins) {
      userScore++;
    } else {
      programScore++;
    }
    alert(`Score: ${userName}: ${userScore} vs AI: ${programScore}`);
    gameOver =
      userScore * 2 > manyRounds ||
      programScore * 2 > manyRounds ||
      programScore + userScore === manyRounds;
  }
  if (userScore === programScore) {
    alert("It's a tie");
  } else if (userScore > programScore) {
    alert(`${userName} wins.`);
  } else {
    alert('AI wins');
  }
};
theCompetition();
