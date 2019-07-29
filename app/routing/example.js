// ===============================================================================
// DEPENDENCIES
// We need to include the path package to get the correct file path for our html
// ===============================================================================
var path = require("path");
var friendsArray = require("../data/friends")
// Routes
// =============================================================
module.exports = function (my_app) {
    // used for dumping the friends in json format to the browser
    my_app.get("/api/friends", function (req, res) {
        return res.json(friendsArray);
    });
    // Create New Characters - takes in JSON input
    my_app.post("/api/friends", function (req, res) {
        // req.body hosts is equal to the JSON post sent from the user
        // This works because of our body-parser middleware
        var newFriend = req.body;
        // Using a RegEx Pattern to remove spaces from newCharacter
        // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
        // newCustomer.routeName = newCustomer.name.replace(/\s+/g, "").toLowerCase();
        console.log(newFriend);
        var diffArray = [];
        console.log("friendsArray.length: " + friendsArray.length);
        for (i = 0; i < friendsArray.length; i++) {
            var diff = 0
            console.log("friend array scores " +friendsArray[i].scores.length);
            for (j = 0; j < friendsArray[i].scores.length; j++) {
                diff += Math.abs(friendsArray[i].scores[j] - newFriend.scores[j]);
            console.log('Q number',j,'diff total',diff);
            }
            diffArray.push(diff)
            console.log(diffArray);
        }
        // find the min value of the scores array - lowest value means the best match
        // if there is a tie it will pick the first person
        console.log(Math.min(...diffArray));
        
        var maxIndex = diffArray.indexOf(Math.min(...diffArray));
        console.log(maxIndex);
        console.log(" your best match is " + JSON.stringify(friendsArray[maxIndex]));
        friendsArray.push(newFriend);
        res.json(friendsArray[maxIndex]);
    });
}