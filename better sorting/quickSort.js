let states = [];

async function quickSort(arr, start, end) {
  if (start >= end) {
    console.log("start >= end");
    return;
  }
  let index = await partition(arr, start, end);
  states[index] = -1;

  await Promise.all([
    quickSort(arr, start, index - 1),
    quickSort(arr, index + 1, end)
  ]);
}
