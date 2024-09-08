export function getDataForm(id) {
    return document.getElementById(id).value;
}

export function getUrlParameter(parameter) {

    const url = window.location.href;
    const urlObject = new URL(url);
    const params = new URLSearchParams(urlObject.search);
  
    return params.get(parameter);
  
}

export function getSelectedOption(idSelect) {
    let  selectElement = document.getElementById(idSelect);
    let selectedValue = selectElement.value;
    return selectedValue;
}

export function checkBoxVerif(idCheckBox) {
    const check = document.getElementById(idCheckBox);
    return check.checked ? true : false;
}

export function closeModal(id) {
    var myModalEl = document.getElementById(id);
    var modal = bootstrap.Modal.getInstance(myModalEl)
    modal.hide();
}

export function validadeField(condition, item) {
    if(condition) {
        setError(item);
    }
    else {
        clearError(item);
    }
}

export function addSelect(data, id) {
    const select = document.getElementById(id);
    data.forEach(element => {
        const option = document.createElement('option');
        option.value = element;
        option.textContent = element; 
        select.appendChild(option); 
    });
}

export function addSelectObject(data, id) {
    const select = document.getElementById(id);
    data.forEach(element => {
        const option = document.createElement('option');
        option.value = element.id;
        option.textContent = element.name; 
        select.appendChild(option); 
    });
}

export function getDataCalendar(data) {
    return data.substring(0,7)
}

export function checkActualJob(data, idSelect) {
    if (checkBoxVerif(idSelect)) {
        return null;
    }
    else {
        return getDataCalendar(data)
    }
}

export function setFields(id, value) {
    let field = document.getElementById(id);
    field.innerHTML = value;
}