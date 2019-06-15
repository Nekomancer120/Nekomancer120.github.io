var bars = [];
var numOfBars = screen.width / 2;
var done = false;
var started = false;
var go = false;
var sel, button, numBars;
var gradient = [];
var col;

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
  sel.option('bubble sort');
  sel.width = numBars.width;

  button = createButton('go');
  button.position(sel.x + sel.width, 65);
  button.mousePressed(function(){
    if (numBars.value() != "") {
      numOfBars = numBars.value();
    }

    bars = [];

    for (var i = 0; i < numOfBars; i++) {
      if (a2 < gradient.length) {
        if (a1 < 1) {
          a1 += (1/(numOfBars/(gradient.length-1)));
        } else {
          a2++;
          a1 = 0;
        }
      }

      col = lerpColor(gradient[a2], gradient[a2+1], a1);

      var h = (screen.height/(numOfBars))*(i+1);
      var w = (screen.width/(numOfBars));
      var l = new bar(w, h, col);
      bars.push(l);
    }

    if (!started) {
      shuffleArray(bars);
    }
  })
  button.mouseReleased(function() {
    if (sel.value() != "--Sort Method--") {

      if (sel.value() == "bubble sort") {
        bubbleSort();
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

function bubbleSort() {
  let fs = fullscreen();
  if (!started) {
    fullscreen(!fs);
    sel.hide();
    button.hide();
    numBars.hide();
    started = true;
    done = false;
    progress = 0;
    current = 0;
    sec = 0;
    mi = 0;
    hr = 0;
    s = "";
    m = "";
    h = "";
    t = "00:00:00";
    a1 = 0;
    a2 = 0;
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

    window.setInterval(function() {
      //sort
      if (progress < numOfBars) {
        if (current < bars.length - progress - 1) {
          if (bars[current].height > bars[current + 1].height) {
            var temp = bars[current];
            bars[current] = bars[current + 1];
            bars[current + 1] = temp;
            current++;
          } else {
            current++;
          }
        } else {
          progress++;
          current = 0;
        }
      } else {
        done = true;
        started = false;
        button.show();
        sel.show();
        numBars.show();
        // go = false;
      }
    }, 1)
  }
}

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
