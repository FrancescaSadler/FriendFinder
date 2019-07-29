var friends = require("../data/friends");
var path = require("path");
module.exports = function(app){
    app.get("/api/friends", function(req, res){
        res.send(friends)
    })

    // app.get("/api/responses", function(req, res){
    //     res.send(responses)
    // })

    // app.post("/api/responses", function (req,res){
    //     responses.push(req.body);
    //     res.send(true);
    // })

    app.post("/api/friends", function (req,res){
        console.log("text",req.body)

        // loops through scores turns them into numbers 
        var scores = req.body.scores
        var newArray = [];
        for (var i = 0; i < scores.length; i++) {
          newArray.push(parseInt(scores[i]))
        }
        console.log(newArray);
        // responses.push(req.body);

        // put in for loop 
        

        //return the friend that matches and will add to friends.js file
        
        // res.send(friends);
        
    // });

    var bestMatch = {
      name: "",
      photo: "",
      friendDifference: Infinity
    };

    // Here we take the result of the user"s survey POST and parse it.
    var newArray = req.body;
    var userScores = newArray.scores;

    // This variable will calculate the difference between the user"s scores and the scores of
    // each user in the database
    var totalDifference;

    // Here we loop through all the friend possibilities in the database.
    for (var i = 0; i < friends.length; i++) {
      var currentFriend = friends[i];
      totalDifference = 0;

      console.log(currentFriend.name);

      // We then loop through all the scores of each friend
      for (var j = 0; j < currentFriend.scores.length; j++) {
        var currentFriendScore = currentFriend.scores[j];
        var currentUserScore = userScores[j];
        //is console loggin back the user input data and the db data
        // console.log(currentFriendScore);
        // console.log(currentUserScore);


        // We calculate the difference between the scores and sum them into the totalDifference
        totalDifference += Math.abs(parseInt(currentUserScore) - parseInt(currentFriendScore));
      }
      console.log(totalDifference);

      // If the sum of differences is less then the differences of the current "best match"
      if (totalDifference <= bestMatch.friendDifference) {
        // Reset the bestMatch to be the new friend.
        bestMatch.name = currentFriend.name;
        bestMatch.photo = currentFriend.photo;
        bestMatch.friendDifference = totalDifference;
      }
    }

    // Finally save the user's data to the database (this has to happen AFTER the check. otherwise,
    // the database will always return that the user is the user's best friend).
    // friends.push(newArray);
    // console.log(newArray, "saves user data")
   
  

    // Return a JSON with the user's bestMatch. This will be used by the HTML in the next page
    res.json(bestMatch);

  });
}