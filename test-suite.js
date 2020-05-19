const b = require("benny");
const tf = require("@tensorflow/tfjs-node");
const cocoSsd = require("@tensorflow-models/coco-ssd");
const fs = require("fs");
const pixelmatch = require("pixelmatch");
const readline = require("readline");
const Jimp = require("jimp");
const PNG = require("pngjs").PNG;

const threshold = 0.15;
let model = null;

const doImagePrediction = async (img) => {
  const predictions = await model.detect(img);
  //   console.log({ predictions });
  return predictions;
};

const doImageDiff = async (image1, image2) => {
  const diff = Jimp.diff(image1, image2, threshold);
  // console.log('diff', {diff})
  return diff;
};

const doImageDistance = async (image1, image2) => {
  const distance = Jimp.diff(image1, image2, threshold);
  // console.log('distance', {distance})
  return distance;
};

// cannot get this to work
const doPixelMatch = async (image1, image2) => {
  const buf1 = await image1.getBufferAsync(Jimp.MIME_PNG);
  const buf2 = await image2.getBufferAsync(Jimp.MIME_PNG);
  const diff = pixelmatch(
    buf1,
    buf2,
    null,
    image1.bitmap.width,
    image1.bitmap.height,
    { threshold }
  );
  // console.log('diff', {diff})
  return diff;
};

(async function() {
  console.log("Loading model");
  model = await cocoSsd.load();

  // reading images
  const image1 = await Jimp.read("./images/person1.jpg");
  const image2 = await Jimp.read("./images/person2.jpg");

  const imageFile = fs.readFileSync("./images/person1.jpg");
  const img = tf.node.decodeImage(imageFile);

  // testing just the functions excluding the reading of an image
  b.suite(
    "Diff functions Test",

    // b.add('read file fs', async () => {
    //     fs.readFileSync("./images/person1.jpg");
    // }),

    // b.add('read file jimp', async () => {
    //     await Jimp.read('./images/person1.jpg')
    // }),

    b.add("tensorflow prediction", async () => {
      await doImagePrediction(img);
    }),

    b.add("image diff jimp", async () => {
      await doImageDiff(image1, image2);
    }),

    b.add("image distance", async () => {
      await doImageDistance(image1, image2);
    }),

    b.cycle(),
    b.complete(),
    b.save({ file: "diff-test", version: "1.0.0" }),
    b.save({ file: "diff-test", format: "chart.html" })
  );

  // testing kind of like a real world thing prediction on 2 images vs just a diff
  b.suite(
    "Two Images Test",

    b.add("tensorflow prediction", async () => {
      const imageFile1 = fs.readFileSync("./images/person1.jpg");
      const imageFile2 = fs.readFileSync("./images/person2.jpg");

      const img1 = tf.node.decodeImage(imageFile1);
      const img2 = tf.node.decodeImage(imageFile2);

      await doImagePrediction(img1);
      await doImagePrediction(img2);
    }),

    b.add("image diff jimp", async () => {
      const image11 = await Jimp.read("./images/person1.jpg");
      const image22 = await Jimp.read("./images/person2.jpg");
      await doImageDiff(image11, image22);
    }),

    b.cycle(),
    b.complete(),
    b.save({ file: "two-images", version: "1.0.0" }),
    b.save({ file: "two-images", format: "chart.html" })
  );
})();
