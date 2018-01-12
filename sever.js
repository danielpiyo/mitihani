var express = require('express');

var morgan = require('morgan');

var bodyParser = require('body-parser');

var cors = require('cors');

var auth = require(__dirname + '/server/routes/auth.js');

//var publicThings = require(__dirname + '/routes/publicThings.js');

var poli = require(__dirname + '/server/routes/poli.js');
//const api = require('./server/routes/api');

var users = require(__dirname + '/server/routes/users.js');

var logins = require(__dirname + '/server/routes/logins.js');

var app;

var router;

var port = 3000;

app = express();

app.use(cors());

app.use(morgan('combined')); //logger

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


router = express.Router();
//app.use(express.static(path.join(__dirname, 'dist')));

//router.get('/public_things', publicThings.get);

router.get('/poli', auth(), poli.get);

router.get('/poli2', auth('10100193'), poli.get);

//router.get('/protected_things2', auth('ADMIN'), protected.get);

router.post('/users', users.post);

router.post('/logins', logins.post);

app.use('/api', router);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
  

app.listen(port, function() {

    console.log('Web server listening on localhost:' + port);

});