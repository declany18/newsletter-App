// Requesting all the installed modules.

//jshint esversion: 6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

// creating an express app
const app = express();

// naking the static files public
app.use(express.static("public"));

// using the body parser modules
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html")

});

// creating a post route
app.post("/", function(req, res) {
  const  firstName = req.body.fname;
  const  lastName = req.body.lname;
  const  email = req.body.email;

  // creating the data of subscribers

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);
  const url = "https://us21.api.mailchimp.com/3.0/lists/c2019a4ee06";

  const options = {
    method: "POST",
    auth: "Declan1:18a01d2635b2b4db2e7ae525be99ca04-us21"
  }

  const request = https.request(url, options, function(response) {

    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");

    }else{
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", function(data){
      console.log(JSON.parse(data));
    })

  })

  request.write(jsonData);
  request.end();




});

// creating a route for the failure Request
app.post("/failure", function(req, res){
  res.redirect('/');
});

// seeting app to listen on port 3000
app.listen( process.env.PORT|| 3000, function(){
  console.log("Server is running on port 3000");
})

// API KEYS
// 18a01d2635b2b4db2e7ae525be99ca04-us21


// Audience/List  ID
// c2019a4ee0
