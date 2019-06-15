var bars = [];
var numOfBars = screen.width / 2;
var done = false;
var started = false;
var go = false;
var sel, button, numBars;
var gradient = [];
var col;
var rand;

function wait(ms) {

  var d = new Date();
  var d2 = null;
  do { d2 = new Date(); }
  while(d2-d < ms);
}

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

var a1 = 0;
var a2 = 0;
function setup() {
  gradient = [color(255, 0, 0), color(255, 127.5, 0),color(255, 255, 0),color(0, 255, 0),color(0, 0, 255),color(255, 0, 255)];

  numBars = createInput();
  numBars.position(10, 43);
  numBars.attribute('placeholder', 'Number of bars: ' + numOfBars);

  sel = createSelect();
  sel.position(10, 65);
  sel.option('--Sort Method--')
  sel.option('Bubble Sort');
  sel.option('Bubble Sort (Random)');
  sel.option('Quick Sort');
  sel.option('Quick Sort (Random)');
  sel.changed(function() {
    if (sel.value() == "Quick Sort" || sel.value() == "Quick Sort (Random)") {
      numBars.attribute('placeholder', 'Work in Progress!');
    } else {
      numBars.attribute('placeholder', 'Number of bars: ' + numOfBars);
    }
  })
  sel.width = numBars.width;

  button = createButton('go');
  button.position(sel.x + sel.width, 65);
  button.mousePressed(function(){
    if (numBars.value() != "") {
      numOfBars = numBars.value();
    }

    bars = [];

  })
  button.mouseReleased(function() {
    if (sel.value() != "--Sort Method--") {

      if (sel.value() == "Bubble Sort") {
        rand = false;
        bubbleSort();
      }

      if (sel.value() == "Bubble Sort (Random)") {
        rand = true;
        bubbleSort();
      }

      if (sel.value() == "Quick Sort") {
        rand = false;
        quickSort();
      }

      if (sel.value() == "Quick Sort (Random)") {
        rand = true;
        quickSort();
      }
      go = true;
    }
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
