export async function create(data, url, redirect_url) {

    const options = {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }
    const response = await fetch(url, options);

    if(response.ok) {
        window.location.href = redirect_url;
    }
    else {
        console.log(response);
        alert("Ocorreu um erro!");
    }
}

export async function getAllData(url) {

    const options = {
        method: 'GET', 
        headers: { 'Content-Type': 'application/json'}
    };
    const response = await fetch(url, options);

    if(response.ok) {
        const data = await response.json();
        if(data.length > 0) {
            return data;
        }
        return;
    }
    else {
        console.log(response);
    }
}