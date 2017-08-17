var express = require('express'),
    app = require('express')(),
    server = require('http').createServer(app);

app.set('port', (process.env.PORT || 80));

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render('pages/index');
});

server.listen(app.get('port'), function() {
  console.log('App is running on port', app.get('port'));
});