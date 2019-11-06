/*
 * Note that this function uses *synchronous* JavaScript
 * If you click the "Click to download" link before all the API calls are finished,
 * the JSON that downloads will only have the data from the calls that did finish
 */

// note that the HTML file already has an anchor tag (<a>) for us to click
const button = document.getElementById('click-to-download');

// endpoint URL
const url = 'https://collectionapi.metmuseum.org/public/collection/v1/objects'

// set up empty Object for us to save results to
const myResults = {}


function fetchUrl(objectId){
    window.fetch(url+'/'+objectId)
        .then(data => data.json())
        .then(data => {
            console.log(objectId, 'complete');
            // save this objectId's data to the myResults object
            if(data.tags.includes("Fish")){
            myResults[objectId] = data;

            // each time we get a result, we are adding it to a Blob
            var json = JSON.stringify(myResults);
            var blob = new Blob([json], {type: "application/json"});
            var url  = URL.createObjectURL(blob);

            // the anchor element from before links to that Blob
            // so when we click it, it will download our JSON
            button.setAttribute("href", url);
            }
        })
}

const myObjectIds = [
  570256,
    10467,
    475427,
    550156,
    42939,
    42942,
    53817,
    24320,
    26557,
    464341,
    450577,
    548409,
    548410,
    551563,
    251558,
    22631,
    547892,
    556122,
    556113,
    587642,
    587643,
    546769,
    551767,
    546742,
    554787,
    702901,
    559355
]

// call the function for each element in the myObjectIds array
myObjectIds.forEach(objectId => {
    fetchUrl(objectId)
})
