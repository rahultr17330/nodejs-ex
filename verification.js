var mongoose = require('mongoose');
var user_record = mongoose.createConnection('mongodb://rahulmongo:6391530dad@cluster0-shard-00-00-fcuzh.mongodb.net:27017,cluster0-shard-00-01-fcuzh.mongodb.net:27017,cluster0-shard-00-02-fcuzh.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin');
var schema_user_record = mongoose.Schema({
    name: String,
    contact: Number,
    class: String,
    email: String,
    address: String
});
var user_record = user_record.model('user_record', schema_user_record);
var admin_email = ["rahultri17330@gmail.com", "satish4903@gmail.com", "rahultri2001@gmail.com"];
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