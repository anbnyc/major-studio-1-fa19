let met_data;
let img_width = 80;
let margin = 5;
let images = [];
let folder = "images";
let loadedImagesCount = 0;

function setup() {
 	createCanvas(800,600);
  // loading the json data. Since this is asynchronous, we use a callback for loading the images
  met_data = loadJSON("data.json", loadImages);
}

// load all images
function loadImages(){
    for(var i=0; i<met_data.length; i++){
      images[i] = loadImage(folder + "/" + met_data[i].filename,
      function(){
          // since these will load asynchronously, we have to keep track how many images have been loaded
          loadedImagesCount++;

          // once all have been loaded, draw the images
          if(loadedImagesCount==met_data.length){
            drawImages();
          }
      }
    );
    }
}

// draw images in correct aspect ratio to each other
function drawImages() {
  background(0);
  fill(255);
  textSize(8);
  for(var i=0; i<met_data.length; i++){
      // what is the aspect ratio of the image?
      const img_ratio = images[i].height/images[i].width;
      const img_height =  img_width*img_ratio;
      const x = margin +(i*img_width) + (i*margin);
      image(images[i],x,margin, img_width, img_height);
      text(met_data[i].title, x, margin + img_height+margin, img_width,200);
  }
}
