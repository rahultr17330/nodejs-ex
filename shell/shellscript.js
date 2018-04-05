   var random = Math.floor(Math.random() * 1000); socket.emit('shell_exec', {
                                        sc: "forever list",
                                        id: random
                                    });
                    socket.on('shell_exec_response_' + "forever list" + random, function(data) {
                    $("#exec").append('<p>')
                                            data.result.replace(/^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/,'');
                                            for (i = 0; i < data.result.length; i++) {
                                              
                                                if (data.result[i] != '\n') {
                                                    $("#exec").append(data.result[i])
                                                } else if (data.result[i] == '\n') {
                                                    $("#exec").append('<br>')
                                                }
                                                else{
                                                  $("#exec").append(' ')
                                                }
                                              }
                                              $("#exec").append('</p>')
                                              $("#loader").hide();
                                        $("input").show();
                                          });

   $('input[type=text]').on('keydown', function(e) {
                        var script = $(this).val().replace('$', '').replace('>', '').replace(" ", '');
                        if (e.which == 13) {
                            e.preventDefault();
                            console.log(script.length);
                            if (script == "clear") {
                                $("#exec").html("");
                                $(this).val(">$ ");
                                i = 1;
                            } else {
                                $(this).val(">$ ");
                                $("#exec").append('<p>' + i + '.<font color="#ff071a">> $ </font> ' + script + '</p>');
                                i++;
                                 if(script.substring(0, 4) == 'edit'){
                                    var filename = script.substring(5, script.length);
                                    	var random = Math.floor(Math.random() * 1000);
                                       socket.emit('view_file', {
                                      name: filename,
                                        id:random
                                    })
                                    socket.on('view_file_response_' + filename+ random,function(data) {
                                   
                                      if(data.substring(0, 4) != "File"){
                                      	$("#shell").hide();
                                      	$("#editor-area").show();
                                       $("#editor-area").append('<div id="editor"><div class="navbar-fixed"><nav style="background-color:transparent;"><div class="nav-wrapper"><ul><li><a id="save" class="waves-effect waves-light btn">Save</a></li><li><a id="cancel" class="waves-effect waves-light btn">Cancel</a></li></ul></div></nav></div><textarea id="editbox"  ></textarea></div>');
                                       var textArea = document.getElementById('editbox');
									var editor = CodeMirror.fromTextArea(textArea,{
                                       	mode:"javascript",
                                       	theme:"monokai",
                                       	lineNumbers: true,
                                       	scrollbarStyle:"null"
                                       	});
                                      editor.getDoc().setValue(data);
                                      
                                      $("#cancel").click(function(){
                                   $("#editor-area").hide();
                                      $("#editor").remove();
                                      $("#exec").append('<p> WARNING! Operation Aborted By The user </p>');
                                     $("#shell").show();
                                  });
                                      $("#save").click(function(){
                                      	 var random = Math.floor(Math.random() * 1000);
                                      	   socket.emit('edit_file', {
                                        fdata:editor.getValue(),
                                        name: script.substring(5, script.length),
                                        id:random
                                    });
                                      	    socket.on('edit_file_response_' + script.substring(5, script.length)+ random,function(data) {
                                      	    	$("#editor-area").hide();
                                      	    	$("#editor").remove();
                                      	    	$("#exec").append('<p>'+script.substring(5, script.length)+' : '+data+' </p>');
                                      	    	 $("#shell").show();
                                      	    });
                                      });}
                                      else{
                                        $("#exec").append('<p>'+data+'</p>');
                                      }
                                    });
                                }
                                else if(script.substring(0, 12)=='forever stop' || script == 'stop server'){
                                    	 $("#exec").append('<p>ERR! you cannot stop the server</p>');
                                    }
                                     if(script.substring(0, 7) == 'restart'){
                                    	 $("#loader").show();
                                    		$("input").hide();
                                    	var rc="forever restart"+script.substring(7, script.length);
                                    	socket.emit('shell_exec', {
                                        sc: rc,
                                        id: random
                                    });

                                    	socket.on('disconnect',function(err){
                                    		 $("#exec").append('<p>Restarting server ...</p>');
                                    		
                                    	});
                                    	socket.on('connect',function(err){
                                    		 $("#exec").append('<p>Succesfully Restarted server ...</p>');
                                    		$("#loader").hide();
                                    		$("input").show();
                                    	});
                                    }
                                     else if(script.substring(0, 3) == 'cat' ||script.substring(0, 4) == 'view' ){
                                     	if(script.substring(0, 3) == 'cat'){
                                     		var filename = script.substring(4, script.length);
                                     	}
                                     	else {
                                     		var filename = script.substring(5, script.length);
                                     	}
                                       	var random = Math.floor(Math.random() * 1000);
                                      	   socket.emit('view_file', {
                                      name: filename,
                                        id:random
                                    });
                                      	    socket.on('view_file_response_' + filename+ random,function(data) {
                                       	var filetype = script.substring(script.indexOf(".")+1,script.length);
                                       	
                                       	if(filetype == 'js'){
                                       $("#exec").append('<pre><code class="javascript">'+data+'</code></pre>');}
                                       else{
                                       	if(filetype == 'ejs'){
                                       		data= data.replace(new RegExp(['<'],"g"), "&lt;"); data = data.replace(new RegExp(['>'],"g"), "&gt;");
                                       	$("#exec").append('<pre><code class="language-html">'+data+'</code></pre>');}
                                       else{
                                       	 	$("#exec").append('<pre><code class="'+filetype+'">'+data+'</code></pre>');}
                                       }
                                      
                                        $('pre code').each(function(i, block) {

  										  hljs.highlightBlock(block);
										  });

                                       });
                                   }
                              else{$("input").hide(10, function() {
                                    $("#loader").show();
                                   
                                    var random = Math.floor(Math.random() * 1000);
                                    socket.emit('shell_exec', {
                                        sc: script,
                                        id: random
                                    });
                                    if(script.substring(0, 15)=='forever restart'|| script.substring(0, 7) == 'restart'){
                                    	console.log('ohk');
                                    	socket.on('disconnect',function(err){
                                    		 $("#exec").append('<p>Restarting server ...</p>');
                                    	});
                                    	socket.on('connect',function(err){
                                    		 $("#exec").append('<p>Succesfully Restarted server ...</p>');
                                    		$("#loader").hide();
                                    		$("input").show();
                                    	});
                                    }


                                    socket.on('shell_exec_response_' + script + random, function(data) {
                                      
                                          if (script.substring(0, 4) != 'edit'){  $("#exec").append('<p>')
                                          	data.result.replace(/^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/,'');
                                            for (i = 0; i < data.result.length; i++) {
                                            	
                                                if (data.result[i] != '\n') {
                                                    $("#exec").append(data.result[i])
                                                } else if (data.result[i] == '\n') {
                                                    $("#exec").append('<br>')
                                                }
                                                else{
                                                	$("#exec").append(' ')
                                                }
                                              }
                                            $("#exec").append('<br>CODE : ' + data.code + '</p>');
                                      }
                                        $("#loader").hide(10, function() {
                                            $("input").show();
                                        });
                                    });
                                });}
                            }
                        } else if (e.which == 38) {
                            $("input").val(">$ " + script);
                        }
                    });