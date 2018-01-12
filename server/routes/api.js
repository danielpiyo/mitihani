//const express = require('express');
//const router = express.Router();

/* GET api listing. */
//router.get('/', (req, res) => {
 // res.send('api works');
//}); 


const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const oracledb = require('oracledb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require(__dirname + '/config.js');
// Use body parser to parse JSON body
router.use(bodyParser.json());

const connAttrs = {
    "user": "CMAST",
    "password": "INSYNCCMAST",
    "connectString": "192.168.100.15/GENERALDB"
}

// Http Method: GET
// URI        : /user_profiles
// Read all the user profiles
router.get('/', function (req, res) {
    res.sendfile('/')
});

router.get('/pro', function (req, res) {
    "use strict";

    oracledb.getConnection(connAttrs, function (err, connection) {
        if (err) {
            // Error connecting to DB
            res.set('Content-Type', 'application/json');
            res.status(500).send(JSON.stringify({
                status: 500,
                message: "Error connecting to DB",
                detailed_message: err.message
            }));
            return;
        }

        connection.execute("SELECT * FROM CGIB.ONL_VIEW_PRODUCTS", {}, {
            outFormat: oracledb.OBJECT // Return the result as Object
        }, function (err, result) {
            if (err) {
                res.set('Content-Type', 'application/json');
                res.status(500).send(JSON.stringify({
                    status: 500,
                    message: "Error getting the products",
                    detailed_message: err.message
                }));
            } else {
                
                res.contentType('application/json').status(200);
                res.send(JSON.stringify(result.rows));
            }
            // Release the connection
            connection.release(
                function (err) {
                    if (err) {
                        console.error(err.message);
                    } else {
                        console.log("GET /pro : Connection released");
                    }
                });
        });
        
    });
});

//departments
router.get('/dep', function (req, res) {
    "use strict";

    oracledb.getConnection(connAttrs, function (err, connection) {
        if (err) {
            // Error connecting to DB
            res.set('Content-Type', 'application/json');
            res.status(500).send(JSON.stringify({
                status: 500,
                message: "Error connecting to DB",
                detailed_message: err.message
            }));
            return;
        }

        connection.execute("SELECT EMPLOYEE_ID, FIRST_NAME, EMAIL FROM HR.EMPLOYEES WHERE EMPLOYEE_ID >2", {}, {
            outFormat: oracledb.OBJECT // Return the result as Object
        }, function (err, result) {
            if (err) {
                res.set('Content-Type', 'application/json');
                res.status(500).send(JSON.stringify({
                    status: 500,
                    message: "Error getting the departments",
                    detailed_message: err.message
                }));
            } else {
                res.contentType('application/json').status(200);
                res.send(JSON.stringify(result.rows));
            }
            // Release the connection
            connection.release(
                function (err) {
                    if (err) {
                        console.error(err.message);
                    } else {
                        console.log("GET /dep : Connection released");
                    }
                });
        });
        
    });
});


// Http method: GET
// URI        : /userprofiles/:USER_NAME
// Read the profile of user given in :USER_NAME
router.get('/client/:CLIENT_NUMBER', function (req, res) {
    "use strict";

    oracledb.getConnection(connAttrs, function (err, connection) {
        if (err) {
            // Error connecting to DB
            res.set('Content-Type', 'application/json');
            res.status(500).send(JSON.stringify({
                status: 500,
                message: "Error connecting to DB",
                detailed_message: err.message
            }));
            return;
        }

        connection.execute("SELECT * FROM CGIB.ONL_VIEW_ACTIVE_POLICY WHERE client_number = :client_number", [req.params.CLIENT_NUMBER], {
            outFormat: oracledb.OBJECT // Return the result as Object
        }, function (err, result) {
            if (err || result.rows.length < 1) {
                res.set('Content-Type', 'application/json');
                var status = err ? 500 : 404;
                res.status(status).send(JSON.stringify({
                    status: status,
                    message: err ? "Error getting the that Client" : "Client doesn't exist",
                    detailed_message: err ? err.message : ""
                }));
            } else {
                res.contentType('application/json').status(200).send(JSON.stringify(result.rows));
            }
            // Release the connection
            connection.release(
                function (err) {
                    if (err) {
                        console.error(err.message);
                    } else {
                        console.log("GET /client/" + req.params.CLIENT_NUMBER + " : Connection released");
                    }
                });
        });
    });
});

// Http method: POST
// URI        : /user_profiles
// Creates a new user profile

router.post('/job', function (req, res) {
    "use strict";
    console.log('req.body',req.body);
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
        console.log('req.body',req.body);
        connection.execute("INSERT INTO JOBS VALUES " +
            "(:JOB_ID, :JOB_TITLE, :MIN_SALARY, :MAX_SALARY)",
             [req.body.JOB_ID, req.body.JOB_TITLE,
                            req.body.MIN_SALARY, req.body.MAX_SALARY], {
                autoCommit: true,
                outFormat: oracledb.OBJECT // Return the result as Object
            },
            function (err, result) {
                if (err) {
                    // Error
                    res.set('Content-Type', 'application/json');
                    res.status(400).send(JSON.stringify({
                        status: 400,
                        message: err.message.indexOf("ORA-00001") > -1 ? "User already exists" : "Input Error",
                        detailed_message: err.message
                    }));
                } else {
                    // Successfully created the resource
                    res.status(201).set('Location', '/job/' + req.body.JOB_TITLE).end();
                }
                // Release the connection
                connection.release(
                    function (err) {
                        if (err) {
                            console.error(err.message);
                        } else {
                            console.log("POST /job: Connection released");
                        }
                    });
            });
    });
});

//Http Registration of user
// URI : /register

router.post('/register', function (req, res) {
    "use strict";
    console.log('req.body',req.body);
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
        console.log('req.body',req.body);
        //pre('save', function (next) {
          //  var user = this;
            //bcrypt.hash(user.password, 10, function (err, hash){
              //if (err) {
                //return next(err);
            //  }//
              //user.password = hash;
              //next();
           // })
          //});
        connection.execute("INSERT INTO LOGINS VALUES " +
            "(:ID, :EMAIL, :PASSWORD, :ROLE)",
             [req.body.ID, req.body.EMAIL,
                            req.body.PASSWORD, req.body.ROLE], {
                autoCommit: true,
                outFormat: oracledb.OBJECT // Return the result as Object
            },
            function (err, result) {
                if (err) {
                    // Error
                    res.set('Content-Type', 'application/json');
                    res.status(400).send(JSON.stringify({
                        status: 400,
                        message: err.message.indexOf("ORA-00001") > -1 ? "User already exists" : "Input Error",
                        detailed_message: err.message
                    }));
                } else {
                    // Successfully created the resource
                    res.status(201).set('Location', '/register/' + req.body.EMAIL).end();
                }
                // Release the connection
                connection.release(
                    function (err) {
                        if (err) {
                            console.error(err.message);
                        } else {
                            console.log("POST /register: Connection released");
                        }
                    });
            });
    });
});

// Build UPDATE statement and prepare bind variables
const buildUpdateStatement = function buildUpdateStatement(req) {
    "use strict";

    const statement = "",
        bindValues = {};
    if (req.body.DISPLAY_NAME) {
        statement += "DISPLAY_NAME = :DISPLAY_NAME";
        bindValues.DISPLAY_NAME = req.body.DISPLAY_NAME;
    }
    if (req.body.DESCRIPTION) {
        if (statement) statement = statement + ", ";
        statement += "DESCRIPTION = :DESCRIPTION";
        bindValues.DESCRIPTION = req.body.DESCRIPTION;
    }
    if (req.body.GENDER) {
        if (statement) statement = statement + ", ";
        statement += "GENDER = :GENDER";
        bindValues.GENDER = req.body.GENDER;
    }
    if (req.body.AGE) {
        if (statement) statement = statement + ", ";
        statement += "AGE = :AGE";
        bindValues.AGE = req.body.AGE;
    }
    if (req.body.COUNTRY) {
        if (statement) statement = statement + ", ";
        statement += "COUNTRY = :COUNTRY";
        bindValues.COUNTRY = req.body.COUNTRY;
    }
    if (req.body.THEME) {
        if (statement) statement = statement + ", ";
        statement += "THEME = :THEME";
        bindValues.THEME = req.body.THEME;
    }

    statement += " WHERE USER_NAME = :USER_NAME";
    bindValues.USER_NAME = req.params.USER_NAME;
    statement = "UPDATE USER_PROFILES SET " + statement;

    return {
        statement: statement,
        bindValues: bindValues
    };
};

// Http method: PUT
// URI        : /user_profiles/:USER_NAME
// Update the profile of user given in :USER_NAME
router.put('/user_profiles/:USER_NAME', function (req, res) {
    "use strict";

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

        const updateStatement = buildUpdateStatement(req);
        connection.execute(updateStatement.statement, updateStatement.bindValues, {
                autoCommit: true,
                outFormat: oracledb.OBJECT // Return the result as Object
            },
            function (err, result) {
                if (err || result.rowsAffected === 0) {
                    // Error
                    res.set('Content-Type', 'application/json');
                    res.status(400).send(JSON.stringify({
                        status: 400,
                        message: err ? "Input Error" : "User doesn't exist",
                        detailed_message: err ? err.message : ""
                    }));
                } else {
                    // Resource successfully updated. Sending an empty response body. 
                    res.status(204).end();
                }
                // Release the connection
                connection.release(
                    function (err) {
                        if (err) {
                            console.error(err.message);
                        } else {
                            console.log("PUT /user_profiles/" + req.params.USER_NAME + " : Connection released ");
                        }
                    });
            });
    });
});

//Http method: login
//URI : /login


router.post('/login', function (req, res, next) {
    oracledb.getConnection(connAttrs, function (err, connection) {
        if (err) {
            // Error connecting to DB
            res.set('Content-Type', 'application/json');
            res.status(500).send(JSON.stringify({
                status: 500,
                message: "Error connecting to DB",
                detailed_message: err.message
            }));
            return;
        }

            connection.execute(

                'select cust_code as "cust_code", ' +

                '   email as "email", ' +

                '   online_password as "password", ' +

                '   mobile_no as "mobile_no", ' +

                '   photo as "photo", ' +

                '  telephone_no as "telephone_no", ' +

                '   town as "town", ' +

                '   postal_code as "postal_code", ' +

                '   postal_address as "postal_address", ' +

                '   id_type as "id_type", ' +

                '   id_number as "id_number", ' +

                '   first_name as "first_name", ' +

                '  middle_name as "middle_name", ' +

                '   last_name as "last_name", ' +

                '   country as "country", ' +

                '  contact_person as "contact_person", ' +

                '   pin_number as "pin_number", ' +

                '   gender as "gender", ' +

                '  occup_description as "occup_description" ' +

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

                            mobile_no: user.mobile_no,

                            telephone_no: user.telephone_no,

                            town: user.town,

                            postal_code: user.postal_code,

                            postal_address: user.postal_address,

                            id_type: user.id_type,

                            id_number: user.id_number,

                            first_name: user.first_name,

                            middle_name: user.middle_name,

                            last_name: user.last_name,

                            gender : user.gender,

                            pin_number: user.pin_number,

                            contact_person: user.contact_person,

                            occup_description: user.occup_description,

                            country: user.country



                        };

                        res.status(200).json({

                            user: user,
                            cust_code: user.cust_code,
                            
                            email: user.email,

                            photo: user.photo,

                            mobile_no: user.mobile_no,

                            telephone_no: user.telephone_no,

                            town: user.town,

                            postal_code: user.postal_code,

                            postal_address: user.postal_address,

                            id_type: user.id_type,

                            id_number: user.id_number,

                            first_name: user.first_name,

                            middle_name: user.middle_name,

                            last_name: user.last_name,

                            gender : user.gender,

                            pin_number: user.pin_number,

                            contact_person: user.contact_person,

                            occup_description: user.occup_description,

                            country: user.country,

                       

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

});
// Http method: DELETE
// URI        : /userprofiles/:USER_NAME
// Delete the profile of user given in :USER_NAME
router.delete('/user_profiles/:USER_NAME', function (req, res) {
    "use strict";

    oracledb.getConnection(connAttrs, function (err, connection) {
        if (err) {
            // Error connecting to DB
            res.set('Content-Type', 'application/json');
            res.status(500).send(JSON.stringify({
                status: 500,
                message: "Error connecting to DB",
                detailed_message: err.message
            }));
            return;
        }

        connection.execute("DELETE FROM USER_PROFILES WHERE USER_NAME = :USER_NAME", [req.params.USER_NAME], {
            autoCommit: true,
            outFormat: oracledb.OBJECT
        }, function (err, result) {
            if (err || result.rowsAffected === 0) {
                // Error
                res.set('Content-Type', 'application/json');
                res.status(400).send(JSON.stringify({
                    status: 400,
                    message: err ? "Input Error" : "User doesn't exist",
                    detailed_message: err ? err.message : ""
                }));
            } else {
                // Resource successfully deleted. Sending an empty response body. 
                res.status(204).end();
            }
            // Release the connection
            connection.release(
                function (err) {
                    if (err) {
                        console.error(err.message);
                    } else {
                        console.log("DELETE /user_profiles/" + req.params.USER_NAME + " : Connection released");
                    }
                });

        });
    });
});

router.get('/poli', function (req, res, next) {


    
    "use strict";

    oracledb.getConnection(connAttrs, function (err, connection) {
        if (err) {
            // Error connecting to DB
            res.set('Content-Type', 'application/json');
            res.status(500).send(JSON.stringify({
                status: 500,
                message: "Error connecting to DB",
                detailed_message: err.message
            }));
            return;
        }
            connection.execute(
                
                "SELECT * FROM CGIB.ONL_VIEW_ACTIVE_POLICY",
                {},//no binds
                
                
                {

                    outFormat: oracledb.OBJECT

                },

                function(err, results){

                    if (err) {

                        connection.release(function(err) {

                            if (err) {

                                console.error(err.message);

                            }

                        });

                        return next(err);

                    }

                    res.status(200).json(results.rows);

                    connection.release(function(err) {

                        if (err) {

                            console.error(err.message);

                        }

                    });

                }

            );

        }

    );

});

module.exports = router;
