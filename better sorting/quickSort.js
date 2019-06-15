let states = [];
let numDone = 0;

async function quickSort(arr, start, end) {
  if (start >= end) {
    console.log("start >= end");
    return;
  }
  let index = await partition(arr, start, end);
  states[index] = -1;

  // await Promise.all([
    await quickSort(arr, start, index - 1);
    await quickSort(arr, index + 1, end)
  // ]);
  numDone = 0;
  progress = 0;
  for (var i = 0; i < bars.length; i++) {
    if (checkDone(bars, i)) {
      numDone++;
      progress++;
    }
  }
  if (numDone == numOfBars) {
    await finish();
  }
}
