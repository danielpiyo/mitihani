//////////////////////////////// Iquiz Admin login


router.post('/loginAdminapp', function (req, res, next) {
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

            'select entity_category as "entity_category", ' +

            '   entity_sys_id as "entity_sys_id", ' +

            '   surname as "surname", ' +

            '  other_names as "other_names", ' +

            '  dob as "dob", ' +

            '  town as "town", ' +

            '  country as "country", ' +
          
            '  mobile_number as "mobile_number", ' +
           
            '  email as "email", ' +

            '  registration_date  as "registration_date", ' +

            '  username as "username", ' +

            '  passwrd as "passwrd" ' +            

            ' from iquiz.iq_entities' +

            ' where IS_APPROVED_TEACHER_YN (ENTITY_SYS_ID)=  ' +

            ' and email = :email',

            {

                email: req.body.email.toLowerCase()
              // username: req.body.username

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
                        message: err ? "Error getting the that Username" : "Username you have entered is Incorrect. Kindly Try Again. or Contact systemadmin",
                        detailed_message: err ? err.message : ""
                    }));

                    return next(err);

                }

                user = result.rows[0];




                bcrypt.compare(req.body.password, user.passwrd, function (err, pwMatch) {

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
                      //  sub: user.username,

                        // password : user.password,

                        entity_sys_id: user.entity_sys_id,
                        
                        surname: user.surname,

                        other_names: user.other_names,

                        dob: user.dob,
                       
                        town: user.town ,
                        
                        country: user.country,

                        mobile_number: user.mobile_number,

                         username: user.username,
                       // email: user.email,

                        registration_date: user.registration_date


                    };

                    res.status(200).json({

                        user: user,
                       
                        email: user.email,

                        // password : user.password,

                        username: user.username, 

                        entity_category: user.entity_category,
                           
                        entity_sys_id: user.entity_sys_id,

                        surname: user.surname,


                        other_names: user.other_names,

                        dob: user.dob,

                        town: user.town,

                        country: user.country,

                        mobile_number: user.mobile_number,

                        registration_date: user.registration_date,


                        token: jwt.sign(payload, config.jwtSecretKey, {  expiresIn : 60*60*1 })

                    });

                });

                connection.release(
                    function (err) {
                        if (err) {
                            console.error(err.message);
                        } else {
                            console.log("POST /loginAdminapp: Connection released");
                        }
                    });

            });

    }

    );

});

