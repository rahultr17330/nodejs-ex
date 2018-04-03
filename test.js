
    var cmd=require('node-cmd');
cmd.get(
        'ls',
        function(err, data, stderr){
            console.log(data)
        }
    );
 