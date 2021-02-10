const $textArea = document.getElementById('todo-input');
const $saveBtn = document.getElementById('save-btn');
const $todoList = document.getElementById('todo-list');
const $todoCount = document.getElementById('todo-count');
const $doneList = document.getElementById('done-list');
const $doneCount = document.getElementById('done-count');
const $clearAllBtn = document.getElementById('clear-all-btn');

const state = {
  focusIndex: NaN,
  todoList: [],
  doneList: [],
};

function setState() {
  fetch(
    'https://phpstack-224488-1624928.cloudwaysapps.com/_/items/todo?filter%5Bdone%5D%5Beq%5D=0',
    {
      method: 'GET',
      headers: {
        Authorization: 'bearer ABcEHA2kcrKY4a6ipUA3',
      },
    },
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error('could not fetch todoItems');
      }

      return response.json();
    })
    .then(function (body) {
      state.todoList = body.data;
      printTodoList();
    })
    .catch((err) => {
      console.error(err);
    });
}

function printTodoList() {
  $todoList.innerHTML = '';
  let template = '';

  for (let i = 0; i < state.todoList.length; i++) {
    template += `<div class="box ${
      i === state.focusIndex ? 'active' : ''
    }" data-index="${i}">
      <p>${state.todoList[i].description}</p>
      <a class="done-btn fas fa-check-circle fa-2x"></a>
    </div>`;
  }

  $todoList.insertAdjacentHTML('beforeend', template);
  $todoCount.innerText = state.todoList.length;
}

function printDoneList() {
  $doneList.innerHTML = '';
  let template = '';

  for (let i = 0; i < state.doneList.length; i++) {
    template += `<div class="box">
      <p>${state.doneList[i]}</p>
      <a class="remove-btn fas fa-times-circle fa-2x" data-index="${i}"></a>
    </div>`;
  }

  $doneList.insertAdjacentHTML('beforeend', template);
  $doneCount.innerText = state.doneList.length;
}

function saveBtnClicked() {
  const body = {
    description: $textArea.value,
    done: false,
  };
  fetch('https://phpstack-224488-1624928.cloudwaysapps.com/_/items/todo', {
    method: 'POST',
    headers: {
      Authorization: 'bearer ABcEHA2kcrKY4a6ipUA3',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('could not save todoItem');
      }

      return response.json();
    })
    .then(function (body) {
      state.todoList.push(body.data);
      printTodoList();
    })
    .catch((err) => {
      console.error(err);
    });
}

function todoListClicked(event) {
  const $target = event.target;

  if ($target.matches('.done-btn')) {
    const curIndex = $target.closest('.box').dataset.index;
    const doneItem = state.todoList.splice(curIndex, 1);
    state.doneList.push(doneItem[0]);
    // state.doneList = state.doneList.concat(doneItem); // alternatief
    printTodoList();
    printDoneList();
  }

  if ($target.matches('.box') || $target.matches('.box p')) {
    const curIndex = parseInt($target.closest('.box').dataset.index);
    state.focusIndex = curIndex === state.focusIndex ? NaN : curIndex;

    printTodoList();
  }
}

function doneListClicked(event) {
  const $target = event.target;

  if ($target.matches('.remove-btn')) {
    const curIndex = $target.dataset.index;
    state.doneList.splice(curIndex, 1);

    printDoneList();
  }
}

function clearAllBtnClicked() {
  state.todoList = [];
  state.doneList = [];

  printTodoList();
  printDoneList();
}

$saveBtn.addEventListener('click', saveBtnClicked);
$todoList.addEventListener('click', todoListClicked);
$doneList.addEventListener('click', doneListClicked);
$clearAllBtn.addEventListener('click', clearAllBtnClicked);

printDoneList();
setState();
