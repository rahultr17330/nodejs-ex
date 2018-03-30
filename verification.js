var mongoose = require('mongoose');
module.exports.dbinfo = function(mongoURL,response){
    if(!mongoURL){
        console.log("no Url Found");
        response("ERR");
    }else{
        var user_record = mongoose.createConnection(mongoURL);
        
        var schema_user_record = mongoose.Schema({
            name: String,
            contact: Number,
            class: String,
            email: String,
            address: String
        });
        var user_record = user_record.model('user_record', schema_user_record);
        var admin_email = ["rahultri17330@gmail.com", "satish4903@gmail.com", "rahultri2001@gmail.com"];
        var a = ({
            name:"Rahul Tripathi",
            contact:8948152662,
            class:"XII",
            email:"rahultri17330@gmail.com",
            address:"--"
        });
        var b = ({
            name:"Satish K Gupta",
            email:"satish4903@gmail.com",
            address:"--"
        });
        a.save(function(err,data){
            b.save(function(err,data){

            });
        });
        
        module.exports.confirm = function (data, response) {
            var status = 0;
            user_record.find({
                email: data.user_email
            }, function (err, data) {
                if (err) console.log(err);
                else
                if (data.length == 1) {
                    if (data[0].email == admin_email[0] || data[0].email == admin_email[1] || data[0].email == admin_email[2]) {
                        status = 2;
                        response(status);
                    } else {
                        status = 1;
                        response(status);
                    }
                } else {
                    response(status);
                }
            });
        
        }
        response("OK");
    }
}

