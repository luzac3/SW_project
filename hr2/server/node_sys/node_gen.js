//<script type="text/javascript" src="node_gen.js"></script>
$(document).ready(function(){
	var socket = io.connect();

	socket.on("server_to_client", function(data){
		console.log("s2c:"+data);
		appendMsg(data.value);
	});

	function appendMsg(text) {
		$("#recieve").append("<p>" + text + "</p>");
	}

	$("form").submit(function(e){
		var message = $("#msgform").val();
		console.log("c2s:"+message);
		$("#msgform").val('');
		socket.emit("client_to_server", {value : message});
		e.preventDefault();
		//test
	});
});
