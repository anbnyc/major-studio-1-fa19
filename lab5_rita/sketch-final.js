/*
Example by Dan Shiffman:
https://www.youtube.com/watch?v=lIPEvh8HbGQ
*/

let input;
let button;
let lexicon;

function setup() {
    // we are using p5.dom, so no canvas, just html
    noCanvas();
    lexicon = new RiLexicon();

    // create an html input field
    input = createInput("It was a long and winding road");
    button = createButton("Submit");
    button.mousePressed(processRita);
    input.changed(processRita);
    input.size(300);
}

function processRita() {
    // str is the value we get from the input
    let str = input.value();

    // turning the string into a Rita String
    let rs = RiString(str);
    let words = rs.words();
    var pos = rs.pos();
    console.log(words);

    let output = '';

    for (var i = 0; i < words.length; i++) {
        if (pos[i] === 'nn' || pos[i] === 'nns' ){
          output += lexicon.randomWord('nn');
        }else{
          output += words[i];
        }
        output += ' ';
    }
    createP(output);
}
