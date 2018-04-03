var shell = require("shelljs");
const fs = require('fs');
module.exports.shell_exec = function(e, l) {
    var o;
    if(e[0]=='c'&&e[1]=='d'){
    	var str = e.substring(3, e.length);
    	console.log(str);
    	 shell.cd(str), console.log(str);
    	 o = shell.exec('pwd');
    	var s = {
            result: o.stdout,
            code: o.code
        };
    }
    else{
    	o = shell.exec(e), console.log(e);
    if (o.code == 0) {
        var s = {
            result: o.stdout,
            code: o.code
        };
    } else {
        var s = {
            result: o.stderr,
            code: o.code
        };
    } }
    l(s), s = ""
};