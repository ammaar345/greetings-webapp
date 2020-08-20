const express = require("express");
const exphbs = require('express-handlebars');
const bodyParser = require("body-parser")
// 
const app = express();
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
 //
 app.get('/', function (req, res) {
  res.render("index");
})



  const PORT = process.env.PORT || 3011;
app.listen(PORT, function () {

    console.log("App started at port:", PORT);
})