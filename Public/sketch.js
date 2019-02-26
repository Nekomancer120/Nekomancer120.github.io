function setup() {
  createCanvas(window.outerWidth - 5, window.outerHeight - 5);
}

var length = 1080;
var array = [];
var colour = [];
var a = 0;
var b = 0;
var l = length;

function mousePressed(){
  fullscreen(true);
}

var decPart = function(n) {
  var h = (n+"").split(".")[1];
  return(h);
};

for (var i = 0; i < length; i += 1) {
  array.push(i + 1);
  var a = i;
  while (a > 0) {
    a = a - 6;
  }
  if (a === 0) {
    colour.push([255, 0, 0]);
  } else if (a === -5) {
    colour.push([255, 165, 0]);
  } else if (a === -4) {
    colour.push([255, 255, 0]);
  } else if (a === -3) {
    colour.push([0, 255, 0]);
  } else if (a === -2) {
    colour.push([0, 0, 255]);
  } else if (a === -1) {
    colour.push([255, 0, 255]);
  } else {
    colour.push([255, 255, 255]);
  }
}

var j, x1, x2, i;
for (i = array.length - 1; i > 0; i--) {
  j = Math.floor(Math.random() * (i + 1));
  x1 = array[i];
  x2 = colour[i];
  array[i] = array[j];
  colour[i] = colour[j];
  array[j] = x1;
  colour[j] = x2;
}

function draw() {
  rotate(3*PI/2);
  translate(-height, -0);
  background(0);
  noStroke();
  for (i = 0; i < length; i++) {
    fill(colour[i][0], colour[i][1], colour[i][2]);
    var w = width / length;
    var h = height / length;
    rect(0, (i)*w, h*(array[i]), w);
  }
  if (b < length) {
    if (a < l) {
      if (array[a] && array[a + 1]) {
        var a1 = array[a];
        var a2 = array[a + 1];
        if (a1 > a2) {
          var temp1 = array[a];
          var temp2 = colour[a];
          array[a] = array[a+1];
          colour[a] = colour[a+1];
          array[a+1] = temp1;
          colour[a+1] = temp2;
        }
      }
      a += 1;
    } else {
      a = 0;
      b += 1;
      l -= 1;
    }
    translate(height, 0);
    rotate(-3*PI/2);
    fill(255);
    var hrs = millis() / 3600000;
    var min = millis() / 60000;
    var sec = millis() / 1000;
    hrs = floor(hrs);
    min = floor(min);
    while (min > 60) {
      min = min - 60;
    }
    while (sec > 60) {
      sec = sec - 60;
    }
    sec = round(100*sec)/100;
    textSize(25);
    text(hrs + ':' + min + ':' + sec, 10, 25);
    text(b, 10, 50);
  } else {
    console.log(hrs + ':' + min + ':' + sec);
    console.log(b)
      while (true) {
    }
  }
};
