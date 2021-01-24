var express = require('express');
var exphbs = require('express-handlebars');

var app = express();
var port = process.env.PORT || 3000;
app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(express.static('public'));

app.get(['/', '/home'], function (req, res) {
    res.render('home',{
    });
});

app.get('/strategies', function (req, res) {
    res.render('strategies',{
    });
});

app.get('/hotlines', function (req, res) {
    res.render('hotlines',{
    });
});


app.get('/forum', function (req, res) {
    res.render('forum',{
    });
});

app.get('*', function (req, res) {
    res.render('404');
    res.status(404);
  
  });

app.listen(port, function () {
    console.log("== Server is listening on port", port);
});
