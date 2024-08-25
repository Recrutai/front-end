import { getDataForm, getSelectedOption } from "../js/uteis.js";
import { create } from "../js/api.js";

const formCreateInstitution = document.getElementById("formInstitution");
formCreateInstitution.addEventListener("submit", function(event) {
    event.preventDefault();

    const user = sessionStorage.getItem("userId");
    const data = {
        name: getDataForm("nameInstitution"),
        type: getSelectedOption("type"),
        headline: getDataForm("headline"),
        ownerId: parseInt(user),
        industry: getSelectedOption("industry"),
        companySizeId: sizesCompany(parseInt(getDataForm("companySizeId"))),
        headquarters: {
            streetAddress: "string",
            city: "string",
            state: "string",
            country: "string",
            postalCode: "string",
            latitude: 0,
            longitude: 0
        },
        website: getDataForm("website"),
        about: getDataForm("about")
      }

      const url = "http://localhost:8080/api/institutions"
      const redirect_url = "perfil.html"
      create(data, url, redirect_url)
      console.log(data);

});

function loadIndustries() {
    const url = "http://localhost:8080/api/institutions/industries"
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


function addSelect(data, id) {
    const select = document.getElementById(id);
    data.forEach(element => {
        const option = document.createElement('option');
        option.value = element.name;
        option.textContent = element.name; 
        select.appendChild(option); 
    });
}

loadIndustries()

function sizesCompany(number) {

    switch(true) {
        case(number === 1):
            return 1

        case(number >= 2 && number <= 10):
            return 2

        case(number >= 11 && number <= 50):
            return 3
        
        case(number >= 51 && number <= 200):
            return 4

        case(number >= 201 && number <= 1000):
            return 5

        case(number >= 1001 && number <= 5000):
            return 6

        case(number >= 5001 && number <= 10000):
            return 7

        case(number > 10001):
            return 8
    }
}
