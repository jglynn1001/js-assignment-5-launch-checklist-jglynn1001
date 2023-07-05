// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
let div = document.getElementById("missionTarget");
div.innerHTML =`
                <h2>Mission Destination</h2>
                <ol>
                 <li>Name:${name} </li>
                    <li>Diameter:${diameter}</li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth:${distance} </li>
                    <li>Number of Moons:${moons} </li>
                </ol>
                <img src="${imageUrl}"></img>
   `
}

  function validateInput(testInput) {
   if (testInput === "")
   {
       return "Empty";
   }
   else if (isNaN(testInput))
   {
       return "Not a Number";
   }
   else if (isNaN(testInput) === false)
   {
       return "Is a Number";
   }
}



function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
  let fuel = document.getElementById("fuelStatus");
   let cargo = document.getElementById("cargoStatus");
   let pilotStatus = document.getElementById("pilotStatus");
   let copilotStatus = document.getElementById("copilotStatus");
   let launchStatus = document.getElementById("launchStatus");

   if (validateInput(pilot) === "Empty" || validateInput(fuelLevel) === "Empty" || validateInput(cargoLevel) === "Empty" || validateInput(copilot) === "Empty") {
    alert("All fields are required for submission.")
   }
   if (validateInput(fuelLevel) === "Not a Number" || validateInput(cargoLevel) === "Not a Number") {
    alert("Fuel level input and cargo level input must both be numbers.")
   }
   if (validateInput(copilot) === "Is a Number" || validateInput(pilot) === "Is a Number") {
    alert("Pilot and Copilot names should be text that does not include numbers.")
   }
   else {
   list.style.visibility = "visible";
   pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
   copilotStatus.innerHTML = `Copilot ${copilot} is ready for launch`;
   
   }
   if (fuelLevel < 10000) {
    fuel.innerHTML = "There is not enough fuel for the journey"
    launchStatus.innerHTML = "Shuttle not ready for launch"
    launchStatus.style.color = "red"
   }
   if (cargoLevel > 10000) {
    cargo.innerHTML = "Shuttle mass is too high for launch"
    launchStatus.innerHTML = "Shuttle not ready for launch"
    launchStatus.style.color = "red"
   }
   if (cargoLevel < 10000 && fuelLevel > 10000) {
    cargo.innerHTML = "Shuttle mass is low enough for safe launch"
    launchStatus.innerHTML = "Shuttle is ready for launch"
    launchStatus.style.color = "green"
   }
   
}

async function myFetch() {
    let planetsReturned;
    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
      return response.json();
});
    return planetsReturned;
}
function pickPlanet(planets) {
    let index = Math.floor(Math.random()* planets.length)
    selectedPlanet = planets[index];
    return selectedPlanet
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
