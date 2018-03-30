
//class 12
$("#user-table-12-loader").show();
socket.emit('get_users_12');
socket.on('user_records_return_12', function (data) {
    console.log(data);
    localStorage.setItem('users_class_12', JSON.stringify(data));
    $("#user-table-12-loader").hide();
    var table = document.getElementById("user-table-12");
    data.forEach(function (item) {
        console.log(item);
        table.innerHTML += '<li><div class="collapsible-header">Name: ' + item.name + ' Class: ' + item.class + '</div><div class="collapsible-body"><span><ul class="collection"><li class="collection-item">Id:' + item._id + '</li><li class="collection-item">Contact: ' + item.contact + '</li><li class="collection-item">Email: ' + item.email + '</li> <li class="collection-item">Address: ' + item.address + '</li></ul></span></div> </li>';
    });

});
//class 11
$("#user-table-11-loader").show();
socket.emit('get_users_11');
socket.on('user_records_return_11', function (data) {
    $("#user-table-11-loader").hide();
    var table = document.getElementById("user-table-11");
    data.forEach(function (item) {
        console.log(item);
        table.innerHTML += '<li><div class="collapsible-header">Name: ' + item.name + ' Class: ' + item.class + '</div><div class="collapsible-body"><span><ul class="collection"><li class="collection-item">Id:' + item._id + '</li><li class="collection-item">Contact: ' + item.contact + '</li><li class="collection-item">Email: ' + item.email + '</li> <li class="collection-item">Address: ' + item.address + '</li></ul></span></div> </li>';
    });
});
//class 10
$("#user-table-10-loader").show();
socket.emit('get_users_10');
socket.on('user_records_return_10', function (data) {
    $("#user-table-10-loader").hide();
    var table = document.getElementById("user-table-10");
    data.forEach(function (item) {
        console.log(item);
        table.innerHTML += '<li><div class="collapsible-header">Name: ' + item.name + ' Class: ' + item.class + '</div><div class="collapsible-body"><span><ul class="collection"><li class="collection-item">Id:' + item._id + '</li><li class="collection-item">Contact: ' + item.contact + '</li><li class="collection-item">Email: ' + item.email + '</li> <li class="collection-item">Address: ' + item.address + '</li></ul></span></div> </li>';
    });
});
//class 
$("#user-table-9-loader").show();
socket.emit('get_users_9');
socket.on('user_records_return_9', function (data) {
    $("#user-table-9-loader").hide();
    var table = document.getElementById("user-table-9");
    data.forEach(function (item) {
        console.log(item);
        table.innerHTML += '<li><div class="collapsible-header">Name: ' + item.name + ' Class: ' + item.class + '</div><div class="collapsible-body"><span><ul class="collection"><li class="collection-item">Id:' + item._id + '</li><li class="collection-item">Contact: ' + item.contact + '</li><li class="collection-item">Email: ' + item.email + '</li> <li class="collection-item">Address: ' + item.address + '</li></ul></span></div> </li>';
    });
});
socket.emit('database-size');
socket.on('database-size-return', function (data) {
    console.log(data);
    $("#name").text("Databse name: " + data.name);
    $("#csize").text("Current size: " + data.size + " Mb");
    var myCircle = Circles.create({
        id: 'circles-1',
        radius: 60,
        value: (data.size / 1024) * 100,
        maxValue: 100,
        width: 10,
        text: function (value) {
            return value + '%';
        },
        colors: ['#D3B6C6', '#4B253A'],
        duration: 400,
        wrpClass: 'circles-wrp',
        valueStrokeClass: 'circles-valueStroke',
        maxValueStrokeClass: 'circles-maxValueStroke',
        styleWrapper: true,
        styleText: true
    });
});