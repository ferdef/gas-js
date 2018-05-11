console.log("Loading");

var fetchedData;

function fetchData(event) {
  function validateResponse(response) {
    console.log("Data turned into JSON");
    return response.json();
  }

  function handleFetchError(error) {
    console.log(error);
    button.disabled = false;
  }

  function storeData(response) {
    fetchedData = response;
    const dataTable = document.querySelector("#table");
    console.log(fetchedData);
    dataTable.appendChild(buildHtmlTable(fetchedData["ListaEESSPrecio"]));
    button.disabled = false;
  }

  const url = 'https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/';
  const helper = 'https://cors.io/?';
  const button = event.currentTarget;
  button.disabled = true;

  console.log("Fetching Data");

  var options = {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'text/plain'
    })
  };

  fetch(helper + url, options)
    .then(validateResponse)
    .catch(handleFetchError)
    .then(storeData);
}

const fetchButton = document.querySelector("#fetch-button");
fetchButton.addEventListener('click', fetchData);