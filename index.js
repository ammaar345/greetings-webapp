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

//console.log(greet.greeter())
app.get('/', function (req, res) {
  var count = greet.nameCounter;
  res.render("index", {
    counter: count

  })
})


app.post("/greeting", function (req, res) {

  greet.greetings(req.body.languageType, req.body.name)
  // greet.names()
  var name = req.body.name;
  let flash=greet.flshMsg(name)
  
  var greeting = greet.greetings(req.body.name, req.body.languageType)
  //console.log(req.body)
  greet.names(req.body.name)
  //console.log(greet.getNames())
  //console.log(greet.getNames())
  // console.log(greet.getCurrentName())
  // console.log(req.body)
  var count = greet.nameCounter;
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
  res.render("actions",{
  names:names
})


}
  //  
  //)(req.body.name,req.body.languageType)

)


const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {

  console.log("App started at port:", PORT);
})