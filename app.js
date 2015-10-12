/* Streaming app */
var keywords = ['#perustulo', 'perustulo', '#basicincome', 'basic income']; //keywords to be collected
var db_collection_name = 'tweets'; //name of collection in MongoDB

// Are we running in prod?
var prod = false;

var Twit = require('twit');
var env = require('node-env-file');
env(__dirname + '/.env');

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = '';
var dev_url = process.env.LOCALDB;
var prod_url = process.env.REMOTEDB;

var c_k = process.env.CONSUMER_KEY;
var c_s = process.env.CONSUMER_SECRET;
var a_t = process.env.ACCESS_TOKEN;
var a_t_s = process.env.ACCESS_TOKEN_SECRET;

if (prod === true) {
  url = prod_url;
} else {
  url = dev_url;
};

console.log("Using "+c_k+" as Twitter Consumer Key.");
console.log("Using "+url+" as MongoDB connection url.");

/* Twitter Streaming API with Twit */
var T = new Twit({
    consumer_key:         c_k
  , consumer_secret:      c_s
  , access_token:         a_t
  , access_token_secret:  a_t_s
});
var stream = T.stream('statuses/filter', { track: keywords });
console.log("Stream setup --- " + new Date());
/* Stream event handler */

stream.on('error', function(error){
  console.log("An error occurred: "+ error.message);
})

stream.on('tweet', function (tweet) {
  console.log("A new tweet incoming from stream --- " + new Date());

  // Use connect method to connect to the Server
  MongoClient.connect(url, function(err, db) {
    insertDocuments(db, function() {
      db.close();
    });
  });

  var insertDocuments = function(db, callback) {
    // Get the documents collection
    var collection = db.collection(db_collection_name);
    // Insert the tweet into the document
    collection.insert(tweet, function(err, result) {
      console.log('Inserted a new tweet into MongoDB --- ' + new Date());
      callback(result);
    });
  }

})
