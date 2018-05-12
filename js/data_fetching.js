console.log("Loading");

var fetchedData;
var quantity = 10;
var slice = 0;

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
    fetchedData = filterData(response);
    const dataTable = document.querySelector("#data-section");
    const origin = slice*quantity;
    const showedData = fetchedData.slice(origin, origin + quantity);
    dataTable.appendChild(buildHtmlTable(showedData));
    button.disabled = false;
  }

  function filterData(response) {
    const data = response["ListaEESSPrecio"];
    const filtered = data.map(row => {
      return {
        "Localidad": row["Localidad"],
        "Gasoleo A": row["Precio Gasoleo A"]
      };
    })
    debugger;
    return filtered;
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
