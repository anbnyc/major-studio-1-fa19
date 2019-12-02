var myElement = document.getElementById("eventTarget");
console.log(document, myElement);
// create a simple instance
// by default, it only adds horizontal recognizers
var mc = new Hammer(myElement);

// create a pinch and rotate recognizer
// these require 2 pointers
var pinch = new Hammer.Pinch();
var rotate = new Hammer.Rotate();

// we want to detect both the same time
pinch.recognizeWith(rotate);

// add to the Manager
mc.add([pinch, rotate]);

// listen to events...
mc.on("panleft panright tap press pinch rotate", function(ev) {
  myElement.textContent = ev.type + " gesture detected.";
});
