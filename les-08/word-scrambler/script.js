//select textarea
const userInput = document.getElementById('user-input');
//select btn
const submitBtn = document.getElementById('submit-btn');
//select result container
const resultContainer = document.getElementById('result-container');
//# select wordCount
const wordCountContainer = document.getElementById('word-count');
//# select letterCount
const letterCountContainer = document.getElementById('letter-count');

function getUserInput() {
  //return value of userInput
  return userInput.value;
}

function textToWordArray(text) {
  // return array of words
  return text.split(' ');
}

function getRandomNumber(max) {
  // return random number between 0 and max (including 0 and excluding max)
  return Math.floor(Math.random() * max);
}

function scrambleArray(oldArray) {
  // return scrambled array
  // for (let i=0; i < oldArray.length; i++) {
  //   const randomIndex = getRandomNumber(oldArray.length);
  //   const tempVal = oldArray[i];
  //
  //   oldArray[i] = oldArray[randomIndex];
  //   oldArray[randomIndex] = tempVal;
  // }

  // for (let i=oldArray.length - 1; i > 0; i--) {
  //   const randomIndex = getRandomNumber(i);
  //   const tempVal = oldArray[i];
  //
  //   oldArray[i] = oldArray[randomIndex];
  //   oldArray[randomIndex] = tempVal;
  // }

  const scrambledArray = [];

  while (oldArray.length > 0) {
    const randomIndex = getRandomNumber(oldArray.length);
    const randomVal = oldArray.splice(randomIndex, 1);

    scrambledArray.push(randomVal[0]);
  }

  return scrambledArray;
}

function wordArrayToText(array) {
  // return scrambled text
  return array.join(' ');
}

function getWordCount(array) {
  //# return word count
  return array.length;
}

function getLetterCount(text) {
  //# return letter count
  return text.length;
}

function updateWordCount(wordCount) {
  //# update the Word Count
  wordCountContainer.textContent = wordCount;
}

function updateLetterCount(letterCount) {
  //# update the Letter Count
  letterCountContainer.textContent = letterCount;
}

function updateCounts(text, wordArray) {
  //# update Word Count and Letter Count
  updateWordCount(getWordCount(wordArray));
  updateLetterCount(getLetterCount(text));
}

function scramble() {
  // update textContent of resultContainer
  const input = getUserInput();
  const wordArray = textToWordArray(input);
  const scrambledArray = scrambleArray(wordArray);
  const scrambledText = wordArrayToText(scrambledArray);

  updateCounts(scrambledText, scrambledArray);
  resultContainer.textContent = scrambledText;
}

//add click event listener to submitBtn
submitBtn.addEventListener('click', scramble);

//## add input event listener to userinput for realTimeScramble
userInput.addEventListener('input', scramble);
