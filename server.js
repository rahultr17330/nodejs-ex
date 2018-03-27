//  OpenShift sample Node application
var express = require('express'),
     socket = require('socket.io'),
    app     = express(),
    morgan  = require('morgan');
    var verify = require('./verification');
var admin_calls = require('./user_database');
var cookieParser = require('cookie-parser');
Object.assign=require('object-assign')
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(morgan('combined'))

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0',
    mongoURL = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL,
    mongoURLLabel = "";

if (mongoURL == null && process.env.DATABASE_SERVICE_NAME) {
  var mongoServiceName = process.env.DATABASE_SERVICE_NAME.toUpperCase(),
      mongoHost = process.env[mongoServiceName + '_SERVICE_HOST'],
      mongoPort = process.env[mongoServiceName + '_SERVICE_PORT'],
      mongoDatabase = process.env[mongoServiceName + '_DATABASE'],
      mongoPassword = process.env[mongoServiceName + '_PASSWORD']
      mongoUser = process.env[mongoServiceName + '_USER'];

  if (mongoHost && mongoPort && mongoDatabase) {
    mongoURLLabel = mongoURL = 'mongodb://';
    if (mongoUser && mongoPassword) {
      mongoURL += mongoUser + ':' + mongoPassword + '@';
    }
    // Provide UI label that excludes user id and pw
    mongoURLLabel += mongoHost + ':' + mongoPort + '/' + mongoDatabase;
    mongoURL += mongoHost + ':' +  mongoPort + '/' + mongoDatabase;

  }
}
var db = null,
    dbDetails = new Object();

var initDb = function(callback) {
  if (mongoURL == null) return;

  var mongodb = require('mongodb');
  if (mongodb == null) return;

  mongodb.connect(mongoURL, function(err, conn) {
    if (err) {
      callback(err);
      return;
    }

    db = conn;
    dbDetails.databaseName = db.databaseName;
    dbDetails.url = mongoURLLabel;
    dbDetails.type = 'MongoDB';

    console.log('Connected to MongoDB at: %s', mongoURL);
  });
};

app.get('/', function (req, res) {
  // try to initialize the db on every request if it's not already
  // initialized.
  if (!db) {
    initDb(function(err){});
  }
  if (db) {
    var col = db.collection('counts');
    // Create a document with request IP and current time of request
    col.insert({ip: req.ip, date: Date.now()});
    col.count(function(err, count){var countb = count;
});

initDb(function(err){
  console.log('Error connecting to Mongo. Message:\n'+err);
});

var server=app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);
app.get('/', function (req, res) {
  res.render('pages/index');
});
var users = [];
var io = socket(server);
io.on('connection', function (socket) {
  socket.on('user_verification', function (user_data) {
    verify.confirm(user_data, function (status) {
      var unique_id = "verification_callback_" + user_data.user_email;
      global.authentication_status = status;

      global.user_email = user_data.user_email;
      socket.emit(unique_id, {
        response: status
      });
    });
  });
  socket.on('get_users_12', function () {
    admin_calls.return_users_12(function (data) {
      socket.emit('user_records_return_12', data);
    });
  });
  socket.on('get_user_class', function (data) {
    console.log(data);
    admin_calls.get_user_class(data, function (user_class) {
      console.log(user_class);
      socket.emit('user_class', user_class);
    });
  });
  socket.on('get_files', function (data) {
    admin_calls.get_files(data, function (files) {
      socket.emit('get_files_callback', files);
    });
  });
  socket.on('delete_from_12', function (data) {
    admin_calls.delete_users_12(data._id, function (message) {
      console.log(message);
      socket.emit('deletion_confirmation', {
        id: data._id,
        message: message
      });
    });
  });
  socket.on('insert_new_user', function (user_info) {
    admin_calls.insert_records(user_info, function (callback) {
      socket.emit('insert_record_callback', callback);
    });
  });
  socket.on('update_info', function (user_info) {
    admin_calls.update_records(user_info, function (callback) {
      socket.emit('update_record_callback', callback);
    });
  });
  socket.on('get_users_11', function () {
    admin_calls.return_users_11(function (data) {
      socket.emit('user_records_return_11', data);
    });
  });

  socket.on('get_users_10', function () {
    admin_calls.return_users_10(function (data) {
      socket.emit('user_records_return_10', data);
    });
  });
  socket.on('get_users_9', function () {
    admin_calls.return_users_9(function (data) {
      socket.emit('user_records_return_9', data);
    });
  });
  socket.on('database-size', function () {
    var db_array = [];
    admin_calls.get_database_size(function (result) {
      db_array[0] = result;
      admin_calls.get_database_size_normal(function (data) {
        db_array[1] = data;
        socket.emit('database-size-return', db_array);
      });
    });

  });
  socket.on('get_file_info', function () {
    admin_calls.get_file_info(function (data) {
      socket.emit('get_file_info_callback', data);
    });
  });
  socket.on("add_file_to_database", function (fileinfo) {
    admin_calls.add_file_to_db(fileinfo, function (data) {
      socket.emit('save_file_callback', data);
    });
  });
  socket.on('delete_file_from_db', function (data) {
    admin_calls.delete_file_from_db(data, function (data) {
      socket.emit('delete_file_from_db_callback', data);
    });
  });
  socket.on('add_file_to_db_ext', function (data) {
    admin_calls.add_file_to_db(data, function (data) {
      socket.emit('save_file_ext_callback', data);
    });
  });
  app.get('/resources', function (req, res) {
    if (global.authentication_status == 1 || global.authentication_status == 2) {
      res.render('pages/repo');
    } else {
      res.render("pages/index");
    }
  });
  app.get('/admin-panel', function (req, res) {
    if(global.authentication_status == 2){
    res.render('pages/admin-panel');
     }
     else{

    res.render('pages/index');     
    }
  });
  app.get('/contact',function(req,res){
    res.render('pages/contact');
  });

  app.get('/chat', function (req, res) {
      
    if(!req.cookies['name']){
        res.render('pages/index');
}
else{
res.render('pages/chatcorner');
}
});
    app.get('/chat/:id',function(req,res){
var requser;
users.forEach(function(item){
if(item.name == req.params.id){
requser={
    name:item.name,
    email:item.email,
    image:item.image,
    socketid:item.socketid
}

}

});
res.render('pages/chatroom',{data:requser});
});

    socket.on('onlineuser', function (data) {
        var j = 0;
        for (var i = 0; i < users.length; i++) {
            if (users[i].name == data.name) {
                users[i].socketid = data.socid;
                var j = 1;
                break;

            } else {
                continue;
            }
        }
        if (j == 0) {
            users.push({
                name: data.name,
                email : data.email,
                image : data.image,
                socketid: data.socid
            });
        }
     
        io.sockets.emit('onlineusers', users);
    });
    socket.on('removeuser', function (data) {
        for (var i = 0; i < users.length; i++) {
            if (users[i].name == data.name) {
                users.splice(i, 1);
            }
        }
         
        io.sockets.emit('onlineusers', users);
    });

    socket.on('chat', function (data) {

users.forEach(function(item){
    if(item.name == data.from){
        senddata = {
            image : item.image,
            msg : data.message
        }
    }
});
var event = 'chat'+data.handle;
        io.sockets.emit(event, senddata);



        // socket.broadcast.emit('online',{name:data.from});
    });
    socket.on('typing', function (data) {
        var event = 'typing' + data.to;
        socket.broadcast.emit(event, data);
        io.sockets.emit('online', {
            name: data.typer
        });
    });
    app.get('*', function (req, res) {
      res.status(404);
      res.render('pages/error');
     
    });

});
module.exports = app ;
