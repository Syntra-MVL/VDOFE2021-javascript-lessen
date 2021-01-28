fetch('https://swapi.dev/api/people/1/', {
  method: 'POST',
  headers: {
    Authorization: 'test',
  },
})
  .then(function (response) {
    console.log(response);
    if (!response.ok) {
      throw new Error('Response not ok');
    }

    return response.json();
  })
  .then(function (data) {
    console.log(data);
  })
  .catch(function (error) {
    console.error(error);
  });

const nameForm = document.forms['name-form'];
nameForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const formData = new FormData(nameForm);

  for (let formDataItem of formData.entries()) {
    console.log(formDataItem);
  }
});

fetch('https://google.com');
