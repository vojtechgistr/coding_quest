const fs = require("fs");

function ReadInput(pathToFile) {
  let data = null;
  try {
    data = fs.readFileSync(pathToFile, "utf8").split(" ");
  } catch (err) {
    console.error(err);
  }

  return data;
}

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

function ShowCode(output) {
    console.log(output.replace(/.{100}/g, "$&\n"));
}

async function ShowCodeButRotating(output, imageWidth) {
    let temp = "";
    let rotation = 0;
    let maxRotation = 5;
    let speed = 50;
    while(true) {
        rotation++;
        console.clear();
        for (let i = 0;i < output.length;i++) {
            temp += output[i];
            if (!(i % (imageWidth + rotation))) {
                console.log(temp);
                temp = "";
            }
        }

        await sleep(Math.abs((Math.abs(rotation) - maxRotation)) * speed);
        
        if (rotation == maxRotation) {
            rotation = -maxRotation;
        }
    }
}

let output = "";
const pixels = ReadInput("input.txt");
for (let i = 0; i < pixels.length;i++) {
    let value = parseInt(pixels[i]);

    i % 2
        ? output += "#".repeat(value)
        : output += ".".repeat(value);
}

// ShowCodeButRotating(output, 100);
ShowCode(output, 100);