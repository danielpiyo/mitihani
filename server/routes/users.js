var oracledb = require('oracledb');

var bcrypt = require('bcrypt');

var jwt = require('jsonwebtoken');

var config = require(__dirname + '/config.js');

function post(req, res, next) {

    var user = {

        email: req.body.email,
        first_name : req.body.first_name,
        town: req.body.town,
        dob: req.body.dob,
       // cust_code: req.body.cust_code,
       // cmp_id: req.body.cmp_id,
       // cust_class_code: req.body.cust_class_code,
        cust_type_code: req.body.cust_type_code,
       // premium_category : req.body.premium_category,
        
        middle_name: req.body. middle_name,
        last_name: req.body. last_name,
        nationality: req.body.nationality,
        id_type: req.body. id_type,
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
      // occup_description: req.body. occup_description,
       
      //  telephone_no: req.body.telephone_no,
       // mobile_no: req.body.mobile_no,
       // phys_address: req.body.phys_address,
      //  postal_address: req.body.postal_address,
       // postal_code: req.body.postal_code,
//
        
    };
    

    var unhashedPassword = req.body.password;

    bcrypt.genSalt(10, function(err, salt) {

        if (err) {

            return next(err);

        }

        bcrypt.hash(unhashedPassword, salt, function(err, hash) {

            if (err) {

                return next(err);

            }

            user.hashedPassword = hash;
 
            insertUser(user, function(err, user) {

                var payload;

                if (err) {

                    return next(err);

                }

                payload = {

                    sub: user.email,

                    cmp_id: user.cmp_id,

                   cust_class_code: user.cust_class_code,

                    premium_category: user.premium_category
                   // role: user.role,

                    //name: user.name

                };

                res.status(200).json({

                    user: user,

                    token: jwt.sign(payload, config.jwtSecretKey, {expiresInMinutes: 60})

                });

            });

        });

    });

}

module.exports.post = post;

function insertUser(user, cb) {

    oracledb.getConnection(

        config.database,

        function(err, connection) {
            if (err) {
              return callback(new Error(err));
            }
            connection.execute(
              "SELECT cust_code, email, online_username" +
              " FROM CMS_ONLINE_PRE_CUSTOMERS " +
              " WHERE EMAIL = :email", [user.email],
              function(err, result) {
                if (err) {
                 // doRelease(connection);
                  return cb(new Error(err));
                }
                if (result.rows.length > 0) {
                  //doRelease(connection);
                  return cb(new Error("User already exists"));
                }


       // function(err, connection){

         //   if (err) {

          //      return cb(err);

          //  }            

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

                '  pin_number,' +  
                
                '  telephone_no, ' +  

                '  mobile_no,  ' +

                '  phys_address, ' +

                '  postal_address, ' +

                '  postal_code, ' +

                '  contact_person, ' +

                '  online_username, ' +
                
             //  ' occup_description ,' +                  

            //    '  telephone_no, ' +

             //   '  mobile_no, ' +

            //    '  phys_address, ' +

            //    '  postal_address,' + 

             //   '   postal_code,' +


                '   first_name ' +

                ') ' +

                'values (' +

                '    :email, ' +

                '    :password, ' +

                '    :town, ' +

                '   :dob, ' +

                 ' \'1\', ' +

                 ' \'001\', ' +
                //'   :cmp_id, ' +

               // '  :cust_class_code, ' +

                '  :cust_type_code, ' +

                ' \'A\', ' +

               // '  :premium_category, ' +

                '  :middle_name, ' +

                '   :last_name, ' +

                '   :nationality, ' +
                 
                '   :id_type, ' +

                '   :id_number, ' +

                '   :initials, ' +

                '  :gender, ' +

               '   :pin_number,' +     
               
               '   :telephone_no, ' +

               '   :mobile_no,  ' +

               '   :phys_address, ' +

               '  :postal_address, ' +

               '  :postal_code, ' +

               '  :contact_person, ' +

               '  :username, ' +

             //  '   :occup_description ,'+                 
//
             //   '   :telephone_no, '+

             //   '   :mobile_no, '+

               // '   :phys_address, '+

               // '   :postal_address,'+ 

             //   '   :postal_code,' +     


               // '    \'CLIENT\', ' +

                '    :first_name ' +

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

                '  pin_number,' +   
                
                '  telephone_no, ' +  

                '   mobile_no,  ' +

                '  phys_address, ' +

                '  postal_address, ' +

                '  postal_code, ' +

                '  contact_person, ' +

                '  online_username, ' +

             //   '  occup_description ,' +                  

             //   '  telephone_no, ' +

            //    '  mobile_no, ' +

             //   '  phys_address, ' +

             //   '  postal_address,' + 

             //   '   postal_code,' +

                '   first_name ' +

                'into ' +

               '   :rcust_code, ' +

                '   :remail, ' +

                '   :rtown, '+

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

                '  :rpin_number,' +    
                
                '  :rtelephone_no, ' +  

                '  :rmobile_no,  ' +

                '  :rphys_address, ' +

                '  :rpostal_address, ' +

                '  :rpostal_code, ' +

                '  :rcontact_person, ' +

                '  :ronline_username, ' +

             //   ' :roccup_description ,' +                  

            //    '  :rtelephone_no, ' +

           ///     '  :rmobile_no, ' +

            //    '  :rphys_address, ' +

             //   '  :rpostal_address,' + 

            //    '   :rpostal_code,' +

                '   :rfirst_name', 

                {

                    email: user.email.toLowerCase(),

                    password: user.hashedPassword,

                    town: user.town,

                    dob: user.dob,

                    //cmp_id: user.cmp_id,

                  //  cust_class_code: user.cust_class_code,

                    cust_type_code: user.cust_type_code,

                   // premium_category: user.premium_category,

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

                 //   occup_description: user.occup_description,
//
                //    telephone_no: user.telephone_no,

               //     mobile_no: user.mobile_no,

               //     phys_address: user.phys_address,

                //    postal_address: user.postal_address,

               //     postal_code: user.postal_code,

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

                    rpin_number:{

                        type: oracledb.STRING,

                        dir: oracledb.BIND_OUT

                    },

               //     roccup_description: {

               //         type: oracledb.STRING,

               //         dir: oracledb.BIND_OUT

               //     },

                    rtelephone_no:  {

                        type: oracledb.STRING,

                        dir: oracledb.BIND_OUT

                    },

                    rmobile_no:  {

                        type: oracledb.STRING,

                        dir: oracledb.BIND_OUT

                    },

                    rphys_address:  {

                        type: oracledb.STRING,

                        dir: oracledb.BIND_OUT

                    },

                    rpostal_address:  {

                        type: oracledb.STRING,

                        dir: oracledb.BIND_OUT

                    },

                    rpostal_code:  {

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

                function(err, results){

                    if (err) {

                        connection.release(function(err) {

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

                        last_name:results.outBinds.rlast_name[0],

                        nationality: results.outBinds.rnationality[0],

                        id_type: results.outBinds.rid_type[0],

                        id_number: results.outBinds.rid_number[0],

                        initials: results.outBinds.rinitials[0],

                        gender: results.outBinds.rgender[0],

                        pin_number: results.outBinds.rpin_number[0],

                     //   occup_description: results.outBinds.roccup_description[0],

                       telephone_no:results.outBinds.rtelephone_no[0],

                       mobile_no: results.outBinds.rmobile_no[0],

                       phys_address: results.outBinds.rphys_address[0],

                        postal_address: results.outBinds.rpostal_address[0],

                        postal_code: results.outBinds.rpostal_code[0],

                        contact_person: results.outBinds.rcontact_person[0],

                        online_username: results.outBinds.ronline_username[0],

                        first_name: results.outBinds.rfirst_name[0]

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
 )};