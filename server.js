var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var project_folder = __dirname;
var app = express();


function sendFile(res,file){
  res.sendFile(project_folder+'/htdocs/'+file);
}

app.get('/', function (req, res) {
  sendFile(res,'index.html');
});

app.get('/chat/', function (req, res) {
  sendFile(res,'chat.html');
});

app.get('/test/', function (req, res) {
  sendFile(res,'nuance.html');
});

app.use(bodyParser.json());
app.use(express.static(project_folder + '/htdocs'));
//app.use(express.static(project_folder + '/htdocs/lib'));

app.set('json spaces', 0);


app.use(bodyParser.urlencoded({     // to suppor t URL-encoded bodies
  extended: true
}));

app.post('/intents', function (req, res) {
    res.json({ a: 1 });
});

app.listen(process.env.PORT || 3010);

var basicAuth = require('basic-auth');

var auth = function (req, res, next) {
  function unauthorized(res) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.send(401);
  };

  var user = basicAuth(req);

  if (!user || !user.name || !user.pass) {
    return unauthorized(res);
  };

  if (user.name === 'foo' && user.pass === 'bar') {
    return next();
  } else {
    return unauthorized(res);
  };
};