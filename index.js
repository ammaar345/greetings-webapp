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
  res.render("index")
})



app.post("/action",function(req,res){
  //console.log(greet.greetings(greet.names()))
 
   greet.greetings(req.body)
   greet.names()
   console.log(greet.names())
 // console.log(req.body)
  res.redirect("/")
  
 })
 app.get("/action",function(req,res){
   res.render("index",{greeting:greet.greetings()})
 })
// console.log(greet.names())




  const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {

    console.log("App started at port:", PORT);
})