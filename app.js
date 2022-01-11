//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

app.set('view engine', 'ejs'); //here may be a problem

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {

  const day = date.getDate();
  // if need to send only day of the week
  // let day = date.getDay();
  //Пишем логику для определения есть ли такой день в неделе
    // var currentDay = today.getDay();
  // var day = "";
  //mondy-1 thursday-4
  // if (currentDay === 6 || currentDay === 0) {
  //   day = "Weekend";
  //   //res.write("<h1>Yey it's the weekend!</h1>"); //send multiplay pieces of code
  // } else if (currentDay === 1) {
  //   day = "Monday";
  //   //res.write("<p>It is not the weekend!</p>");
  //   //res.write("<h1>Boo! I have to work!</h1>");
  //   //res.send();send finally all message
  //   //res.sendFile(__dirname + "/index.html");//we can send all html page
  // } else if (currentDay === 2) {
  //   day = "Tuesday";
  // } else if (currentDay === 3) {
  //   day = "Wednesday";
  // } else if (currentDay === 4) {
  //   day = "thursday";
  // } else if (currentDay === 5) {
  //   day = "Friday"
  // }

  //if more than 5 else if statment better use switch

  // switch (currentDay) {
  //   case 0:
  //     day = "Sunday";
  //     break;
  //   case 1:
  //     day = "Monday";
  //     break;
  //   case 2:
  //     day = "Tuesday";
  //     break;
  //   case 3:
  //     day = "Wednesday";
  //     break;
  //   case 4:
  //     day = "Thursday";
  //     break;
  //   case 5:
  //     day = "Friday";
  //     break;
  //   case 6:
  //     day = "Saturday";
  //     break;
  //   default:
  //     console.log("Error: current day is equal to: " + currentDay);
  // }

  res.render("list", {
    listTitle: day,
    newListItems: items
  });

});

app.post("/", function(req, res) {

  const item = req.body.newItem;

if (req.body.list === "Work") {
workItems.push(item);
res.redirect("/work");
} else {
  items.push(item);
  res.redirect("/");
}



});

app.get("/work", function(req, res) {
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.post("/work", function(req, res){
  const item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
