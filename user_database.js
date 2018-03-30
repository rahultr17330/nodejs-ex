var mongoose = require('mongoose');
module.exports.dbinfo = function(mongourl){
if(mongourl){
    var database = mongoose.createConnection(mongourl);
var schema_user_record = new mongoose.Schema({
    name: String,
    contact: Number,
    class: String,
    email: String,
    address: String
});
var user_record = database.model('user_record', schema_user_record);
var file_schema = new mongoose.Schema({
    fileName: String,
    fileDownloadUrl: String,
    class: String
});
file_record = database.model('file_record', file_schema);
module.exports.get_database_size = function (response) {
    user_record.collection.stats({
        scale: 1024
    }, function (err, results) {
           global.sizeofa = (results.storageSize) / 1024;
        });
        file_record.collection.stats({
            scale: 1024
        }, function (err, results) {
            var object = {
                size: (results.storageSize) / 1024 + global.sizeofa,
                indicies: results.nindexes,
                name: results.ns
            }
        });
        response(object);

}
module.exports.get_user_class = function (data, response) {
    var mail = data;
    user_record.find({
        email: mail
    }, function (err, repo) {
        response(repo[0].class);
    });
}
module.exports.get_files = function (data, response) {

    file_record.find({
        class: data
    }, function (err, files) {
        console.log(files);
        response(files);
    });
}
module.exports.return_users_12 = function (response) {
    user_record.find({
        class: "XII"
    }, function (err, data) {
        response(data);

    });
}
module.exports.delete_users_12 = function (info, response) {
    user_record.findByIdAndRemove(info, function (err, data) {
        if (err) {
            response(err);
        } else {
            response("Deletion Successful !");
        }

    });

}
module.exports.return_users_11 = function (response) {
    user_record.find({
        class: "XI"
    }, function (err, data) {
        response(data);

    });
}
module.exports.return_users_10 = function (response) {
    user_record.find({
        class: "X"
    }, function (err, data) {
        response(data);

    });
}

module.exports.return_users_9 = function (response) {
    user_record.find({
        class: "IX"
    }, function (err, data) {
        response(data);

    });
}
module.exports.insert_records = function (data, response) {
    var insert = user_record({
        name: data.name,
        class: data.class,
        contact: data.contact,
        email: data.email,
        address: data.address
    }).save(function (err, data) {
        if (err) {
            response(err);
        } else {
            response("Document Created ! Id: " + data._id);
        }
    });

}
module.exports.update_records = function (data, response) {
    user_record.findOne({
        _id: data.id
    }, function (err, user) {
        user.email = data.email;
        user.address = data.address;
        user.name = data.name;
        user.contact = data.contact;

        user.save(function (err, id) {
            if (err) {
                response(err);
            } else {
                response("Updation Succesful! Id: " + id._id);
            }
        });
    });
}
module.exports.get_file_info = function (callback) {
    file_record.find({}, function (err, data) {
        callback(data);
    });

}
module.exports.add_file_to_db = function (fileinfo, callback) {
    var insert = file_record({
        fileName: fileinfo.fileName,
        class: fileinfo.class,
        fileDownloadUrl: fileinfo.fileDownloadUrl,
    }).save(function (err, data) {
        if (err) {
            response(err);
        } else {
            callback("Document Created ! Id: " + data._id);
        }
    });
}
module.exports.delete_file_from_db = function (data, response) {
    file_record.findOneAndRemove({
        fileName: data
    }, function (err, data) {
        if (err) {
            response(err);
        } else {
            response("Deletion Successful !");
        }

    });

}
}    
}
