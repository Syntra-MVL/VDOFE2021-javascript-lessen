const $textArea = document.getElementById('todo-input');
const $saveBtn = document.getElementById('save-btn');
const $todoList = document.getElementById('todo-list');
const $todoCount = document.getElementById('todo-count');
const $todoPagination = document.getElementById('todo-pagination');
const $doneList = document.getElementById('done-list');
const $doneCount = document.getElementById('done-count');
const $donePagination = document.getElementById('done-pagination');

const Authorization = 'bearer ABcEHA2kcrKY4a6ipUA3';
const itemsPerPage = 6;

const state = {
  focusIndex: NaN,
  todoListCount: 0,
  todoList: [],
  todoPage: 1,
  doneListCount: 0,
  doneList: [],
  donePage: 1,
};

function calcPageCount(totalItems) {
  return Math.ceil(totalItems / itemsPerPage);
}

function printPagination(done) {
  const pageCount = calcPageCount(
    done ? state.doneListCount : state.todoListCount,
  );
  const curPage = done ? state.donePage : state.todoPage;
  const $container = done ? $donePagination : $todoPagination;
  let template = '';

  for (let i = 1; i <= pageCount; i++) {
    template += `
      <li>
        <button class="pagination-link ${
          curPage === i ? 'is-current' : ''
        }">${i}</button>
      </li>
    `;
  }

  $container.innerHTML = template;
}

function calcOffset(done) {
  return done
    ? (state.donePage - 1) * itemsPerPage
    : (state.todoPage - 1) * itemsPerPage;
}

function fetchTodo(done) {
  return fetch(
    'https://phpstack-224488-1624928.cloudwaysapps.com/_/items/todo?meta=filter_count&limit=' +
      itemsPerPage +
      '&offset=' +
      calcOffset(done) +
      '&sort=-modified_on&filter%5Bdone%5D%5Beq%5D=' +
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

function checkPage(done) {
  const count = done ? state.doneListCount : state.todoListCount;
  const page = done ? state.donePage : state.todoPage;
  const pageCount = calcPageCount(count);
  if (pageCount < page) {
    if (done) {
      state.donePage = pageCount;
      setState(false, false, true);
    } else {
      state.todoPage = pageCount;
      setState(false, true, false);
    }
  }
}

function setState(init = true, doTodoFetch = true, doDoneFetch = true) {
  if (init) {
    printTodoList();
    printDoneList();
  }

  if (doTodoFetch) {
    $todoList.classList.add('loading');

    fetchTodo(false)
      .then(function (body) {
        state.todoList = body.data;
        state.todoListCount = body.meta.filter_count;
        checkPage(false);
        printTodoList();
        printPagination(false);
        $todoList.classList.remove('loading');
      })
      .catch((err) => {
        console.error(err);
      });
  }

  if (doDoneFetch) {
    $doneList.classList.add('loading');

    fetchTodo(true)
      .then(function (body) {
        state.doneList = body.data;
        state.doneListCount = body.meta.filter_count;
        checkPage(true);
        printDoneList();
        printPagination(true);
        $doneList.classList.remove('loading');
      })
      .catch((err) => {
        console.error(err);
      });
  }
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
  $todoCount.innerText = state.todoListCount;
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
  $doneCount.innerText = state.doneListCount;
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
      setState(false, true, false);
      $textArea.value = '';
      $saveBtn.classList.remove('loading');
    })
    .catch((err) => {
      console.error(err);
      $saveBtn.classList.remove('loading');
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
        setState(false);
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
        setState(false, false);
      })
      .catch(function (error) {
        console.error(error);
      });
  }
}

function todoPaginationClicked(event) {
  if (event.target.matches('.pagination-link')) {
    state.todoPage = parseInt(event.target.textContent);
    setState(false, true, false);
  }
}

function donePaginationClicked(event) {
  if (event.target.matches('.pagination-link')) {
    state.donePage = parseInt(event.target.textContent);
    setState(false, false, true);
  }
}

$saveBtn.addEventListener('click', saveBtnClicked);
$todoList.addEventListener('click', todoListClicked);
$doneList.addEventListener('click', doneListClicked);
$todoPagination.addEventListener('click', todoPaginationClicked);
$donePagination.addEventListener('click', donePaginationClicked);

printDoneList();
setState();
