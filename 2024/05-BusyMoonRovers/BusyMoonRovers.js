const fs = require("fs");

function ReadInput(pathToFile) {
  let data = null;
  try {
    data = fs.readFileSync(pathToFile, "utf8").split("\r\n");
  } catch (err) {
    console.error(err);
  }

  return data;
}

const distanceInput = ReadInput("input.txt");
const routeInput = ReadInput("routes.txt");
let totalDistance = 0;
let distancesObject = {};
for (let i = 1; i < distanceInput.length; i++) {
  const line = distanceInput[i].replace(/ {2,}/g, " ").split(" ");
  const distanceName = line[0];
  const distances = line.slice(1);
  distancesObject[distanceName] = distances;
}

for (let routeNumber = 0; routeNumber < routeInput.length; routeNumber++) {
  const line = routeInput[routeNumber].split(":");
  const route = line[1].trim().split(" -> ");
  for (let i = 0; i < route.length - 1; i++) {
    const target1 = route[i];
    const target2 = route[i + 1];
    const valueIndex = Object.keys(distancesObject).indexOf(target2);
    const value = distancesObject[target1][valueIndex];
    totalDistance += parseInt(value);
  }
}

console.log(totalDistance);