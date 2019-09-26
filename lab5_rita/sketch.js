let input;
let button;
let lexicon;

function setup() {
    // we are using p5.dom, so no canvas, just html
    noCanvas();
    lexicon = new RiLexicon();

    // create an html input field
    input = createInput("Hello world");
    button = createButton("Submit");
    button.mousePressed(processRita);
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
        if (pos[i] === 'nn'){
          output += lexicon.randomWord('nn');
        }else{
          output += words[i];
        }
        output += ' ';
    }
    createP(output);
}
