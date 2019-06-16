var bars = [];
var numOfBars = screen.width / 2;
var done = false;
var started = false;
var go = false;
var sel, button, numBars, delIn, imgIn, img1;
var gradient = [];
var col;
var rand;
var delay = 1;
var suffleDone = false;

async function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    // await wait(1)
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  suffleDone = true;
}

var a1 = 0;
var a2 = 0;
function setup() {
  gradient = [color(255, 0, 0), color(255, 127.5, 0),color(255, 255, 0),color(0, 255, 0),color(0, 0, 255),color(255, 0, 255)];

  imgIn = createFileInput(handleFile);
  imgIn.position(10, 87);
  imgIn.hide();

  numBars = createInput();
  numBars.position(10, 43);
  numBars.attribute('placeholder', 'Number of bars: ' + numOfBars);
  numBars.width = numBars.width + 3

  delIn = createInput();
  delIn.position(10, 21);
  delIn.attribute('placeholder', 'Delay: ' + delay + " ms");

  sel = createSelect();
  sel.position(10, 65);
  sel.option(' <-------Sort Method-------> ')
  sel.option('Bubble Sort');
  sel.option('Bubble Sort (Random)');
  sel.option('Bubble Sort Picture');
  sel.option('Quick Sort');
  sel.option('Quick Sort (Random)');
  sel.option('Quick Sort Picture');
  sel.changed(function() {
    if (sel.value().includes('Picture')) {
      numBars.attribute('placeholder', 'Work in Progress!');
      imgIn.show();
    } else {
      numBars.attribute('placeholder', 'Number of bars: ' + numOfBars);
      imgIn.hide();
    }
  })
  sel.width = numBars.width;

  button = createButton('go');
  button.position(sel.x + sel.width, 65);
  button.mousePressed(function(){
    if (numBars.value() != "") {
      numOfBars = numBars.value();
    }

    if (delIn.value() != "") {
      delay = delIn.value();
    }

    bars = [];

  })
  button.mouseReleased(function() {
    timer();
    start();
  });

  createCanvas(windowWidth, windowHeight);
}

var progress = 0;
var current = 0;
var sec = 0;
var mi = 0;
var hr = 0;
var s = "";
var m = "";
var h = "";
var t = "00:00:00";

function draw() {
  background(255/2);
  if (go) {
    for (var i = 0; i < bars.length; i++) {
      var pos = createVector((screen.width/numOfBars)*i,0);
      bars[i].show(pos);
    }

    fill(255);
    text(t, 10, height-10);
    text(progress, 10, height-25);
    text(current+1, 10, height-40);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

async function partition(arr, start, end) {
  for (let i = start; i < end; i++) {
    states[i] = 1;
  }

  let pivotIndex = start;
  let pivotValue = arr[end].height;
  for (var i = start; i < end; i++) {
    if (arr[i].height < pivotValue) {
      await swap(arr, i, pivotIndex);
      states[pivotIndex] = -1;
      pivotIndex++;
      states[pivotIndex] = 0;
    }
  }

  await swap(arr, pivotIndex, end);

  for (let i = start; i < end; i++) {
    if (i != pivotIndex) {
      states[i] = -1;
    }
  }

  return pivotIndex;
}

async function swap(arr, a, b) {
  await wait(delay);
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function finish() {
  done = true;
  started = false;
  button.show();
  sel.show();
  numBars.show();
  delIn.show();
  suffleDone = false;
  // go = false;
}
function timer() {
  window.setInterval(function() {
    if (!done) {
      //timer
      if (sec < 60) {
        sec++;
      } else {
        if (mi < 60) {
          mi++;
        } else {
          hr++;
          mi = 0
        }
        sec = 0;
      }
      if (sec-10 < 0) {
        s = "0" + sec.toString();
      } else {
        s = sec.toString();
      }
      if (mi-10 < 0) {
        m = "0" + mi.toString();
      } else {
        m = mi.toString();
      }
      if (hr-10 < 0) {
        h = "0" + hr.toString();
      } else {
        h = hr.toString();
      }
      t = h + ":" + m + ":" + s;
    }
  }, 1000)
}

function handleFile(file) {
  print(file);
  if (file.type === 'image') {
    img = createImg(file.data);
    img.hide();
  } else {
    img = null;
  }
}
