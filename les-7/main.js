const rpsOptions = ['blad', 'steen', 'schaar'];
const rpsContainer = document.getElementById('rps-container');
const rpsMsg = document.getElementById('rps-msg');
const rpsInput = document.getElementById('rps-input');
const rpsBtn = document.getElementById('rps-btn');
const rpsGameCount = document.getElementById('rps-game-count');
const rpsPlayerScore = document.getElementById('rps-player-score');
const rpsAIScore = document.getElementById('rps-ai-score');
const restartBtn = document.getElementById('restart-btn');

const comContainer = document.getElementById('com-container');
const comStartBtn = document.getElementById('com-start-btn');
const comInput = document.getElementById('com-input');
const comMsg = document.getElementById('com-msg');

let gameCount = 0;
let playerScore = 0;
let aiScore = 0;

console.log(rpsContainer, rpsMsg, rpsInput, rpsBtn, restartBtn);

const randomRPS = function () {
  // array van maken
  const randomRPS = Math.floor(Math.random() * 3); //randomnumber tussen 0 en 2 omdat we floor gebruiken.
  return rpsOptions[randomRPS];
};

const rpsGame = function () {
  let userAnswer = rpsInput.value;
  let pcAnswer = randomRPS();

  if (userAnswer === pcAnswer) {
    rpsMsg.textContent = "It's a tie, try again";
  } else if (
    (userAnswer === 'steen' && pcAnswer === 'blad') ||
    (userAnswer === 'blad' && pcAnswer === 'schaar') ||
    (userAnswer === 'schaar' && pcAnswer === 'steen')
  ) {
    rpsMsg.textContent = 'You lose, AI chose: ' + pcAnswer;
    aiScore++;
    rpsAIScore.textContent = aiScore;
  } else {
    rpsMsg.textContent = 'You win, AI chose: ' + pcAnswer;
    playerScore++;
    rpsPlayerScore.textContent = playerScore;
  }

  rpsInput.value = '';

  if (aiScore * 2 > gameCount) {
    rpsContainer.style.display = 'none';
    comContainer.style.display = 'block';
    comMsg.textContent = 'You lose!!';
  } else if (playerScore * 2 > gameCount) {
    rpsContainer.style.display = 'none';
    comContainer.style.display = 'block';
    comMsg.textContent = 'You win!!';
  } else if (aiScore + playerScore === gameCount) {
    rpsContainer.style.display = 'none';
    comContainer.style.display = 'block';
    comMsg.textContent = "It's a tie, try again";
  }
};

const validateRPSInput = function (event) {
  const curVal = event.target.value;
  if (rpsOptions.includes(curVal.toLowerCase())) {
    rpsBtn.disabled = '';
  } else {
    rpsBtn.disabled = 'disabled';
  }
};

const validateComInput = function (event) {
  const curVal = parseInt(event.target.value);

  if (curVal > 0) {
    comStartBtn.disabled = '';
  } else {
    comStartBtn.disabled = 'disabled';
  }
};

const startCompetition = function () {
  gameCount = parseInt(comInput.value);

  rpsGameCount.textContent = gameCount;
  playerScore = 0;
  rpsPlayerScore.textContent = 0;
  aiScore = 0;
  rpsAIScore.textContent = 0;

  rpsContainer.style.display = 'block';
  comContainer.style.display = 'none';
};

const restartCompetition = function () {
  rpsContainer.style.display = 'none';
  comContainer.style.display = 'block';
  comMsg.textContent = '';
};

rpsBtn.addEventListener('click', rpsGame);
rpsInput.addEventListener('input', validateRPSInput);
comStartBtn.addEventListener('click', startCompetition);
comInput.addEventListener('input', validateComInput);
restartBtn.addEventListener('click', restartCompetition);
