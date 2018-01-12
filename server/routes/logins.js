var oracledb = require('oracledb');

var bcrypt = require('bcrypt');

var jwt = require('jsonwebtoken');

var config = require(__dirname + '/config.js');

function post(req, res, next) {

    "use strict";
    
    oracledb.getConnection(

        config.database,

        function(err, connection){

            if (err) {

                return next(err);

            }

            connection.execute(

                'select cust_code as "cust_code", ' +

                '   email as "email", ' +

                '   online_password as "password", ' +

                '   mobile_no as "mobile_no", ' +

                '   photo as "photo" ' +

                'from cms_customers ' +

                'where email = :email',

                {

                    email: req.body.email.toLowerCase()

                },

                {

                    outFormat: oracledb.OBJECT

                },

                function(err, results){

                    var user;

                    if (err) {

                        connection.release(function(err) {

                            if (err) {

                                console.error(err.message);

                            }

                        });

                        return next(err);

                    }

                    user = results.rows[0];

                    bcrypt.compare(req.body.password, user.password, function(err, pwMatch) {

                        var payload;

                        if (err) {

                            return next(err);

                        }

                        if (!pwMatch) {

                            res.status(401).send({message: 'Invalid email or password.'});

                            return;

                        }

                        payload = {

                            sub: user.email,

                            cust_code: user.cust_code,

                            photo: user.photo,

                            mobile_no: user.mobile_no

                        };

                        res.status(200).json({

                            user: user,
                            cust_code: user.cust_code,
                            email: user.email,
                            photo: user.photo,
                            mobile_no: user.mobile_no,
                       

                            token: jwt.sign(payload, config.jwtSecretKey, {expiresInMinutes: 260})

                        });

                    });

                    connection.release(function(err) {

                        if (err) {

                            console.error(err.message);

                        }

                    });

                });

        }

    );

}

module.exports.post = post;