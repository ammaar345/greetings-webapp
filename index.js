const express = require("express");
const exphbs = require('express-handlebars');
const bodyParser = require("body-parser")
const app = express();
const Greet = require("./greet");
const flash = require('express-flash');
const session = require('express-session');
const { Client } = require('pg');
const connectionString = process.env.DATABASE_URL || "postgresql://sneaky:codex123@localhost:5432/greetings_webapp?";

const client = new Client({
  connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});



const greet = Greet(client);

client.connect(); 
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
app.use(bodyParser.json())
app.get('/', async function (req, res) {
  const counter = await greet.nameCounter()
  res.render("index", {
    counter
  })
})

app.post("/greeting", async function (req, res) {

  const name = req.body.name;
  const username=await (name.charAt(0).toUpperCase() + name.toLowerCase().slice(1));
  const language = req.body.languageType;

  let flash = await greet.flshMsg(name);
  if (flash) {
    req.flash("info", "Enter a name")

  }
  const greeting = await greet.greetUser(name, language);
  await greet.countGreeted(username);
  
  const counter = await greet.nameCounter();
 
  res.render("index", {
    greeting: greeting,
    counter
  })
})
app.post("/reset",async function(req,res){
  await greet.clearDB();
res.redirect("/")
})
app.get("/greeted", async function (req, res) {
  const names = await greet.getNames()
  res.render("actions", {
    keyName: names
  })
})


app.get("/counter/:name", async function (req, res) {

  const name = req.params.name;
  const nameCount = await greet.singleNameCount(name);

  res.render("greet", {
    name,
    nameCount
  }
  )
})

const PORT = process.env.PORT || 3090;
app.listen(PORT, function () {

  console.log("App started at port:", PORT);
})