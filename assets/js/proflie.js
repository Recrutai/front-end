import { addSelectObject, getDataCalendar, 
    checkActualJob, getDataForm, getSelectedOption, 
    getSelectedText, setFields } from "../js/uteis.js";
import { create } from "../js/api.js";

//Courses
const coursesForm = document.getElementById("formCourses");
coursesForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const user = sessionStorage.getItem("userId");
    const courseData = {
        "schoolId" : parseInt(getSelectedOption("schoolId")),
        "fallbackSchoolName" : getSelectedText("schoolId"),
        "name" : getDataForm("name"),
        "description" : getDataForm("description"),
        "workloadHours" : parseInt(getDataForm("workloadHours")),
        "completionDate" : getDataCalendar(getDataForm("completionDate"))
    };
    const url = `http://localhost:8080/api/v1/users/${user}/courses`;
    create(courseData, url, "perfil.html")
    console.log(courseData)
})


function createCardCourses(course) {
    const cardBody = document.getElementById("cardCourses");
    const cardCourse = `
        <div>
            <i class="fa-solid fa-graduation-cap">${course.school.name}</i>
            <p>Nome: ${course.name}</p>
            <p>Descrição: ${course.description}</p>
            <p>Carga Horária: ${course.workloadHours} Horas</p>
            <p>Conclusão: ${course.completionDate}</p>
        </div>
        <hr>
    `
    cardBody.innerHTML += cardCourse;
}

async function getAllCourses() {

    const userId = sessionStorage.getItem("userId")
    const url = `http://localhost:8080/api/v1/users/${userId}/courses`;
    const options = {
        method: 'GET', 
        headers: { 'Content-Type': 'application/json'}
    };
    const response = await fetch(url, options);

    if(response.ok) {
        const data = await response.json();
        if(data.length > 0) {
            data.forEach(createCardCourses);
        }
        return;
    }
    else {
        console.log(response);
    }
}

getAllCourses();
//Courses

//Jobs

function loadCompanies() {
    const userId = sessionStorage.getItem("userId")
    const url = `http://localhost:8080/api/v1/organizations/owner/${userId}`;
    fetch(url)
    .then(response => {
        if (response.ok) {
            return response.json();
        }   
    })
    .then(data => {
        addSelectObject(data, "company")
        addSelectObject(data, "schoolId")
    })
    .catch(error => {
        console.error('Houve um problema com a requisição:', error);
    });
}

loadCompanies()

const jobsForm = document.getElementById("formJobs");
jobsForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const userId = sessionStorage.getItem("userId")
    const data = {
        "organizationId": parseInt(getSelectedOption("company")),
        "title": getDataForm("title"),
        "type": getSelectedOption("typeJobSelect"),
        "workModel": getSelectedOption("modalityJobSelect"),
        "address": {
            "city": getDataForm("city"),
            "state": "string",
            "country": "string"
        },
        "description": getDataForm("description"),
        "startDate": getDataCalendar(getDataForm("dateStartJ")),
        "endDate": checkActualJob(getDataForm("dateEndJ"), "flexCheckDefault"),
      }
    const url = `http://localhost:8080/api/v1/users/${userId}/employments`
    console.log(data)
    create(data, url, "perfil.html")
})

function createCardJobs(job) {
    const cardBody = document.getElementById("cardJobs");
    const dateEnd = !job.endDate ? 'Atual': job.endDate;
    const cardCourse = `
        <div>
            <i class="fa-solid fa-building">${job.organization.name}</i>
            <p>Cargo: ${job.title}</p>
            <p>Modalidade: ${job.workModel} | ${job.address}</p>
            <p>Período: ${job.startDate} | ${dateEnd }</p>
        </div>
        <hr>
    `
    cardBody.innerHTML += cardCourse;
}

async function getAllJobs() {

    const userId = sessionStorage.getItem("userId")
    const url = `http://localhost:8080/api/v1/users/${userId}/employments`
    const options = {
        method: 'GET', 
        headers: { 'Content-Type': 'application/json'}
    };
    const response = await fetch(url, options);

    if(response.ok) {
        const data = await response.json();
        if(data.length > 0) {
            data.forEach(createCardJobs);
        }
        return;
    }
    else {
        console.log(response);
    }
}

getAllJobs();
//Jobs

function loadInfoUser() {

    const user = sessionStorage.getItem("userInfos")
    const userJson = JSON.parse(user);
    setFields("name-user", userJson.firstName + " " + userJson.lastName)
    setFields("headline-user", userJson.headline)
    setFields("location-user", userJson.location)
    setFields("name-user-list", userJson.firstName + " " + userJson.lastName)
    setFields("email-user-list", userJson.email)
    setFields("location-user-list", userJson.location)
}

loadInfoUser()


