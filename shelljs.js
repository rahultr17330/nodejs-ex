var shell = require("shelljs");
const fs = require('fs');
const path = require('path');

module.exports.edit_file = function(data,response){
	 var file = path.resolve(__dirname,data.name);

    if (fs.existsSync( file ))
    {
         fs.writeFile(file,data.fdata, 'utf-8', function (err) {
      if (err) {
        response("Failed To Save");
      } else {
        response("File Saved");
      }
    });
}else{
	response("File Not Found");
}

} 

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
    else if (e.substring(0, 7)=='forever'){
    	//e = e+" --no-colors";
    	o = shell.exec(e);
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