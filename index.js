const express = require("express");
const exphbs = require('express-handlebars');
const bodyParser = require("body-parser")
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
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({
  layoutsDir: './views/layouts'
}));
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


app.get('/',async function (req, res) {
  //var counter = greet.nameCounter()
  
  var counter=await greet.nameCounter()//pool.query('select times_greeted as counter from names')//('select id ,name ,times_greeted as counter from names')
  res.render("index", {
    counter
  })
  
})

app.post("/greeting", async function (req, res) {

  var name = req.body.name;
  var language = req.body.languageType;

  let flash = await greet.flshMsg(name);
  var greeting = await greet.greetUser(name, language);

  var count = await greet.nameCounter();
  if (flash) {
    req.flash("info", "Enter a name")

  }


  res.render("index", {
    greeting: greeting
    ,
    counter: count

  })
})

app.get("/greeted",async function (req, res) {
  var names = await greet.getNames()
  res.render("actions", {
    names: names
  })
})


app.get("/counter/:name",async function (req, res) {

  var name = req.params.name;
  var nameCount =await greet.singleNameCount(name);

  res.render("greet", {
    name,
    nameCount
  }
  )
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {

  console.log("App started at port:", PORT);
})