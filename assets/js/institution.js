import { getDataForm, getSelectedOption, addSelect} from "../js/uteis.js";
import { create } from "../js/api.js";

const formCreateInstitution = document.getElementById("formInstitution");
formCreateInstitution.addEventListener("submit", function(event) {
    event.preventDefault();

    const user = sessionStorage.getItem("userId");
    const data = {
        name: getDataForm("nameInstitution"),
        type: getSelectedOption("type"),
        headline: getDataForm("headline"),
        founderId: parseInt(user),
        industry: getSelectedOption("industry"),
        companySize: getSelectedOption("industrySize"),
        headquarters: null,
        website: getDataForm("website"),
        about: getDataForm("about")
      }

      //console.log(data);
      const url = "http://localhost:8080/api/v1/institutions"
      const redirect_url = "perfil.html"
      create(data, url, redirect_url)

});

function loadIndustries() {
    const url = "http://localhost:8080/api/v1/industries"
    fetch(url)
    .then(response => {
        if (response.ok) {
            return response.json();
        }   
    })
    .then(data => {
        addSelect(data, "industry")
    })
    .catch(error => {
        console.error('Houve um problema com a requisição:', error);
    });
}

loadIndustries()

function createCardInstitution(institution) {
    const cardBody = document.getElementById("cardInstitution");
    const cardInstitution = `
        <div>
            <i class="fa-solid fa-building"> ${institution.name}</i>
        </div>
        <hr>
    `
    cardBody.innerHTML += cardInstitution;
}

async function getAllInstitution() {

    const userId = sessionStorage.getItem("userId")
    const url = "http://localhost:8080/api/v1/institutions";
    const options = {
        method: 'GET', 
        headers: { 'Content-Type': 'application/json'}
    };
    const response = await fetch(url, options);

    if(response.ok) {
        const data = await response.json();
        if(data.length > 0) {
            data.forEach(createCardInstitution);
        }
        return;
    }
    else {
        console.log(response);
    }
}

getAllInstitution()