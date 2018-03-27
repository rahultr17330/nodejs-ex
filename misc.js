var mongoose = require('mongoose');
mongoose.connect('mongodb://gt_mlab:rahul123@ds135486.mlab.com:35486/rahul_mongodb');;
var schema = mongoose.Schema({
    fileName: String,
    fileDownloadUrl: String,
    class: String
});
file_record = mongoose.model('file_record', schema);
/*file_record.remove({},function(err,data){
    console.log(data);
});*/
file_record({
    fileName: "Loudstring-logo-white.png",
    fileDownloadUrl: "https://drive.google.com/uc?id=0B5W7rnvAFmbJWjFHLUQ2OUZjbzA&export=download",
    class: "XII"
}).save(function (err, data) {
    console.log(data);
});