// Simple prediction

const tf = require("@tensorflow/tfjs-node");
const cocoSsd = require("@tensorflow-models/coco-ssd");
const fs = require("fs");
const readline = require("readline");

let model = null;

const doImagePrediction = async () => {
    console.time('Read Image');
  const imageFile = fs.readFileSync("./images/person1.jpg");
  console.timeEnd('Read Image');
  console.time('Prediction');
  const img = tf.node.decodeImage(imageFile);
  const predictions = await model.detect(img);
  console.timeEnd('Prediction');
  console.log({ predictions });
};

(async function() {
  //   readline.emitKeypressEvents(process.stdin);
  //   process.stdin.setRawMode(true);

  console.log("Loading model");
  model = await cocoSsd.load();
  //   console.log("Press g when ready or q to quit");

//   setTimeout(()=>doImagePrediction(), 5000)

    doImagePrediction()

  //   process.stdin.on("keypress", (key, data) => {
  //     if (data.name === "q") {
  //       process.exit();
  //     } else if (data.name === "g") {
  //       doImagePrediction();
  //     } else {
  //       console.log("Unrecognised key press");
  //     }
  //   });
})();
