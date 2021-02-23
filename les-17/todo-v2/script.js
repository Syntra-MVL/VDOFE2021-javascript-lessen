const $textArea = document.getElementById('todo-input');
const $saveBtn = document.getElementById('save-btn');
const $todoList = document.getElementById('todo-list');
const $todoCount = document.getElementById('todo-count');
const $doneList = document.getElementById('done-list');
const $doneCount = document.getElementById('done-count');

const Authorization = 'bearer ABcEHA2kcrKY4a6ipUA3';

const state = {
  focusIndex: NaN,
  todoList: [],
  doneList: [],
};

function fetchTodo(done) {
  return fetch(
    'https://phpstack-224488-1624928.cloudwaysapps.com/_/items/todo?filter%5Bdone%5D%5Beq%5D=' +
      (done ? '1' : '0'),
    {
      method: 'GET',
      headers: {
        Authorization,
      },
    },
  ).then((response) => {
    if (!response.ok) {
      throw new Error('could not fetch todoItems');
    }

    return response.json();
  });
}

function saveTodo(body, id) {
  return fetch(
    'https://phpstack-224488-1624928.cloudwaysapps.com/_/items/todo' +
      (id ? '/' + id : ''),
    {
      method: id ? 'PATCH' : 'POST',
      headers: {
        Authorization,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  ).then((response) => {
    if (!response.ok) {
      throw new Error('could not save todoItem');
    }

    return response.json();
  });
}

function deleteTodo(id) {
  return fetch(
    'https://phpstack-224488-1624928.cloudwaysapps.com/_/items/todo/' + id,
    {
      method: 'DELETE',
      headers: {
        Authorization,
      },
    },
  ).then((response) => {
    if (!response.ok) {
      throw new Error('could not save todoItem');
    }

    return true;
  });
}

function deleteFromState(id, done) {
  if (done) {
    state.doneList = state.doneList.filter(function (val) {
      return val.id !== parseInt(id);
    });
  } else {
    state.todoList = state.todoList.filter(function (val) {
      return val.id !== parseInt(id);
    });
  }
}

function setState() {
  $todoList.classList.add('loading');
  $doneList.classList.add('loading');
  printTodoList();
  printDoneList();

  fetchTodo(false)
    .then(function (body) {
      state.todoList = body.data;
      printTodoList();
      $todoList.classList.remove('loading');
    })
    .catch((err) => {
      console.error(err);
    });

  fetchTodo(true)
    .then(function (body) {
      state.doneList = body.data;
      printDoneList();
      $doneList.classList.remove('loading');
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
      state.todoList[i].id === state.focusIndex ? 'active' : ''
    }" data-index="${state.todoList[i].id}">
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
      <p>${state.doneList[i].description}</p>
      <a class="remove-btn fas fa-times-circle fa-2x" data-index="${state.doneList[i].id}"></a>
    </div>`;
  }

  $doneList.insertAdjacentHTML('beforeend', template);
  $doneCount.innerText = state.doneList.length;
}

function saveBtnClicked() {
  if (!$textArea.value) {
    return;
  }

  const body = {
    description: $textArea.value,
    done: false,
  };

  $saveBtn.classList.add('loading');

  saveTodo(body)
    .then(function (body) {
      state.todoList.push(body.data);
      $saveBtn.classList.remove('loading');
      $textArea.value = '';
      printTodoList();
    })
    .catch((err) => {
      console.error(err);
    });
}

function todoListClicked(event) {
  const $target = event.target;

  if ($target.matches('.done-btn')) {
    const $box = $target.closest('.box');
    const curId = $box.dataset.index;
    const body = {
      done: true,
    };

    $box.classList.add('loading');

    saveTodo(body, curId)
      .then(function (response) {
        deleteFromState(response.data.id, false);
        $box.classList.remove('loading');
        printTodoList();
        state.doneList.push(response.data);
        printDoneList();
      })
      .catch(function (error) {
        console.error(error);
      });
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
    const $box = $target.closest('.box');
    const curId = $target.dataset.index;

    $box.classList.add('loading');

    deleteTodo(curId)
      .then(function () {
        deleteFromState(curId, true);
        printDoneList();
      })
      .catch(function (error) {
        console.error(error);
      });
  }
}

$saveBtn.addEventListener('click', saveBtnClicked);
$todoList.addEventListener('click', todoListClicked);
$doneList.addEventListener('click', doneListClicked);

printDoneList();
setState();
