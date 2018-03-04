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
const multer = require('multer');
var cors = require('cors');    
app.use(cors({credentials: true, origin: 'http://localhost:4200'}));
// Use body parser to parse JSON body
router.use(bodyParser.json());

const connAttrs = {
    "user": "CMAST",
    "password": "INSYNCCMAST",
    "connectString": "173.255.200.221/XE"
}

const store = multer.diskStorage ({
    destination: function(req,file, cb){
        cb(null, './uploads');},
        filename: function(req,file,cb){
            cb(null, Date.now() + '.' + file.originalname)
        }
    }
);

const upload = multer({storage:store}).single('file');

// Http Method: GET
// URI        : /user_profiles
// Read all the user profiles
router.get('/', function (req, res) {
    res.sendfile('/')
});


router.post('/upload', function(req, res, next){
    upload(res, req, function(err){
        if(err){
            return res.status(501).json({error:err});
        }
        return res.json({originalname:req.file.originalname, uploadname:req.file.filename});
    });

});

///quatation products listings

router.get('/cat', function (req, res) {
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

        connection.execute("SELECT TO_CHAR(CLASS) CLASS_ID, DESCRIPTION FROM CGIB.CLASS WHERE CLASS_ACTIVE = 'Y' ORDER BY CLASS", {}, {
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
                        console.log("GET /cat : Connection released");
                    }
                });
        });

    });
}); 

//selecting class group of the products
router.get('/cls/:CLASS_ID', function (req, res) {
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

        connection.execute("SELECT CLASSGRP CODE, GROUP_DESCRIPTION DESCRIPTION FROM CGIB.CLASSGRP WHERE CLASS = :CLASS_ID", [req.params.CLASS_ID], {
            outFormat: oracledb.OBJECT // Return the result as Object
        }, function (err, result) {
            if (err || result.rows.length < 1) {
                res.set('Content-Type', 'application/json');
                var status = err ? 500 : 404;
                res.status(status).send(JSON.stringify({
                    status: status,
                    message: err ? "Error getting the that PRODUCT" : "PRODUCT doesn't exist",
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
                        console.log("GET /cls/" + req.params.CLASS_ID + " : Connection released");
                    }
                });
        });
    });
});

//selecting sub section of the products
///
router.get('/sub/:CLASS_ID/:CODE', function (req, res) {
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

        connection.execute("SELECT SECTION_NO, SECTION_DESCRIPTION FROM CGIB.CLASSSECT WHERE CLASS = :CLASS_ID AND CLASSGRP = :CODE", [req.params.CLASS_ID, req.params.CODE], {
            outFormat: oracledb.OBJECT // Return the result as Object
        }, function (err, result) {
            if (err || result.rows.length < 1) {
                res.set('Content-Type', 'application/json');
                var status = err ? 500 : 404;
                res.status(status).send(JSON.stringify({
                    status: status,
                    message: err ? "Error getting the that PRODUCT" : "PRODUCT doesn't exist",
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
                        console.log("GET /sub/" + req.params.CLASS_ID + req.params.CODE + " : Connection released");
                    }
                });
        });
    });
});

//viewing products from db
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


/////
/// Nature of Accident 
router.get('/nature', function (req, res) {
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

        connection.execute("SELECT CODE_DESCRIPTION, CODE_ID FROM CGIB.CGI_GENERAL_CODES WHERE CODE_TYPE = 'NATURE_OF_ACCIDENT' AND NVL(FROZEN,'X') != 'Y'", {}, {
            outFormat: oracledb.OBJECT // Return the result as Object
        }, function (err, result) {
            if (err) {
                res.set('Content-Type', 'application/json');
                res.status(500).send(JSON.stringify({
                    status: 500,
                    message: "Error getting the Nature of Accident",
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
                        console.log("GET /nature : Connection released");
                    }
                });
        });

    });
});

/////
//////Accident causes Selection
router.get('/causes', function (req, res) {
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

        connection.execute("SELECT CODE_DESCRIPTION, CODE_ID FROM CGIB.CGI_GENERAL_CODES WHERE CODE_TYPE = 'CLAIM_CAUSE_CODES' AND NVL(FROZEN,'X') != 'Y'", {}, {
            outFormat: oracledb.OBJECT // Return the result as Object
        }, function (err, result) {
            if (err) {
                res.set('Content-Type', 'application/json');
                res.status(500).send(JSON.stringify({
                    status: 500,
                    message: "Error getting the Causes of Accident",
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
                        console.log("GET /causes : Connection released");
                    }
                });
        });

    });
});



// Http method: GET
// URI        : /client/:client_number
// Read the active policies of user given in :client_number
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


///Viewing Quotations as per the client no
router.get('/myquote/:CLIENT_NUMBER', function (req, res) {
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

        connection.execute("SELECT * FROM CGIB.ONL_VIEW_QUOTATIONS WHERE client_number = :client_number", [req.params.CLIENT_NUMBER], {
            outFormat: oracledb.OBJECT // Return the result as Object
        }, function (err, result) {
            if (err || result.rows.length < 1) {
                res.set('Content-Type', 'application/json');
                var status = err ? 500 : 404;
                res.status(status).send(JSON.stringify({
                    status: status,
                    message: err ? "Error getting the that Quotation" : "Quotation doesn't exist",
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
                        console.log("GET /myquote/" + req.params.CLIENT_NUMBER + " : Connection released");
                    }
                });
        });
    });
});

/////////////////
////////////////// Viewing More details of quatation
///Viewing Quotations as per the client no
router.get('/morequote/:CLIENT_NUMBER/:DCON_NO', function (req, res) {
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

        connection.execute("SELECT * FROM CGIB.ONL_VIEW_QUOTATIONS WHERE client_number = :client_number AND dcon_no = :dcon_no", [req.params.CLIENT_NUMBER, req.params.DCON_NO], {
            outFormat: oracledb.OBJECT // Return the result as Object
        }, function (err, result) {
            if (err || result.rows.length < 1) {
                res.set('Content-Type', 'application/json');
                var status = err ? 500 : 404;
                res.status(status).send(JSON.stringify({
                    status: status,
                    message: err ? "Error getting the that Quotation" : "Quotation doesn't exist",
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
                        console.log("GET /morequote/" + req.params.CLIENT_NUMBER + req.params.DCON_NO + " : Connection released");
                    }
                });
        });
    });
});


/////////////////
////////////////// Viewing More details of quatation
///Viewing Quotations as per the client no
router.get('/morepol/:CLIENT_NUMBER/:DCON_NO', function (req, res) {
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

        connection.execute("SELECT * FROM CGIB.ONL_VIEW_ACTIVE_POLICY WHERE client_number = :client_number AND dcon_no = :dcon_no", [req.params.CLIENT_NUMBER, req.params.DCON_NO], {
            outFormat: oracledb.OBJECT // Return the result as Object
        }, function (err, result) {
            if (err || result.rows.length < 1) {
                res.set('Content-Type', 'application/json');
                var status = err ? 500 : 404;
                res.status(status).send(JSON.stringify({
                    status: status,
                    message: err ? "Error getting the that Policy" : "Policy doesn't exist",
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
                        console.log("GET /morepol/" + req.params.CLIENT_NUMBER + req.params.DCON_NO + " : Connection released");
                    }
                });
        });
    });
});


// Http method: POST
// URI        : /user inquiries


router.post('/query', function (req, res) {
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
        connection.execute("INSERT INTO CGIB.CGI_ONLINE_INQUIRY (CUST_CODE, ISSUE_CATEGORY, NARRATION, EMAIL) VALUES " +
            "(:CUST_CODE, :ISSUE_CATEGORY, :NARRATION, :EMAIL)",
            [req.body.CUST_CODE, req.body.ISSUE_CATEGORY, req.body.NARRATION, req.body.EMAIL,],
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
                        message: err.message.indexOf("ORA-00001") > -1 ? "Problem posting your query contact systemadmin" : "Input Error",
                        detailed_message: err.message
                    }));
                } else {
                    // Successfully created the resource
                    res.status(201).set('Location', '/query/' + req.body.ISSUE_CATEGORY).end();
                }
                // Release the connection
                connection.release(
                    function (err) {
                        if (err) {
                            console.error(err.message);
                        } else {
                            console.log("POST /query: Connection released");
                        }
                    });
            });
    });
});

////////
//////Claim submission 

router.post('/claim', function (req, res) {
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
        connection.execute("INSERT INTO CGIB.CGI_ONLINE_NOTIF_CLAIMS (RISK_ID, PDOC_NO, OCCURRENCE_DATE, CLASS_CODE, POLICY_NO, DCON_NO, CLAIMANT, NARRATION, CAUSE_CODE, NATURE_OF_ACCIDENT, CLAIM_LOCATION, ESTIMATED_LOSS, CREATED_BY) VALUES " +
            "(:RISK_ID, :PDOC_NO, TO_DATE(:OCCURRENCE_DATE,'YYYY-MM-DD'), :CLASS_CODE, :POLICY_NO, :DCON_NO, :CLAIMANT, :NARRATION, :CAUSE_CODE, :NATURE_OF_ACCIDENT, :CLAIM_LOCATION, :ESTIMATED_LOSS, :CREATED_BY)",
            [req.body.RISK_ID, req.body.PDOC_NO, req.body.OCCURRENCE_DATE, req.body.CLASS_CODE, req.body.POLICY_NO, req.body.DCON_NO, req.body.CLAIMANT, req.body.NARRATION, req.body.CAUSE_CODE, req.body.NATURE_OF_ACCIDENT, req.body.CLAIM_LOCATION, req.body.ESTIMATED_LOSS, req.body.CLAIMANT,],
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
                        message: err.message.indexOf("ORA-00001") > -1 ? "Problem posting your Claim contact systemadmin" : "Input Error",
                        detailed_message: err.message
                    }));
                } else {
                    // Successfully created the resource
                    res.status(201).set('Location', '/claims/' + req.body.POLICY_NO).end();
                }
                // Release the connection
                connection.release(
                    function (err) {
                        if (err) {
                            console.error(err.message);
                        } else {
                            console.log("POST /claim: Connection released");
                        }
                    });
            });
    });
});




/////////////////////////
/////////////////////// File upload (Quotation documents)

router.post('/qupload', function (req, res) {
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
        connection.execute("INSERT INTO CGIB.CGI_UW_DOCS (DCON_NO, DOC_NAME, SUBMITED_BY, CREATED_BY, DATE_SUBMITED, DATE_CREATED) VALUES " +
            "(:DCON_NO, :DOC_NAME, :SUBMITED_BY, :CREATED_BY, SYSDATE, SYSDATE)",
            [req.body.DCON_NO, req.body.FILE_NAME, req.body.FIRST_NAME, req.body.FIRST_NAME],
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
                        message: err.message.indexOf("ORA-00001") > -1 ? "Problem posting your Claim contact systemadmin" : "Input Error",
                        detailed_message: err.message
                    }));
                } else {
                    // Successfully created the resource
                    res.status(201).set('Location', '/qupload/' + req.body.DCON_NO).end();
                }
                // Release the connection
                connection.release(
                    function (err) {
                        if (err) {
                            console.error(err.message);
                        } else {
                            console.log("POST /qupload: Connection released");
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
        console.log('req.body', req.body);

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

            function (err, result) {
                if (err || result.rows.length < 1) {
                    res.set('Content-Type', 'application/json');
                    var status = err ? 500 : 404;
                    res.status(status).send(JSON.stringify({
                        status: status,
                        message: err ? "Error getting the that email" : "Email you have entered is Incorrect. Kindly Try Again. or Contact systemadmin",
                        detailed_message: err ? err.message : ""
                    }));

                    return next(err);

                }

                user = result.rows[0];




                bcrypt.compare(req.body.password, user.password, function (err, pwMatch) {

                    var payload;

                    if (err) {

                        return next(err);

                    }

                    if (!pwMatch) {

                        res.status(401).send({ message: 'Wrong Password. please Try Again .' });

                        return;

                    }

                    payload = {

                        sub: user.email,

                        // password : user.password,

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

                        gender: user.gender,

                        pin_number: user.pin_number,

                        contact_person: user.contact_person,

                        occup_description: user.occup_description,

                        country: user.country



                    };

                    res.status(200).json({

                        user: user,

                        cust_code: user.cust_code,

                        email: user.email,

                        // password : user.password,

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

                        gender: user.gender,

                        pin_number: user.pin_number,

                        contact_person: user.contact_person,

                        occup_description: user.occup_description,

                        country: user.country,



                        token: jwt.sign(payload, config.jwtSecretKey, { expiresInMinutes: 260 })

                    });

                });

                connection.release(
                    function (err) {
                        if (err) {
                            console.error(err.message);
                        } else {
                            console.log("POST /login: Connection released");
                        }
                    });

            });

    }

    );

});

//get
//pulling all active policies

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

            function (err, results) {

                if (err) {

                    connection.release(function (err) {

                        if (err) {

                            console.error(err.message);

                        }

                    });

                    return next(err);

                }

                res.status(200).json(results.rows);

                connection.release(function (err) {

                    if (err) {

                        console.error(err.message);

                    }

                });

            }

        );

    }

    );

});




///////////////////////////
////////////////////////// More details about my query
router.get('/morequery/:CUST_CODE/:INQ_ID', function (req, res) {
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

        connection.execute("SELECT INQ_ID, CUST_CODE, CREATED_DATE, ISSUE_CATEGORY, NARRATION, SOLUTION_DESCRIPTION, SOLUTION_DATE FROM CGIB.CGI_ONLINE_INQUIRY WHERE CUST_CODE = :CUST_CODE AND INQ_ID = :INQ_ID", [req.params.CUST_CODE, req.params.INQ_ID], {
            outFormat: oracledb.OBJECT // Return the result as Object
        }, function (err, result) {
            if (err || result.rows.length < 1) {
                res.set('Content-Type', 'application/json');
                var status = err ? 500 : 404;
                res.status(status).send(JSON.stringify({
                    status: status,
                    message: err ? "Error getting the Query" : "Queries doesn't exist",
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
                        console.log("GET /morequery/" + req.params.CUST_CODE + req.params.INQ_ID + " : Connection released");
                    }
                });
        });
    });
});


//get
//viewing your posted Queries as per cust_code
router.get('/vq/:CUST_CODE', function (req, res) {
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

        connection.execute("SELECT INQ_ID, CUST_CODE, CREATED_DATE, ISSUE_CATEGORY, NARRATION, SOLUTION_DESCRIPTION, SOLUTION_DATE FROM CGIB.CGI_ONLINE_INQUIRY WHERE CUST_CODE = :CUST_CODE", [req.params.CUST_CODE], {
            outFormat: oracledb.OBJECT // Return the result as Object
        }, function (err, result) {
            if (err || result.rows.length < 1) {
                res.set('Content-Type', 'application/json');
                var status = err ? 500 : 404;
                res.status(status).send(JSON.stringify({
                    status: status,
                    message: err ? "Error getting the Query" : "Queries doesn't exist",
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
                        console.log("GET /vq/" + req.params.CUST_CODE + " : Connection released");
                    }
                });
        });
    });
});


///post
//registration

router.post('/reg', function post(req, res, next) {


    var user = {

        email: req.body.email,
        first_name: req.body.first_name,
        town: req.body.town,
        dob: req.body.dob,
        cust_type_code: req.body.cust_type_code,
        middle_name: req.body.middle_name,
        last_name: req.body.last_name,
        nationality: req.body.nationality,
        id_type: req.body.id_type,
        id_number: req.body.id_number,
        initials: req.body.initials,
        gender: req.body.gender,
        pin_number: req.body.pin_number,
        telephone_no: req.body.telephone_no,
        mobile_no: req.body.mobile_no,
        phys_address: req.body.phys_address,
        postal_address: req.body.postal_address,
        postal_code: req.body.postal_code,
        contact_person: req.body.contact_person,
        online_username: req.body.username,
    };

    //
    var unhashedPassword = req.body.password;

    bcrypt.genSalt(10, function (err, salt) {

        if (err) {

            return next(err);

        }
        // console.log(password);

        bcrypt.hash(unhashedPassword, salt, function (err, hash) {

            if (err) {

                return next(err);

            }
            console.log(hash);


            user.hashedPassword = hash;

            insertUser(user, function (err, user) {

                var payload;

                if (err) {

                    return next(err);

                }

                payload = {

                    sub: user.email,

                    cmp_id: user.cmp_id,

                    cust_class_code: user.cust_class_code,

                    premium_category: user.premium_category

                };

                res.status(200).json({

                    user: user,

                    token: jwt.sign(payload, config.jwtSecretKey, { expiresInMinutes: 60 })

                });

            });

        });

    })
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

        //
        connection.execute(
            "SELECT cust_code, email, online_username" +
            " FROM CMS_ONLINE_PRE_CUSTOMERS " +
            " WHERE EMAIL = :email", [user.email],
            function (err, result) {
                if (err) {
                    // doRelease(connection);
                    return cb(new Error(err));
                }
                if (result.rows.length > 0) {
                    //doRelease(connection);
                    return cb(new Error("User with that email already exists"));
                }



                connection.execute(

                    'insert into CMS_ONLINE_PRE_CUSTOMERS( ' +

                    '   email, ' +

                    '   online_password, ' +

                    '   town, ' +

                    '   dob, ' +

                    '   cmp_id, ' +

                    '   cust_class_code, ' +

                    '  cust_type_code, ' +

                    '  premium_category, ' +

                    '  middle_name, ' +

                    ' last_name, ' +

                    ' nationality, ' +

                    ' id_type, ' +

                    ' id_number, ' +

                    '  initials, ' +

                    '  gender, ' +

                    '  pin_number, ' +

                    '  telephone_no, ' +

                    '  mobile_no,  ' +

                    '  phys_address, ' +

                    '  postal_address, ' +

                    '  postal_code, ' +

                    '  contact_person, ' +

                    '  online_username, ' +


                    '   first_name ' +

                    ') ' +

                    'values (' +

                    '    :email, ' +

                    '    :password, ' +

                    '    :town, ' +

                    '   :dob, ' +

                    ' \'1\', ' +

                    ' \'001\', ' +

                    '  :cust_type_code, ' +

                    ' \'A\', ' +

                    '  :middle_name, ' +

                    '   :last_name, ' +

                    '   :nationality, ' +

                    '   :id_type, ' +

                    '   :id_number, ' +

                    '   :initials, ' +

                    '  :gender, ' +

                    '   :pin_number, ' +

                    '   :telephone_no, ' +

                    '   :mobile_no, ' +

                    '   :phys_address, ' +

                    '  :postal_address, ' +

                    '  :postal_code, ' +

                    '  :contact_person, ' +

                    '  :username, ' +

                    '   :FIRST_NAME ' +

                    ') ' +

                    'returning ' +

                    '   cust_code, ' +

                    '   email, ' +

                    '   town, ' +

                    '   dob, ' +

                    '  cmp_id, ' +

                    '   cust_class_code, ' +

                    '  cust_type_code, ' +

                    '  premium_category, ' +

                    '   middle_name, ' +

                    '   last_name, ' +

                    '   nationality, ' +

                    '   id_type, ' +

                    '   id_number, ' +

                    '  initials, ' +

                    '  gender, ' +

                    '  pin_number,' +

                    '  telephone_no, ' +

                    '   mobile_no,  ' +

                    '  phys_address, ' +

                    '  postal_address, ' +

                    '  postal_code, ' +

                    '  contact_person, ' +

                    '  online_username, ' +

                    '   first_name ' +

                    'into ' +

                    '   :rcust_code, ' +

                    '   :remail, ' +

                    '   :rtown, ' +

                    '  :rdob ,' +

                    '  :rcmp_id, ' +

                    '   :rcust_class_code, ' +

                    '  :rcust_type_code, ' +

                    '  :rpremium_category, ' +

                    '  :rmiddle_name, ' +

                    '  :rlast_name, ' +

                    '  :rnationality, ' +

                    '  :rid_type, ' +

                    '  :rid_number, ' +

                    '  :rinitials, ' +

                    '  :rgender, ' +

                    '  :rpin_number, ' +

                    '  :rtelephone_no, ' +

                    '  :rmobile_no,  ' +

                    '  :rphys_address, ' +

                    '  :rpostal_address, ' +

                    '  :rpostal_code, ' +

                    '  :rcontact_person, ' +

                    '  :ronline_username, ' +

                    '   :rfirst_name',


                    {


                        email: user.email,

                        password: user.hashedPassword,

                        town: user.town,

                        dob: user.dob,

                        cust_type_code: user.cust_type_code,

                        middle_name: user.middle_name,

                        last_name: user.last_name,

                        nationality: user.nationality,

                        id_type: user.id_type,

                        id_number: user.id_number,

                        initials: user.initials,

                        gender: user.gender,

                        pin_number: user.pin_number,

                        telephone_no: user.telephone_no,

                        mobile_no: user.mobile_no,

                        phys_address: user.phys_address,

                        postal_address: user.postal_address,

                        postal_code: user.postal_code,

                        contact_person: user.contact_person,

                        username: user.online_username,


                        first_name: user.first_name,

                        rcust_code: {

                            type: oracledb.NUMBER,

                            dir: oracledb.BIND_OUT

                        },

                        remail: {

                            type: oracledb.STRING,

                            dir: oracledb.BIND_OUT

                        },

                        rtown: {

                            type: oracledb.STRING,

                            dir: oracledb.BIND_OUT

                        },

                        rdob: {

                            type: oracledb.STRING,

                            dir: oracledb.BIND_OUT

                        },

                        rcmp_id: {

                            type: oracledb.STRING,

                            dir: oracledb.BIND_OUT

                        },

                        rcust_class_code: {

                            type: oracledb.STRING,

                            dir: oracledb.BIND_OUT

                        },

                        rcust_type_code: {

                            type: oracledb.STRING,

                            dir: oracledb.BIND_OUT

                        },

                        rpremium_category: {

                            type: oracledb.STRING,

                            dir: oracledb.BIND_OUT

                        },

                        rmiddle_name: {

                            type: oracledb.STRING,

                            dir: oracledb.BIND_OUT

                        },

                        rlast_name: {

                            type: oracledb.STRING,

                            dir: oracledb.BIND_OUT

                        },

                        rnationality: {

                            type: oracledb.STRING,

                            dir: oracledb.BIND_OUT

                        },

                        rid_type: {

                            type: oracledb.STRING,

                            dir: oracledb.BIND_OUT

                        },

                        rid_number: {

                            type: oracledb.STRING,

                            dir: oracledb.BIND_OUT

                        },

                        rinitials: {

                            type: oracledb.STRING,

                            dir: oracledb.BIND_OUT

                        },

                        rgender: {

                            type: oracledb.STRING,

                            dir: oracledb.BIND_OUT

                        },

                        rpin_number: {

                            type: oracledb.STRING,

                            dir: oracledb.BIND_OUT

                        },


                        rtelephone_no: {

                            type: oracledb.STRING,

                            dir: oracledb.BIND_OUT

                        },

                        rmobile_no: {

                            type: oracledb.STRING,

                            dir: oracledb.BIND_OUT

                        },

                        rphys_address: {

                            type: oracledb.STRING,

                            dir: oracledb.BIND_OUT

                        },

                        rpostal_address: {

                            type: oracledb.STRING,

                            dir: oracledb.BIND_OUT

                        },

                        rpostal_code: {

                            type: oracledb.STRING,

                            dir: oracledb.BIND_OUT

                        },
                        rcontact_person: {

                            type: oracledb.STRING,

                            dir: oracledb.BIND_OUT

                        },

                        ronline_username: {

                            type: oracledb.STRING,

                            dir: oracledb.BIND_OUT

                        },


                        rfirst_name: {

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

                            cust_code: results.outBinds.rcust_code[0],

                            email: results.outBinds.remail[0],

                            town: results.outBinds.rtown[0],

                            dob: results.outBinds.rdob,

                            cmp_id: results.outBinds.rcmp_id[0],

                            cust_class_code: results.outBinds.rcust_class_code[0],

                            cust_type_code: results.outBinds.rcust_type_code[0],

                            premium_category: results.outBinds.rpremium_category[0],

                            middle_name: results.outBinds.rmiddle_name[0],

                            last_name: results.outBinds.rlast_name[0],

                            nationality: results.outBinds.rnationality[0],

                            id_type: results.outBinds.rid_type[0],

                            id_number: results.outBinds.rid_number[0],

                            initials: results.outBinds.rinitials[0],

                            gender: results.outBinds.rgender[0],

                            pin_number: results.outBinds.rpin_number[0],


                            telephone_no: results.outBinds.rtelephone_no[0],

                            mobile_no: results.outBinds.rmobile_no[0],

                            phys_address: results.outBinds.rphys_address[0],

                            postal_address: results.outBinds.rpostal_address[0],

                            postal_code: results.outBinds.rpostal_code[0],

                            contact_person: results.outBinds.rcontact_person[0],

                            online_username: results.outBinds.ronline_username[0],

                            first_name: results.outBinds.rfirst_name[0]

                        });

                        connection.release(
                            function (err) {
                                if (err) {
                                    console.error(err.message);
                                } else {
                                    console.log("POST /reg: Connection released");
                                }
                            });;

                    });

            }

        );


    })
};


/////// 
///// Claim notification work



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




module.exports = router;
