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
    getWeatherData(baseURL, zipCode, apiKey)
}
const getWeatherData = async (baseURL, zipCode, apiKey) =>  {
    const response = await fetch(`api.openweathermap.org/data/2.5/weather?zip=${zipCode},au&appid=${apiKey}`)
    try {
        const data = await response.json;
        console.log(data);
        return data;
    }catch(error) {
        console.log("error", error);
    }
}