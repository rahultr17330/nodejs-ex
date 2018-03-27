var mongoose = require('mongoose');
mongoose.connect('mongodb://rahulmongo:6391530dad@cluster0-shard-00-00-fcuzh.mongodb.net:27017,cluster0-shard-00-01-fcuzh.mongodb.net:27017,cluster0-shard-00-02-fcuzh.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin');
var user_database = mongoose.model('user_database');
module.exports.get_database_size=function(response){
    user_database.collection.stats( { scale : 1024 },function(err, results) {
  var obj={
      size:(results.storageSize)/1024,
      indicies:results.nindexes,
      name:results.ns
  }
   response(obj);
});
}