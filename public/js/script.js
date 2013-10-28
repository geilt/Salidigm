var socket = io.connect('http://salidigm.com:11342');

$(document).on('ready', function(){
	socket.on('connect', function(){
		$(document).on('click', '.attack', function(){
			socket.emit('combat/attack', { my: 'data' }, function (data){
				console.log(data);
			});
		});
		$(document).on('click', '.defend', function(){
			socket.emit('combat/defend', { my: 'data' }, function (data){
				console.log(data);
			});
		});
	});
});

socket.on('combat/result', function (data) {
	console.log(data);
});