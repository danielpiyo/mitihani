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

                'select client_number as "client_number", ' +

                '   branch_agent as "branch_agent", ' +

                '   policy_number as "policy_number", ' +

                '   dcon_no as "dcon_no", ' +

                '   class_description as "class_description" ' +

                '   trans  as "trans", ' +

                '   pol_status as "pol_status", ' +

                '   period_from as " period_from", ' +

                '   period_to as " period_to", ' +

                '   insured_ammount as "insured_ammount" ' +
                
                '   drcr_lc_premium as " drcr_lc_premium", ' +

                '   renewal_date as " renewal_date", ' +

                'from CGIB.ONL_VIEW_ACTIVE_POLICY' +

                'where client_number = :client_number',

                {

                   client_number: req.body.client

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
                                        {
                        var payload;

                        payload = {

                            sub: user.client_number,

                            trans: user.trans,

                            insured_ammount: user.insured_ammount,

                            renewal_date: user.renewal_date

                        };

                        res.status(200).json({

                            user: user,

                            client_number: user.client_number,

                            trans: user.trans,

                            insured_ammount: user.insured_ammount,

                            renewal_date: user.renewal_date,
                       

                            token: jwt.sign(payload, config.jwtSecretKey, {expiresInMinutes: 260})

                        });

                    };

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