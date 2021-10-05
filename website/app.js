/* Global Variables */
let baseURL = 'api.openweathermap.org/data/2.5/weather?';
let apiKey  =  '5850bcbfbdaeeae126a64a6d4a85723e';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

//Make a GET request to the openweathermap api site
document.getElementById('generate').addEventListener('click', requestData);

function requestData(){
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value; 
    getWeatherData(baseURL, zipCode, apiKey)
    .then((data) => {
        //Add data to POST request
        postData('/post', {temperature:data.temp, date:newDate, userResponse:feelings})
    })
    .then(() => {
        //Get data from server's endpoint
        getData('/get')
    })
    .then((serverData)=>{
        //Update html values
        updateValues(serverData.temp, serverData.date, serverData.feeling)
    })
}

// Retrieve weather data from external site
const getWeatherData = async (baseURL, zipCode, apiKey) =>  {
    const response = await fetch(`https:api.openweathermap.org/data/2.5/weather?zip=${zipCode},au&appid=${apiKey}`)
    try {
        const json = await response.json();
        const data = await json.main;
        console.log(data);
        return data;
    }catch(error) {
        console.log("error", error);
    }
}

//Post data to the server
const postData = async( url = '', data = {}) => {
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify(data),
    })
    try {
        const newdata = await response.json();
        console.log(newdata);
        return newdata
    } catch(error) {
        console.log("error", error);
    }
}

// Get data from the server's endpoint
const getData = async(url='') =>{
    const response = await fetch(url)
    try {
        const serverData = response.json();
        console.log(serverData);
        return serverData
    }catch(error) {
        console.log("error", error)
    }
}

//Update the UI dynamically
const updateValues = async(temp, date, feeling)=>{
    document.getElementById('date').innerHTML = temp;
    document.getElementById('temp').innerHTML = date;
    document.getElementById('content').innerHTML = feeling;
}
