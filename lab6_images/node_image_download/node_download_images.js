let fs = require('fs'),
    request = require('request');

let folder = "downloads";

function downloadImage(uri, filename, callback){
  request.head(uri, function(err, res, body){
    // console.log('content-type:', res.headers['content-type']);
    // console.log('content-length:', res.headers['content-length']);
    request(uri).pipe(fs.createWriteStream( folder + "/" + filename)).on('close', callback);
  });
};

function downloadData() {
  fs.readFile("./data.json", "utf8", (err, data) => {
    if (err) console.log(err);
    console.log(JSON.parse(data));

    JSON.parse(data).forEach(e => {
      // let filename =  e.primaryImage.split('/').pop();
      console.log('Downloading ' + e.filename);
      downloadImage(e.primaryImage, e.filename, function(){
        console.log('Finished Downloading ' + e.filename);
      });
    });

  });
}

downloadData();
