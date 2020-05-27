var express = require('express');
var app = express(0); // create the app
/***************************************
 /** configuration*/
  /********************************/


// enable CORS
// FOR TEST ONLY (not in production)
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, PATCH, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Rquested-With, Content-Type, Accept");
    next();
});

// config body-parser to read request payload
var bparser = require('body-parser');
app.use(bparser.json());



// render html using ejs\
var ejs = require('ejs');
console.log(__dirname);
app.set('views',__dirname + '/public')
app.engine('html', ejs.renderFile);
app.set('view engine', ejs);


//To server static files (css, js, images, pdf, doc,...)
app.use(express.static(__dirname + '/public/'));



/***************************************
 * Web Server endpoints
 ********************************/


app.get('/', function(req, res){
    res.render('index.html');
});

app.get('/admin', function (req, res) {
    res.render('admin.html');
});

app.get('/about', function(req, res){
    res.render('about.html');
});

app.get('/contact', (req, res) =>{
    res.render('contact.html');
});

/**
 * create the about.html
 * put some content inside the html
 * render the about.html below*/




/****************************************
 * Rest API endpoint
***************************************/

var db = [];
var lastId = 1;
app.post('/api/items', (req, res) => {
    var item = req.body;
    
    // assign a unique ID
    item.id =
    lastId += 1;
    
    // save the object
    db.push(item);

    res.status(201); // Created!
    res.json(item);
});

app.get('/api/items', (req, res) =>{
    console.log("Client wants the DB");
    res.json(db);
});

//run the server
// Localhost -> myself (computer)
// 127.0.0.1 [home] -> myself 
 app.listen(8080, function(){
     console.log("Server running at http://localhost:8080");
 });