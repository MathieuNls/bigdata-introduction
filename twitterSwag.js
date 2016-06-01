var Twitter = require("ntwitter");
var BinarySearchTree = require('./bst');

var twit = new Twitter({
  consumer_key: "YOURKEYHERE",
  consumer_secret: "YOURKEYHERE",
  access_token_key: "YOURKEYHERE",
  access_token_secret: "YOURKEYHERE"
});

var bst = new BinarySearchTree();
var tweetsArray = [];
var usersIds = [];

//Ask twitter for every public tweet related to the big data track.
//Don't try this with kardashian...
twit.stream("statuses/filter",
  {"track":"big data"},
  function(stream){
    //Each time we got a new tweet
    stream.on('data', function(data){
      //Stream it to hadoop/hbase/mongo or whatever...

      /*
      Here's little use case on when to use/not use big data.
      We store the received tweet in an array,
      which we'll use to apply the map/reduce programming model.
      We also store the tweets in a BST indexed on the user id.
      The goal being to find all the tweets of a given user by
      using map/reduce and the BST.
      Then, we can compare the performances.

      Use Map/Reduce & Big data tools only when your are data are "Big".
      The performances are awful!
       */

      //Store the users' ids in a seperate array
      usersIds.push(data.user.id);
      //bst insertion, indexed on user id.
      bst.insert(data.user.id, data.text);
      //All the tweets for the Map/Reduce
      tweetsArray.push(data);
    });
});

/**
 * Executes a map/reduce and a BST search of a random userId in usersIds
 * each 30 seconds.
 * Displays the time it took for both.
 */
setInterval(function(){

  //Select a random user id
  var randUserId = usersIds[Math.floor(Math.random() * usersIds.length)];
  var tweets = [];

  //it's possible that usersIds is still Empty.
  //in this case randUserId will be undefined.
  if(randUserId !== undefined){

    var start = new Date().getTime();
    //Executes 10000 times to avoid 0ms results
    for (var i = 0; i < 10000; i++) {
      //Map the tweet to extract only the field we care about (userId)
      tweets = tweetsArray.map(function(tweet){
        return{
          userId: tweet.user.id
        }
      //keep only the tweets of randUserId
      }).filter(function(tweet){
        return tweet.userId === randUserId;
      });
      //No need for reduce here as we don't need aggregation.
    }

    console.log('Map Reduce Execution time:', new Date().getTime() - start, "ms. Found ", tweets.length, "tweets for user", randUserId);

    start = new Date().getTime();

    //Executes 10000 times to avoid 0ms results
    for (var i = 0; i < 10000; i++) {
      tweets = bst.search(randUserId);
    }

    console.log('BST Reduce Execution time:', new Date().getTime() - start, "ms. Found ", tweets.length, "tweets for user", randUserId);
  }

}, 30000);
