
    
    export class Quote  {
        constractor(
            p_client_code :String,
            p_broker_code :String ='10100124',// default
            p_risk_name:String,
            p_branch :String='100',/// '100',   //set as default
            p_class :String,
            p_classgrp :Number,
            p_classsect :Number,
            p_age :Number,
            p_start_date:Date,
            p_end_date :Date,
            p_sum_insured :Number,
            p_user_id :String = 'PORTAL', //set as default
            p_control_no: Number=0 ,
            p_premium :Number=0
        )
        { }
        
    }
    