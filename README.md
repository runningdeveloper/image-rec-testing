# image-rec-testing

## Hypothesis 

Doing a tensoflow prediction on an image is a heavy task. Maybe I don't need to send every image to get a prediction. For a security camera or bird watching thing. Could I save battery, resources and etc without having to do predictions continously.
The idea is running this on a raspberry pi.

## TODO

- [x] Make a simple image recognition script
- [ ] Do a performance test doing image recognition 
- [ ] See if I can get an image diffing thing to work
- [ ] Do a performace test on the diffing function
- [ ] Test the difference and see if this is an effective method

## How (So I remeber what I did)

- Using the inspect function in node (https://nodejs.org/en/docs/guides/debugging-getting-started/)[https://nodejs.org/en/docs/guides/debugging-getting-started/]
- When I run ```test:tensorflow``` I can then open up chrome and ```chrome://inspect/#devices``` to get the inspect view.
- Then look at the profiler and memory stuff.
- Having trouble running the profiler when the script runs and then quits
