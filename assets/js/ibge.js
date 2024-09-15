import {addSelectIbge, addSelectIbgeCity} from '../js/uteis.js';

function loadStates() {
    const url = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';
    fetch(url)
    .then((response) => {
        if(response.ok) {
            return response.json();
        }
    })
    .then(data => {
        addSelectIbge(data, 'states-Select');
    })
    .catch(error => {
        console.error('Houve um problema com a requisição:', error);
    })
}

function loadCities(uf) {
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
    fetch(url)
    .then((response) => {
        if(response.ok) {
            return response.json();
        }
    })
    .then(data => {
        addSelectIbgeCity(data, 'cities-Select');
    })
    .catch(error => {
        console.error('Houve um problema com a requisição:', error);
    })
}

loadStates();
document.getElementById('states-Select').addEventListener('change', function() {
    const selectedValue = this.value;
    document.getElementById('cities-Select').innerHTML = '';
    loadCities(selectedValue);
});

