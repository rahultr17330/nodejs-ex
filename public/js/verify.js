var socket = io();
var user_authentication_level=0;
function verify() {
    var email = Cookies.get("Email");
    socket.emit('user_verification', {
        user_email: email
    });
    console.log(email);
    Cookies.set("verification_call", 1);
    var client_id = "verification_callback_" + Cookies.get('Email');
    socket.on(client_id, function (data) {
           Cookies.set("user_authentication_level",data.response);
        if (data.response == 1 || data.response == 2) {
            $('#verification').hide(function () {
                $('#verificationb').hide(function () {
                    $('#continue_button').html('<a href="/resources" class="waves-effect waves-light btn" id="continue" style=" background-color: rgb(252, 0, 34); color:#fdfdfd">Continue <i class="material-icons right" style="color: white;">send</i> </a>');
                    $("#resources").html('<a class="waves-effect" href="/resources">Resources</a>');
                    $("#resourcesb").html('<a class="waves-effect" style="color:black" href="/resources">Resources</a>');
                    $('#continue_buttonb').html('<a href="/resources" class="waves-effect waves-light btn" id="continue" style=" background-color: rgb(252, 0, 34); color:#fdfdfd">Continue <i class="material-icons right" style="color: white;">send</i> </a>');
                });
            });
            if(data.response ==2){
                $("#admin-panel").html('<a class="waves-effect" style="color:black" href="/admin-panel">Admin Panel</a>');
                $("#admin-panelb").html('<a class="waves-effect" style="color:black" href="/admin-panel">Admin Panel</a>');
                
            }
        } else {
            $('#verification').hide(function () {
                $('#verificationb').hide(function () {
                    $('#error').show();
                    $('#errorb').show();
                });
            });
        }
    });
}
