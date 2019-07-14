//////////////////////////
////////////////////////Starting the Quiz set process by a procidure
router.post('/QuestionSet', function (req, res) {
    "use strict";
    console.log('req.body', req.body);
    if ("application/json" !== req.get('Content-Type')) {
        res.set('Content-Type', 'application/json').status(415).send(JSON.stringify({
            status: 415,
            message: "Wrong content-type. Only application/json is supported",
            detailed_message: null
        }));
        return;
    }
    oracledb.getConnection(connAttrs, function (err, connection) {
        if (err) {
            // Error connecting to DB
            res.set('Content-Type', 'application/json').status(500).send(JSON.stringify({
                status: 500,
                message: "Error connecting to DB",
                detailed_message: err.message
            }));
            return;
        }
        console.log('req.body', req.body);
        connection.execute("begin IQUIZ.IQ_APPROVE_PRE_QUIZ (:P_PQH_ID, :P_USER); end;",
             [req.body.pqh_id, req.body.entity_sys_id,],
            {
                autoCommit: true,
                outFormat: oracledb.OBJECT // Return the result as Object
            },
            function (err, result) {
                if (err) {
                    // Error
                    res.set('Content-Type', 'application/json');
                    res.status(400).send(JSON.stringify({
                        status: 400,
                        message: err.message.indexOf("ORA-00001") > -1 ? "Problem Setting the Quiz" : "Setting Quiz Error. Contact systemAdmin",
                        detailed_message: err.message
                    }));
                } else {
                    // Successfully created the resource
                    res.status(201).set('Location', '/query/' + req.body.pqh_id).end();
                }
                // Release the connection
                connection.release(
                    function (err) {
                        if (err) {
                            console.error(err.message);
                        } else {
                            console.log("POST /QuestionSet: Connection released");
                        }
                    });
            });
    });
});


