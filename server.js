// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
const { response } = require('express');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3000;
app.listen(port, () => {console.log(`running on the local host: ${port}`)})

//Receive the request from the client and save data to the endpoint object
app.post('/post', receiveData)

function receiveData(request, response) {
    let data = request.body;
    projectData["temp"] = data.temperature;
    projectData["date"] = data.date;
    projectData["feeling"] = data.userResponse;
    response.send(projectData);
    console.log(projectData);
}

// Make GET request
app.get('/get',(request, response)=>{
    response.send(projectData);
})
