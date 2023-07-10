// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl){
        const missionTarget = document.getElementById("missionTarget");
        missionTarget.innerHTML =
        `<h2>Mission Destination</h2>
        <ol>
            <li>Name: ${name} </li>
            <li>Diameter: ${diameter} </li>
            <li>Star: ${star}</li>
            <li>Distance from Earth: ${distance} </li>
            <li>Number of Moons: ${moons} </li>
        </ol>
        <img src=${imageUrl}>`
}
 

function validateInput(testInput) {
    if (testInput === "" || testInput === null || testInput === 0) {
        return 'Empty'
    } else if ((!isNaN(Number(testInput)))) {
        return 'Is a Number'
    } else {
        return 'Not a Number'
    }
}


function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    let pilotStatus = document.getElementById('pilotStatus');
    let copilotStatus = document.getElementById('copilotStatus');
    let fuelStatus = document.getElementById('fuelStatus');
    let cargoStatus = document.getElementById('cargoStatus');
    let launchStatus = document.getElementById('launchStatus');

    if (validateInput(pilot) === 'Empty' || validateInput(copilot) === 'Empty' || validateInput(fuelLevel) === 'Empty' || validateInput(cargoLevel) === 'Empty') {
        alert('All fields are required');
        // launchStatus.innerHTML = "Awaiting Information Before Launch";
        // launchStatus.style.color = "black";
        list.style.visibility = "hidden";
    } else if (validateInput(pilot) === 'Is a Number' || validateInput(copilot) === 'Is a Number') {
        alert('Please enter alphabetic characters only for the Pilot Name and Co-pilot Name fields');
        // launchStatus.innerHTML = "Awaiting Information Before Launch";
        // launchStatus.style.color = "black";
        list.style.visibility = "hidden";
    } else if (validateInput(fuelLevel) === 'Not a Number' || validateInput(cargoLevel) === 'Not a Number') {
        alert('Please enter numerical characters only for the Fuel Level and Cargo Mass fields');
        // launchStatus.innerHTML = "Awaiting Information Before Launch";
        // launchStatus.style.color = "black";
        list.style.visibility = "hidden";
    } else if (Number(fuelLevel) < 10000) {
        list.style.visibility = "visible";
        pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
        copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
        fuelStatus.innerHTML = `Not enough fuel for the journey`;
        launchStatus.innerHTML = `Shuttle Not Ready for Launch`;
        launchStatus.style.color = "red";
    } else if (Number(cargoLevel) > 10000) {
        list.style.visibility = "visible";
        pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
        copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
        cargoStatus.innerHTML = `Cargo mass too heavy for launch`;
        launchStatus.innerHTML = `Shuttle Not Ready for Launch`;
        launchStatus.style.color = "rgb(199, 37, 78)";
    // } else if (Number(fuelLevel) < 10000 && (Number(cargoLevel) > 10000)){
    //     list.style.visibility = "visible";
    //     fuelStatus.innerHTML = `Not enough fuel for the journey`;
    //     cargoStatus.innerHTML = `Cargo mass too heavy for launch`;
    //     launchStatus.innerHTML = `Shuttle Not Ready for Launch`;
    //     launchStatus.style.color = "red";
    } else if (Number(fuelLevel) > 10000 && (Number(cargoLevel) < 10000)) {
        list.style.visibility = "visible";
        pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
        copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
        fuelStatus.innerHTML = `Enough fuel for the journey`;
        cargoStatus.innerHTML = `Cargo mass low enough for launch`;
        launchStatus.innerHTML = `Shuttle is ready for launch`;
        launchStatus.style.color = "rgb(65, 159, 106)";
    }

}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then(function (response) {
       return response.json();
    });

    return planetsReturned;
}

function pickPlanet(planets) {
    let random = Math.floor(Math.random() * planets.length)
    return planets[random];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;
