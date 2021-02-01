const $filmTable = document.getElementById('film-table');
const $filmDetails = document.getElementById('film-details');

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

function getAllFilms() {
  return getDetails('https://swapi.dev/api/films').then(function (body) {
    body.results.forEach(printFilmRow);
  });
}

function printFilmRow(film) {
  const template = `
    <tr>
      <td>${film.title}</td>
      <td>${film.release_date}</td>
      <td>${film.director}</td>
      <td>${film.producer}</td>
      <td><button class="details-button" type="button" data-url="${film.url}">Show details</button></td>
    </tr>
  `;

  $filmTable.insertAdjacentHTML('beforeend', template);
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

  $filmDetails.innerHTML = template;
}

function insertSpinner($el) {
  $el.innerHTML = `
    <div class="spinner">
      <div class="double-bounce1"></div>
      <div class="double-bounce2"></div>
    </div>`;
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

getAllFilms();
$filmTable.addEventListener('click', filmTableClicked);
