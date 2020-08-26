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
  var name = req.body.name;
  var language = req.body.languageType;
  // greet.names(name)

  var counter = greet.nameCounter()
  var greeted = greet.greetUser(name, language)
  //var count = greet.nameCounter();
  //   console.log(greet.names(name))
  //  console.log(greet.map())

  res.render("index", {
    greeting: greeted,
    counter: counter
  })
})

app.post("/greeting", function (req, res) {

  greet.greetUser(req.body.languageType, req.body.name)
  // greet.names()
  var name = req.body.name;
  var greeting = greet.greetUser(req.body.name, req.body.languageType)
  
  let flash = greet.flshMsg(name);
  greet.names(name);
  var count = greet.nameCounter();
  // if (flash) {
  //   req.flash("info", "enter name")

  // }
  res.render("index", {
    greeting: greeting,
    counter: count
    // name: name

  })
  console.log(name)
  //console.log(greet.nameCounter())
  // res.redirect("/")

})

app.get("/greeted", function (req, res) {
  var names = greet.getNames()
  // greet.names()
  //greet.greetings(req.body.name, req.body.languageType)
  res.render("actions", {
    names: names
  })
})


app.get("/counter/:name", function (req, res) {
  //greet.names()
  var name = req.params.name;
  //greet.singleNameCount(name)
 // var userName = req.body.name
  var nameCount = greet.singleNameCount(name);

  res.render("greet", {
    name,
    nameCount
  }
  )
  //console.log(req.params)
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {

  console.log("App started at port:", PORT);
})