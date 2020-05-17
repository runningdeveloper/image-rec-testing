# image-rec-testing

## Hypothesis 

Doing a tensoflow prediction on an image is a heavy task. Maybe I don't need to send every image to get a prediction. For a security camera or bird watching thing. Could I save battery, resources and etc without having to do predictions continously.
The idea is running this on a raspberry pi.

Let me know if this is wrong. I'm making many assumptions and don't have a deep understanding of tensorflow.

## TODO

- [x] Make a simple image recognition script
- [ ] Do a performance test doing image recognition 
- [ ] See if I can get an image diffing thing to work
- [ ] Do a performace test on the diffing function
- [ ] Test the difference and see if this is an effective method
- [ ] Get some averages over multiple tests

## How (So I remeber what I did)

- Using the inspect function in node (https://nodejs.org/en/docs/guides/debugging-getting-started/)[https://nodejs.org/en/docs/guides/debugging-getting-started/]
- When I run ```test:tensorflow``` I can then open up chrome and ```chrome://inspect/#devices``` to get the inspect view.
- Then look at the profiler and memory stuff.
- Having trouble running the profiler when the script runs and then quits. So going with a simple timing function for now.

## Some Results

### 17 May timing only test

Ignoring loading the model - assuming this is done once.
(macbook pro 2014 with lots of chrome tabs open)

Tensorflow
- Reading the image from disk with fs 1.215ms
- 364.802ms for a prediction on person1.jpg 

Jimp image diff
- 93.703ms reading image person1.jpg into a Jimp file from disk
- 158.570ms for the diff option
- 108.662ms for the distance option

So a bit quicker doing a diff and Jimp.distance seems to be quicker than Jimp.diff. Roughly 45% quicker I think.
