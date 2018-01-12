

var oracledb = require('oracledb');

var config = require(__dirname + '/config.js');

function get(req, res, next) {

    oracledb.getConnection(

        config.database,

        function(err, connection){

            if (err) {

                return next(err);

            }

            connection.execute(

                'select client _number as "client_number" ' +

                '   branch_agent as "branch_agent", ' +

                '   policy_number as "policy_number", ' +

                '   dcon_no as "dcon_no", ' +

                '   class_descrip as "class_descrip" ' +

                '   trans as "trans", ' +

                '   pol_status as "pol_status", ' +

                '   period_from as "period_from", ' +

                '   period_to as "period_to" ' +

                '   insured_amount as "insured_amount", ' +

                '   drcr_lc_premium as "drcr_lc_premium", ' +

                '   renewal_date as "renewal_date", ' +

                '   from CGIB.ONL_VIEW_ACTIVE_POLICY ,' +

                '    where client_number = :payload.cust_code',

                {},//no binds

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

                    res.status(200).json({

                        user: user,
                        client_number: user.client_number,
                        branch_agent: user.branch_agent,
                        policy_no: user.policy_no,
                        dcon_no: user.dcon_no,
                        class_descrip: user.class_descrip,
                        trans: user.trans,
                        pol_status: user.pol_status,
                        period_from: user.period_from,
                        period_to: user.period_to,
                        insured_amount: user.insured_amount,
                        drcr_lc_premium: user.drcr_lc_premium,
                        renewal_date: user.renewal_date,
                    } );

                    connection.release(function(err) {

                        if (err) {

                            console.error(err.message);

                        }

                    });

                }

            );

        }

    );

}

module.exports.get = get;