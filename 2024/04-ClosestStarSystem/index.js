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

let distances = [];
const data = ReadInput("input.txt")
for (let i = 1; i < data.length; i++) {
    const system1 = data[i].replace(/ +(?= )/g,'|').split("|");
    const name1 = system1[0];
    const dist1 = system1[1];
    const x1 = system1[2];
    const y1 = system1[3];
    const z1 = system1[4];
    
    for (let o = 1; o < data.length; o++) {
        const system2 = data[o].replace(/ +(?= )/g,'|').split("|");
        const name2 = system2[0];
        const dist2 = system2[1];
        const x2 = system2[2];
        const y2 = system2[3];
        const z2 = system2[4];

        const distance = Math.sqrt(Math.pow((x1-x2), 2) + Math.pow((y1-y2), 2) + Math.pow((z1-z2), 2));
        if (distance == 0) continue;
        distances.push(distance);
}

}
console.log(distances)

const min = Math.min(...distances)
console.log(min)