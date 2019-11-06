/*
 * Note that this function uses *synchronous* JavaScript
 * There is a 2-second (2000 milliseconds) timer after which the JSON will be downloaded
 * so if the API calls are not finished by then, the JSON will only have the ones that did finish.
 * You can increase the timer if you need to.
 */

// load a default library that lets us read/write to the file system
var fs = require('fs')
// load a default library that lets us make HTTP requests (like calls to an API)
var request = require('request')

// endpoint URL
const url = 'https://collectionapi.metmuseum.org/public/collection/v1/objects'

// set up empty Object for us to save results to
const myResults = {}

function fetchUrl(objectId){
    request(url + '/' + objectId, function (error, response, body) {
      console.error('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      
      // save this objectId's data to the myResults object
      myResults[objectId] = body;
    });
}

const myObjectIds = [
570256,
   329077,
   503651,
   436098,
   551786,
   327480,
   472562,
   317877,
   547664,
   210103,
   544740,
   310599,
   321287,
   310364,
   437422,
   435848,
   39931,
   53241,
   53660,
   459027,
   459028,
   544320,
   546037,
   444605,
   207397,
   192770,
   338694,
   438821,
   436102,
   460281,
   452102,
   314217,
   36131,
   53408,
   549236,
   451725,
   473801,
   435997,
   437585,
   451752,
   454699,
   437508,
   712539,
   39901,
   671055,
   444532,
   787939,
   823764,
   823763,
   383883,
   811772,
   811771,
   430812,
   452032,
   397615,
   316555,
   53427,
   436950,
   436803,
   436838,
   736196,
   435621,
   670541,
   775336,
   322244,
   759529,
   822751,
   436951,
   39654,
   380481,
   44759,
   53455,
   671043,
   670542,
   670540,
   452740,
   436658,
   40080,
   435844,
   824771,
   436105,
   40057,
   454619,
   435702,
   436529,
   437878,
   450724,
   228995,
   60470,
   313325,
   626692,
   452364,
   53238,
   228990,
   49187,
   53162,
   435991,
   453385,
   437868,
   453334,
   53194,
   436884,
   436885,
   435864,
   437873,
   453267,
   437159,
   319873,
   451287,
   453265,
   453193,
   453212,
   53226,
   453895,
   39895,
   733847,
   448280,
   437936,
   450761,
   450605,
   437059,
   435678,
   437061,
   436548
]

// call the function for each element in the myObjectIds array
myObjectIds.forEach(objectId => {
    fetchUrl(objectId)
})

// the function inside the setTimeout saves myResults to a JSON
// it will automatically run after 2000 ms
setTimeout(() => {
    fs.writeFileSync('./data.json', JSON.stringify(myResults), 'utf8')
}, 2000)