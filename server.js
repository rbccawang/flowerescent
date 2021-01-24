var express = require('express');
var exphbs = require('express-handlebars');
var messageData = require('./messages.json');
var fs = require('fs');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.use(express.json());

var port = process.env.PORT || 3000;

app.get(['/', '/home'], function (req, res) {
    res.render('home',{
    });res.status(200);
});

app.get('/strategies', function (req, res) {
    res.render('strategies',{
    });res.status(200);
});

app.get('/hotlines', function (req, res) {
    res.render('hotlines',{
    });res.status(200);
});
app.get('/forum', function (req, res) {

    res.render('forum',{
        Mdata: messageData,
        chat: true
        
    });res.status(200);
});
app.post('/forum/save', function (req, res) {
    messageData.push(req.body)
    fs.writeFileSync('./messages.json', JSON.stringify(messageData));
    res.status(200).send("Message successfully added");
  })

app.get('*', function (req, res) {
    res.render('404');
    res.status(404);
  
  });

app.listen(port, function () {
    console.log("== Server is listening on port", port);

});
