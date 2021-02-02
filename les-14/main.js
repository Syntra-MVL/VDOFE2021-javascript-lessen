const $charactersTable = document.getElementById('characters-table');
const $charactersDetails = document.getElementById('characters-details');
const $pagination = document.getElementById('pagination');

let paginationReady = false;
let currentPage = 1;

function getDetails(url) {
  return fetch(url)
    .then(function (response) {
      if (!response.ok) {
        throw new Error('getDetails failed');
      }

      return response.json();
    })
    .catch(function (error) {
      console.error(error);
    });
}

function getMultipleDetails(urlArr) {
  return Promise.all(urlArr.map(getDetails));
}

function getAllPeople(page) {
  return getDetails('https://swapi.dev/api/people/?page=' + page).then(
    function (body) {
      $charactersTable.innerHTML = '';
      body.results.forEach(printPeopleRow);
      printPagination(body.count, 10);
    },
  );
}

function printPeopleRow(character) {
  const template = `
    <tr>
      <td>${character.name}</td>
      <td>${character.gender}</td>
      <td>${character.mass}</td>
      <td>${character.birth_year}</td>
      <td><button class="details-button" type="button" data-url="${character.url}">Show details</button></td>
    </tr>
  `;

  $charactersTable.insertAdjacentHTML('beforeend', template);
}

function printList(dataItems, prop) {
  return dataItems.reduce(function (html, dataItem) {
    return (html += `<li>${dataItem[prop]}</li>`);
  }, '');
}

function printFilmDetails(film, data) {
  const template = `
    <h2>${film.title}</h2>
    <p>${film.opening_crawl}</p>
    <h3>Species</h3>
    <ul class="species-list">
        ${printList(data[0], 'name')}
    </ul>
    
    <h3>Characters</h3>
    <ul class="character-list">
        ${printList(data[1], 'name')}
    </ul>
  `;

  $charactersDetails.innerHTML = template;
}

function insertSpinner($el) {
  $el.innerHTML = `
    <div class="spinner">
      <div class="double-bounce1"></div>
      <div class="double-bounce2"></div>
    </div>`;
}

function printPagination(totalItem, itemsPerPage) {
  if (!paginationReady) {
    const numberOfPages = Math.ceil(totalItem / itemsPerPage);
    for (let i = 1; i <= numberOfPages; i++) {
      const template = `<button class="pagination-btn ${
        i === currentPage ? 'active' : ''
      }">${i}</button>`;
      $pagination.insertAdjacentHTML('beforeend', template);
      paginationReady = true;
    }
    return;
  }

  document.querySelector('.pagination-btn.active').classList.remove('active');
  $pagination.children[currentPage - 1].classList.add('active');
}

function filmTableClicked(event) {
  if (event.target.matches('#film-table .details-button')) {
    event.target.disabled = true;
    const url = event.target.dataset.url;
    insertSpinner($filmDetails);
    getDetails(url).then(function (body) {
      let species = getMultipleDetails(body.species);
      let characters = getMultipleDetails(body.characters);
      Promise.all([species, characters]).then(function (data) {
        printFilmDetails(body, data);
        event.target.disabled = false;
      });
    });
  }
}

function paginationClicked(event) {
  if (event.target.matches('.pagination-btn')) {
    const pageNumber = parseInt(event.target.textContent);
    currentPage = pageNumber;
    getAllPeople(pageNumber);
  }
}

getAllPeople(currentPage);
$charactersTable.addEventListener('click', filmTableClicked);
$pagination.addEventListener('click', paginationClicked);
