const randomWords = [
  'condition',
  'bottom',
  'lineage',
  'trip',
  'reporter',
  'paper',
  'colorful',
  'agent',
  'justify',
  'torture',
  'cap',
  'earthflax',
  'payment',
  'research',
  'picture',
  'garage',
  'honor',
  'memorial',
  'planet',
  'biography',
  'profound',
  'rumor',
  'gear',
  'bedroom',
  'orthodox',
  'penalty',
  'grief',
  'promote',
  'roof',
  'suite',
  'moving',
  'killer',
  'museum',
  'essay',
  'fever',
  'dignity',
  'shadow',
  'enjoy',
  'kill',
  'shy',
  'counter',
  'pawn',
  'button',
  'bullet',
  'skin',
  'rate',
  'shop',
  'consider',
  'other',
  'prospect',
];

const $letterContainer = document.getElementById('letter-container');
const $hangManImage = document.getElementById('image');
const $solutionContainer = document.getElementById('solution-container');
const $winLoseContainer = document.getElementById('win-lose-container');

const gameState = {
  word: [],
  hangman: 1,
  lettersFound: 0,
  won: false,
  lost: false,
};

function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * randomWords.length);
  return randomWords[randomIndex].split('');
}

function printSolutionLetters(word) {
  let solutionLettersHTML = '';

  for (let i = 0; i < word.length; i++) {
    solutionLettersHTML += '<div class="solution-letter"></div>';
  }

  $solutionContainer.innerHTML = solutionLettersHTML;
}

function clearLetterClasses() {
  const $letters = $letterContainer.children;

  for (let i = 0; i < $letters.length; i++) {
    $letters[i].classList.remove('success', 'failed');
  }
}

function updateHangmanImage(imageNumber) {
  $hangManImage.src = 'images/hangman0' + imageNumber + '.png';
}

function resetGameState() {
  gameState.hangman = 1;
  gameState.lettersFound = 0;
  gameState.won = false;
  gameState.lost = false;
  gameState.word = getRandomWord();
}

function reset() {
  resetGameState();
  printSolutionLetters(gameState.word);
  clearLetterClasses();
  updateHangmanImage(gameState.hangman);
  $winLoseContainer.textContent = '';
}

function findLetter(word, letter) {
  const letterIndexes = [];

  for (let i = 0; i < word.length; i++) {
    if (word[i].toLowerCase() === letter.toLowerCase()) {
      letterIndexes.push(i);
    }
  }

  return letterIndexes;
}

function fillSolutionLetters(letter, letterIndexes) {
  const $solutionLetters = $solutionContainer.children;
  for (let i = 0; i < letterIndexes.length; i++) {
    $solutionLetters[letterIndexes[i]].textContent = letter;
  }
}

function onLetterContainerClick(event) {
  console.log(event.target);
  if (event.target.matches('.letter:not(.success):not(.failed)')) {
    const clickedLetter = event.target.dataset.letter;
    const letterIndexes = findLetter(gameState.word, clickedLetter);

    if (letterIndexes.length === 0) {
      event.target.classList.add('failed');
      gameState.hangman++;
      updateHangmanImage(gameState.hangman);
    } else {
      event.target.classList.add('success');
      gameState.lettersFound += letterIndexes.length;
      fillSolutionLetters(clickedLetter, letterIndexes);
    }

    if (gameState.lettersFound === gameState.word.length) {
      $winLoseContainer.textContent = 'You won, play again?';
    } else if (gameState.hangman === 9) {
      $winLoseContainer.textContent =
        'You lost. The word was ' + gameState.word.join('') + ', try again?';
    }
  }
}

reset();

$letterContainer.addEventListener('click', onLetterContainerClick);
$winLoseContainer.addEventListener('click', reset);
