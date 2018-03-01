
router.post('/regs', function post(req, res, next) {


    var user = {

        occurrence_date: req.body.occurrence_date,
        class_code: req.body.class_code,
        policy_no: req.body.policy_no,
        dcon_no: req.body.dcon_no,
        claimant: req.body.claimant,
        narration: req.body.narration,
        cause_code: req.body.cause_code,
        nature_of_accident: req.body.nature_of_accident,
        claim_location: req.body.claim_location,
        claimant_contact: req.body.claimant_contact,
        estimated_loss: req.body.estimated_loss
        
    };
    
            insertUser(user, function (err, user) {

                var payload;

                if (err) {

                    return next(err);

                }

                payload = {

                    sub: user.policy_no,

                    dcon_no: user.dcon_no,

                    lass_code: user.class_code

                };

                res.status(200).json({

                    user: user
                  

                });

            });


// module.exports.post = post;

function insertUser(user, cb) {

    "use strict";
    oracledb.getConnection(connAttrs, function (err, connection) {
        if (err) {
            // Error connecting to DB
            res.set('Content-Type', 'application/json');
            res.status(500).send(JSON.stringify({
                status: 500,
                message: "Error connecting to DB please try after sometimes",
                detailed_message: err.message
            }));
            return;
        }

                connection.execute(

                    'insert into CGIB.CGI_ONLINE_NOTIF_CLAIMS( ' +

                    '   occurrence_date, ' +

                    '   class_code, ' +

                    '   policy_no, ' +

                    '   dcon_no, ' +

                    '   claimant, ' +

                    '   narration, ' +

                    '  cause_code, ' +

                    '  nature_of_accident, ' +

                    '  claim_location, ' +

                    '  estimated_loss, ' +

                    ' claimant_contact ' +

                    ') ' +

                    'values (' +

                    '    :occurrence_date, ' +

                    '    :class_code, ' +

                    '    :policy_no, ' +

                    '   :dcon_no, ' +

                    '  :claimant, ' +

                    '   :narration, ' +

                    '   :cause_code, ' +

                    '   :nature_of_accident, ' +

                    '   :claim_location, ' +

                    '  :estimated_loss, ' +

                    '   :claimant_contact ' +

                    ') ' +

                    'returning ' +

                    '   occurrence_date, ' +

                    '   class_code, ' +

                    '   policy_no, ' +

                    '   dcon_no, ' +

                    '  claimant, ' +

                    '   narration, ' +

                    '  cause_code, ' +

                    '  nature_of_accident, ' +

                    '   claim_location, ' +

                    '  estimated_loss, ' +

                    '   claimant_contact ' +

                    'into ' +

                    '   :roccurrence_date, ' +

                    '   :rclass_code, ' +

                    '   :rpolicy_no, ' +

                    '  :rdcon_no ,' +

                    '  :rclaimant, ' +

                    '   :rnarration, ' +

                    '  :rcause_code, ' +

                    '  :rnature_of_accident, ' +

                    '  :rclaim_location, ' +

                    '  :restimated_loss, ' +

                    '   :rclaimant_contact',


                    {


                        occurrence_date: user.occurrence_date,

                        class_code: user.class_code,

                        policy_no: user.policy_no,

                        dcon_no: user.dcon_no,

                        claimant: user.claimant,

                        narration: user.narration,

                        cause_code: user.cause_code,

                        nature_of_accident: user.nature_of_accident,

                       claim_location: user.claim_location,

                       estimated_loss: user.estimated_loss,

                        claimant_contact: user.claimant_contact,                       
                       

                        roccurrence_date: {

                            type: oracledb.DATE,

                            dir: oracledb.BIND_OUT

                        },

                        rclass_code: {

                            type: oracledb.STRING,

                            dir: oracledb.BIND_OUT

                        },

                        rpolicy_no: {

                            type: oracledb.STRING,

                            dir: oracledb.BIND_OUT

                        },

                        rdcon_no: {

                            type: oracledb.NUMBER,

                            dir: oracledb.BIND_OUT

                        },

                        rclaimant: {

                            type: oracledb.STRING,

                            dir: oracledb.BIND_OUT

                        },

                        rnarration: {

                            type: oracledb.STRING,

                            dir: oracledb.BIND_OUT

                        },

                        rcause_code: {

                            type: oracledb.STRING,

                            dir: oracledb.BIND_OUT

                        },

                        rnature_of_accident: {

                            type: oracledb.STRING,

                            dir: oracledb.BIND_OUT

                        },

                        rclaim_location: {

                            type: oracledb.STRING,

                            dir: oracledb.BIND_OUT

                        },
                        restimated_loss: {

                            type: oracledb.NUMBER,

                            dir: oracledb.BIND_OUT

                        },

                        rlclaimant_contact: {

                            type: oracledb.STRING,

                            dir: oracledb.BIND_OUT

                        }                        

                    },

                    {

                        autoCommit: true

                    },

                    function (err, results) {

                        if (err) {

                            connection.release(function (err) {

                                if (err) {

                                    console.error(err.message);

                                }

                            });

                            return cb(err);

                        }

                        cb(null, {

                            occurrence_date: results.outBinds.roccurrence_date[0],

                            class_code: results.outBinds.rclass_code[0],

                            policy_no: results.outBinds.rpolicy_no[0],

                            dcon_no: results.outBinds.rdcon_no[0],

                            claimant: results.outBinds.rclaimant[0],

                            narration: results.outBinds.rnarration[0],

                            cause_code: results.outBinds.rcause_code[0],

                            nature_of_accident: results.outBinds.rnature_of_accident[0],

                            claim_location: results.outBinds.rclaim_location[0],

                            estimated_loss : results.outBinds.restimated_loss[0],

                           claimant_contact: results.outBinds.rlclaimant_contact[0],
                          
                        });

                        connection.release(
                            function (err) {
                                if (err) {
                                    console.error(err.message);
                                } else {
                                    console.log("POST /regs: Connection released");
                                }
                            });;

                    });

            }

        );


    }
});

