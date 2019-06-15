function bar(w, h, color) {
  this.width = w;
  this.height = h;
  this.color = color;

  this.show = function(position) {
    this.position = position;
    noStroke();
    fill(this.color);
    rect(this.position.x, this.position.y, this.width, this.height);
  }
};
