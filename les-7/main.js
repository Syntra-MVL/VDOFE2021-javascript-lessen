const rpsOptions = ['blad', 'steen', 'schaar'];
const rpsContainer = document.getElementById('rps-container');
const rpsMsg = document.getElementById('rps-msg');
const rpsInput = document.getElementById('rps-input');
const rpsBtn = document.getElementById('rps-btn');
const restartBtn = document.getElementById('restart-btn');
const comStartBtn = document.getElementById('com-start-btn');

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
    rpsMsg.textContent = 'You win, AI chose: ' + pcAnswer;
  } else {
    rpsMsg.textContent = 'You lose, AI chose: ' + pcAnswer;
  }

  rpsInput.value = '';
};

const validateInput = function (event) {
  const curVal = event.target.value;
  if (rpsOptions.includes(curVal.toLowerCase())) {
    rpsBtn.disabled = '';
  } else {
    rpsBtn.disabled = 'disabled';
  }
};

const startCompetition = function () {
  rpsContainer.style.display = 'block';
};

rpsBtn.addEventListener('click', rpsGame);
rpsInput.addEventListener('input', validateInput);
comStartBtn.addEventListener('click', startCompetition);
