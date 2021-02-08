const questions = [
  {
    question: 'Linus Torvalds created Linux and Git.',
    correctAnswer: 'True',
  },
  {
    question:
      'The programming language "Python" is based off a modified version of "JavaScript".',
    correctAnswer: 'False',
  },
  {
    question: 'The logo for Snapchat is a Bell.',
    correctAnswer: 'False',
  },
  {
    question: 'RAM stands for Random Access Memory.',
    correctAnswer: 'True',
  },
  {
    question: '"HTML" stands for Hypertext Markup Language.',
    correctAnswer: 'True',
  },
  {
    question:
      'In most programming languages, the operator ++ is equivalent to the statement "+= 1".',
    correctAnswer: 'True',
  },
  {
    question: 'The Windows 7 operating system has six main editions.',
    correctAnswer: 'True',
  },
  {
    question: 'The Windows ME operating system was released in the year 2000.',
    correctAnswer: 'True',
  },
  {
    question:
      'The NVidia GTX 1080 gets its name because it can only render at a 1920x1080 screen resolution.',
    correctAnswer: 'False',
  },
  {
    question: 'Linux was first created as an alternative to Windows XP.',
    correctAnswer: 'False',
  },
];

const $score = document.getElementById('total-correct');
const $question = document.getElementById('question');
const $trueBtn = document.getElementById('answer-true');
const $falseBtn = document.getElementById('answer-false');
const $resultContainer = document.getElementById('result-container');

const state = {
  randomQuestions: [],
  index: 0,
  score: 0,
};

function fetchQuestions() {
  return fetch(
    'https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=boolean',
  )
    .then(function (response) {
      if (!response.ok) {
        throw new Error('Could not fetch questions');
      }

      return response.json();
    })
    .then(function (data) {
      if (data.response_code !== 0) {
        throw new Error('Could not fetch questions');
      }

      console.log(data.results);
      return data.results;
    })
    .catch(function (error) {
      console.error(error);
    });
}

function resetResults() {
  const $successResults = document.querySelectorAll('.result.is-success');
  const $dangerResults = document.querySelectorAll('.result.is-danger');

  for (let i = 0; i < $successResults.length; i++) {
    $successResults[i].classList.remove('is-success');
    $successResults[i].classList.add('is-dark');
  }

  for (let i = 0; i < $dangerResults.length; i++) {
    $dangerResults[i].classList.remove('is-danger');
    $dangerResults[i].classList.add('is-dark');
  }
}

function updateScore() {
  $score.textContent = state.score;
}

function printQuestion() {
  if (state.index === state.randomQuestions.length) {
    $question.innerHTML = `Your score is ${state.score}, try again?`;
    return;
  }

  $question.innerHTML = state.randomQuestions[state.index].question;
}

function resetGame() {
  fetchQuestions().then(function (questions) {
    state.randomQuestions = questions;
    state.index = 0;
    state.score = 0;

    resetResults();
    updateScore();
    printQuestion();
  });
}

function answerQuestion(answer) {
  const $result = $resultContainer.children[state.index];

  if (answer === state.randomQuestions[state.index].correct_answer) {
    $result.classList.add('is-success');
    state.score++;
  } else {
    $result.classList.add('is-danger');
  }

  $result.classList.remove('is-dark');
  state.index++;

  updateScore();
  printQuestion();
}

function trueBtnClicked() {
  if (state.index === state.randomQuestions.length) {
    resetGame();
    return;
  }

  answerQuestion('True');
}

function falseBtnClicked() {
  if (state.index === state.randomQuestions.length) {
    return;
  }
  answerQuestion('False');
}

$trueBtn.addEventListener('click', trueBtnClicked);
$falseBtn.addEventListener('click', falseBtnClicked);

resetGame();
