var express = require('express');
var api = require('instagram-node').instagram();
var app = express();

app.configure(function() {
  // The usual...
});

api.use({
  client_id: "4cd57cf891a0441c9a8c77ac40b5babd",
  client_secret: "2da5c2a230944daea58391f075cfd5f9"
});

var redirect_uri = 'http://yoursite.com/handleauth';
var redirect_uri = 'http://printer.indik.dev:8888/instagram/auth';

exports.authorize_user = function(req, res) {
  res.redirect(api.get_authorization_url(redirect_uri, { scope: ['likes'], state: 'a state' }));
};

exports.handleauth = function(req, res) {
  api.authorize_user(req.query.code, redirect_uri, function(err, result) {
    if (err) {
      console.log(err.body);
      res.send("Didn't work");
    } else {
      console.log('Yay! Access token is ' + result.access_token);
      res.send('You made it!!');
    }
  });
};

// This is where you would initially send users to authorize
app.get('/authorize_user', exports.authorize_user);
// This is your redirect URI
app.get('/instagram/auth', exports.handleauth);
console.log(app.get('port'));
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
