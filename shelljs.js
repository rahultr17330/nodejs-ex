var shell = require('shelljs');
module.exports.shell_exec = function(data,response){
	var res="";
	 res = shell.exec(data);
var obj ={
	result:res.stdout,
	code:res.code
};

response(obj);
obj =""
}