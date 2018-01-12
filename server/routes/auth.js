var jwt = require('jsonwebtoken');

var config = require(__dirname + '/config.js');

function auth(cust_code) {

    return function(req, res, next) {

        var token;

        var payload;

        if (!req.headers.authorization) {

            return res.status(401).send({message: 'You are not authorized'});

        }

        token = req.headers.authorization.split(' ')[1];

        try {

            payload = jwt.verify(token, config.jwtSecretKey);

        } catch (e) {

            if (e.name === 'TokenExpiredError') {

                res.status(401).send({message: 'Token Expired'});

            } else {

                res.status(401).send({message: 'Authentication failed'});

            }

            return;

        }

        if (!cust_code|| cust_code === payload.cust_code) {

            //pass some user details through in case they are needed

            req.user = {

                email: payload.sub,

                cust_code: payload.cust_code

            };

            next();

        } else {

            res.status(401).send({message: 'You are not authorized'});

        }

    }

}

module.exports = auth;