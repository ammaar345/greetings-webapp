const express = require("express");
const exphbs = require('express-handlebars');
const bodyParser = require("body-parser")
// 
const app = express();
const Greet=require("./greet");
const greet=Greet();
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
   var count=greet.nameCounter;
  res.render("index",{
counter:count

  })
})


app.post("/greetings",function(req,res){
  
   greet.greetings(req.body.languageType,req.body.name)
  // greet.names()
  var greeting=greet.greetings(req.body.name,req.body.languageType)
 //console.log(req.body)
 greet.names(req.body.name)
//console.log(greet.getNames())
     console.log(greet.getNames())
 // console.log(req.body)
 var count=greet.nameCounter;
 res.render("index",{greeting:greeting,
counter:count})

//console.log(greet.nameCounter())
  // res.redirect("/")
  
 })

 app.post("/"),function(req,res){

 }
//  
 //)(req.body.name,req.body.languageType)
 



  const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {

    console.log("App started at port:", PORT);
})