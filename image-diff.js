// Simple image diff

const fs = require("fs");
const Jimp = require('jimp');
const threshold = 0.15;


const doImageDiff = async (image1, image2) => {
    console.time('Diff');
    const diff = Jimp.diff(image1, image2, threshold);
console.timeEnd('Diff')
console.log('diff', {diff})
    console.time('Distance');
    const distance = Jimp.diff(image1, image2, threshold);
    console.timeEnd('Distance')
    console.log('distance', {distance})
    distance.image.write('diff.png');
}

(async function() {

    console.time('Read One Image')
    const image1 = await Jimp.read('./images/person1.jpg')
    console.timeEnd('Read One Image')
    const image2 = await Jimp.read('./images/person2.jpg')
    doImageDiff(image1, image2)
  
})();
