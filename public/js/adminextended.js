$('.collapsible').collapsible();
$('.dropdown-button').dropdown({
    inDuration: 300,
    outDuration: 225,
    constrainWidth: false, // Does not change width of dropdown to that of the activator
    hover: true, // Activate on hover
    gutter: 0, // Spacing from edge
    belowOrigin: false, // Displays dropdown below the button
    alignment: 'left', // Displays dropdown with edge aligned to the left of button
    stopPropagation: false // Stops event propagation
});
$('.modal').modal();
$('ul.tabs').tabs();
$('select').material_select();
$("#sort_12").click(function () {
    $("#user-table-12").html(' <center> <div class="preloader-wrapper big active" id="user-table-10-loader"><div class="spinner-layer spinner-red-only"> <div class="circle-clipper left">    <div class="circle"></div>       </div>     <div class="gap-patch">     <div class="circle"></div>   </div>   <div class="circle-clipper right">      <div class="circle"></div>     </div>     </div>   </div>  </center>');
    console.log("clicked");
    var record = JSON.parse(localStorage.getItem('users_class_12'));
    for (var i = 0; i < record.length; i++) {
        for (var j = 0; j < record.length - i - 1; j++) {
            if (record[j].name[0] > record[j + 1].name[0]) {
                var temp = record[j];
                record[j] = record[j + 1];
                record[j + 1] = temp;
            }
        }
    }
    $("#user-table-12").html("");
    for (var i = 0; i < record.length; i++) {
        $("#user-table-12").append('<li id=' + "user_" + i + '><div class="collapsible-header">Name: ' + record[i].name + ' Class: ' + record[i].class + '</div><div class="collapsible-body"><span><ul class="collection"  id=' + "infoarea_" + i + '><li class="collection-item" >Id:' + record[i]._id + '</li><li class="collection-item">Contact: ' + record[i].contact + '</li><li class="collection-item">Email: ' + record[i].email + '</li> <li class="collection-item">Address: ' + record[i].address + '</li><li><delete id=' + "delete_" + i + '><i class="material-icons" style="color:#ff001f;">delete</i></delete><edit id=' + "append_" + i + '><i class="material-icons" style="color:#03a9f4;">edit</i></edit></li></ul><formarea id=' + "form_" + i + ' style="display:none"></formarea></span></div> </li>');
    }
    localStorage.setItem('users_class_12', JSON.stringify(record));
    $("delete").click(function (event) {
        var id = $(this).attr("id");
        var parent = $(this).parent().parent().parent().parent().parent().attr("id");
        parent = "#" + parent;
        var length = id.length;
        var index = id[length - 1];
        var record = JSON.parse(localStorage.getItem('users_class_12'));

        $.confirm({
            theme: 'material',
            title: 'Confirm Deletion !',
            type: 'red',
            content: "Are You Sure You Want to remove " + record[index].name + "'s record ?",
            buttons: {
                confirm: {
                    text: 'Confirm',
                    btnClass: 'btn-red',
                    action: function () {
                        socket.emit('delete_from_12', {
                            _id: record[index]._id
                        });
                        socket.on('deletion_confirmation', function (data) {
                            $.alert({
                                theme: 'material',
                                type: 'green',
                                title: 'Sucess !',
                                content: 'Id:' + data.id + ' Message: ' + data.message,
                                buttons: {
                                    ok: {
                                        text: 'Okay',
                                        btnClass: 'btn-green',
                                        action: function () {

                                            var record = JSON.parse(localStorage.getItem('users_class_12'));
                                            record.splice(index, 1);
                                            $(parent).remove();
                                            localStorage.setItem('users_class_12', JSON.stringify(record));
                                        }
                                    }
                                }
                            });
                        });
                    }
                },
                cancel: function () {
                    Materialize.toast('Cancelled!', 4000);
                }
            }
        });
    });
    $("edit").click(function () {
        var id = $(this).attr("id");
        var length = id.length;
        var index = id[length - 1];
        var area = "#infoarea_" + index;
        var formarea = "#form_" + index;
        var record = JSON.parse(localStorage.getItem('users_class_12'));
        $(area).hide(function () {
            $(formarea).html("");
            $(formarea).append('<form class="col s12"><div class="row"><div class="input-field col s6"><input id="last_name_update" value=' + JSON.stringify(record[index].name) + ' type="text" class="validate"><label for="last_name">Name</label></div><div class="row"><div class="input-field col s6"><input id="address_update"  value=' + JSON.stringify(record[index].address) + ' type="text" class="validate"><label for="address">address</label>          </div>        </div>      <div class="row">          <div class="input-field col s12">            <input id="contact_update"  value=' + JSON.stringify(record[index].contact) + ' type="tel" class="validate">        <label for="contact">Contact</label>     </div>   </div>  <div class="row">    <div class="input-field col s12">     <input id="email_update"  value=' + JSON.stringify(record[index].email) + ' type="email" class="validate">     <label for="email">Email</label>     </div>  </div>  </form><a class="waves-effect waves-light btn save_form"><i class="material-icons left">save</i>Save</a>  <a class="waves-effect waves-light btn close_form" style="margin-left:5px;"><i class="material-icons left">close</i>Close</a>');
            $(formarea).show();
            $(".save_form").click(function () {
                var old_user_info = {
                    id: record[index]._id,
                    name: $("#last_name_update").val(),
                    class: "XII",
                    email: $("#email_update").val(),
                    address: $("#address_update").val(),
                    contact: $("#contact_update").val()
                };
                console.log(old_user_info);
                socket.emit('update_info', old_user_info);
            });
            $(".close_form").click(function () {
                $(formarea).hide(function () {
                    $(area).show();
                });

            });
        });
    });

});
socket.on('update_record_callback', function (response) {
    $.alert({
        theme: 'material',
        type: 'green',
        title: 'Sucess !',
        content: ' Callback: ' + response,
        buttons: {
            ok: {
                text: 'Okay',
                btnClass: 'btn-green',
                action: function () {
                    if (user_class = "XII") {
                        socket.emit('get_users_12');
                        socket.on('user_records_return_12', function (data) {
                            console.log(data);
                            localStorage.setItem('users_class_12', JSON.stringify(data));
                            $("#user-table-12-loader").hide();
                            var table = document.getElementById("user-table-12");
                            table.innerHTML = '';
                            data.forEach(function (item) {
                                console.log(item);
                                table.innerHTML += '<li><div class="collapsible-header">Name: ' + item.name + ' Class: ' + item.class + '</div><div class="collapsible-body"><span><ul class="collection"><li class="collection-item">Id:' + item._id + '</li><li class="collection-item">Contact: ' + item.contact + '</li><li class="collection-item">Email: ' + item.email + '</li> <li class="collection-item">Address: ' + item.address + '</li></ul></span></div> </li>';
                            });

                        });
                    }
                }
            }
        }
    });
});


$("#insert_record").click(function () {
    var user_class = $("#class").val();
    var new_user_info = {
        name: $("#last_name").val(),
        class: $("#class").val(),
        email: $("#email").val(),
        address: $("#address").val(),
        contact: $("#contact").val()
    };
    console.log(new_user_info);
    socket.emit('insert_new_user', new_user_info);
    socket.on('insert_record_callback', function (response) {
        $.alert({
            theme: 'material',
            type: 'green',
            title: 'Sucess !',
            content: ' Callback: ' + response,
            buttons: {
                ok: {
                    text: 'Okay',
                    btnClass: 'btn-green',
                    action: function () {
                        if (user_class = "XII") {
                            socket.emit('get_users_12');
                            socket.on('user_records_return_12', function (data) {
                                console.log(data);
                                localStorage.setItem('users_class_12', JSON.stringify(data));
                                $("#user-table-12-loader").hide();
                                var table = document.getElementById("user-table-12");
                                table.innerHTML = '';
                                data.forEach(function (item) {
                                    console.log(item);
                                    table.innerHTML += '<li><div class="collapsible-header">Name: ' + item.name + ' Class: ' + item.class + '</div><div class="collapsible-body"><span><ul class="collection"><li class="collection-item">Id:' + item._id + '</li><li class="collection-item">Contact: ' + item.contact + '</li><li class="collection-item">Email: ' + item.email + '</li> <li class="collection-item">Address: ' + item.address + '</li></ul></span></div> </li>';
                                });

                            });
                        }
                    }
                }
            }
        });
    });
});
$("#search_12_btn").click(function () {
    $("#search_12").fadeToggle(200);
});
socket.emit('get_file_info');
socket.on('get_file_info_callback', function (data) {
    localStorage.setItem('file_info_database', JSON.stringify(data));
});