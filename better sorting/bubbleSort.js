async function bubbleSort(arr) {
  for (var j = 0; j < numOfBars; j++) {
    for (var i = 0; i < bars.length-(j+1); i++) {
      if (arr[i].height > arr[i+1].height) {
        await swap(arr, i, i+1);
      }
      current++;
    }
    current = 0;
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
}
