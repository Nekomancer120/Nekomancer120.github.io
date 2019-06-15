function start() {
  if (sel.value().includes("Random")) {
    rand = true;
  } else {
    rand = false;
  }

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

    var h = 0;
    if (rand) {
      h = random(screen.height);
    } else {
      h = (screen.height/(numOfBars))*(i+1);
    }
    var w = (screen.width/(numOfBars));
    var l = new bar(w, h, col);
    bars.push(l);
    states[i] = -1;
  }

  if (!started) {

    shuffleArray(bars);

    fullscreen(true);
    sel.hide();
    button.hide();
    numBars.hide();
    delIn.hide();
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
  }

  if (sel.value() != "--Sort Method--") {

    if (sel.value() == "Bubble Sort") {
      bubbleSort(bars);
    }

    if (sel.value() == "Bubble Sort (Random)") {
      bubbleSort(bars);
    }

    if (sel.value() == "Quick Sort") {
      quickSort(bars, 0, bar.length - 1);
    }

    if (sel.value() == "Quick Sort (Random)") {
      quickSort(bars, 0, bar.length - 1);
    }
    go = true;
  }
}
