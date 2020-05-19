# image-rec-testing

## Hypothesis 

Doing a tensoflow prediction on an image is a heavy task. Maybe I don't need to send every image to get a prediction. For a security camera or bird watching thing. Could I save battery, resources and etc without having to do predictions continously.
The idea is running this on a raspberry pi.

Let me know if this is wrong. I'm making many assumptions and don't have a deep understanding of tensorflow.

## TODO

- [x] Make a simple image recognition script
- [x] Do a performance test doing image recognition 
- [x] See if I can get an image diffing thing to work
- [x] Do a performace test on the diffing function
- [ ] Test the difference and see if this is an effective method
- [ ] Get some averages over multiple tests
- [ ] MVP doing a prediction with image diff included

## How (So I remeber what I did)

- Using the inspect function in node (https://nodejs.org/en/docs/guides/debugging-getting-started/)[https://nodejs.org/en/docs/guides/debugging-getting-started/]
- When I run ```test:tensorflow``` I can then open up chrome and ```chrome://inspect/#devices``` to get the inspect view.
- Then look at the profiler and memory stuff.
- Having trouble running the profiler when the script runs and then quits. So going with a simple timing function for now.
- Found the benny npm module that can do some test suites
- Trying it for simple function calls and then a "real" world case reading images and doing prediction

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

### 19 May using benny

diff-test
- checking a diff vs tensorflow it matches the 17 May 42.86% slower cool!

two-images
- do a "real" example 2 different images do a prediction vs diff
- checking a diff vs tensorflow when including reading files
- tensorflow only 20% slower than diff so diff is not that much quicker

Still not sure I'm testing the correct things. Maybe best idea would be to do a test on same video on a raspberry pi. Check cpu usage.
