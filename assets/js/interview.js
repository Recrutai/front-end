import {getDataForm, getUrlParameter} from "../js/uteis.js";
import {create} from "../js/api.js";

const interviewForm = document.getElementById("formInterview");
interviewForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const memberId = sessionStorage.getItem("userId");
    const dataHora = getDataForm("scheduledTo") + "T" + getDataForm("hour") + ":00.694Z"
    const data = {
        "interviewerId": parseInt(memberId),
        "applicationId": parseInt(getUrlParameter("id")),
        "title": getDataForm("title"),
        "description": getDataForm("description"),
        "scheduledTo": dataHora,
        "address": null,
        "reunionUrl": getDataForm("reunionUrl"),
        "isRemote": true,
        "createdById": parseInt(memberId)
    }
    const url = "http://localhost:8080/api/v1/interviews"
    const redirect = "candidatos.html?id=" + getUrlParameter("id")
    create(data, url, redirect)
    console.log(data)

});