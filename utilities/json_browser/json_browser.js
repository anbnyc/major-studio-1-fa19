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
            myResults[objectId] = data;
            
            // each time we get a result, we are adding it to a Blob
            var json = JSON.stringify(data);
            var blob = new Blob([json], {type: "application/json"});
            var url  = URL.createObjectURL(blob);
            
            // the anchor element from before links to that Blob
            // so when we click it, it will download our JSON
            button.setAttribute("href", url);
        })
}

const myObjectIds = [479808,
    479830,
    479831,
    479833,
    479837,
    479846,
    479847
]

// call the function for each element in the myObjectIds array
myObjectIds.forEach(objectId => {
    fetchUrl(objectId)
})