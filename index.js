const express = require("express");
const exphbs = require('express-handlebars');
const bodyParser = require("body-parser")
// 
const app = express();
const Greet = require("./greet");
const flash = require('express-flash');
const session = require('express-session');
const greet = Greet();
app.use(session({
  secret: "<add a secret string here>",
  resave: false,
  saveUninitialized: true
}));
app.use(flash());
// const flash = require('express-flash');
// const session = require('express-session');
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({
  layoutsDir: './views/layouts'
}));
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.get('/', function (req, res) {
  var count = greet.nameCounter;
  res.render("index", {
    counter: count

  })
})
app.get("/greeting",function(req,res){


})
app.get("/counter",function(req,res){
  //greet.names()
var name =req.body.name;
greet.singleNameCount(name)
  var nameStore = greet.singleNameCount(name);
  res.render("greet",{
nameCount :nameStore

})
//console.log(req.params)
})

app.post("/greeting", function (req, res) {

  greet.greetUser(req.body.languageType, req.body.name)
  // greet.names()
  var name = req.body.name;
  let flash=greet.flshMsg(name)
  
  var greeting = greet.greetUser(req.body.name, req.body.languageType)
  greet.names(name);
  var count = greet.nameCounter();
  if (flash){
req.flash("info","enter name")

  }
  res.render("index", {
    greeting: greeting,
    counter: count,
    name: name
    
  })
  console.log(name)
  //console.log(greet.nameCounter())
  // res.redirect("/")

})
app.get("/greeted", function (req, res) {
var names=greet.getNames()
greet.names()
//greet.greetings(req.body.name, req.body.languageType)
  res.render("actions",{
  names:names
})
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {

  console.log("App started at port:", PORT);
})