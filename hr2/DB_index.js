

function table_select(kind){
	var kind = kind.value;
	$("#tb_show").attr("class",kind);
	$("#tb_edit").attr("class",kind);
}

function enter(obj){
	var url = "special.html?table="+obj.className;
	if (obj.value == "coop"){
		url = "coop.html?table="+obj.className;
	}
	console.log(url);
	window.location.href =url;
	//location.url;
}

function table_change(obj){
	var url=[];
	var url_split = window.location.href.split("=");
	url = url_split[0];
	url += obj.value;
	console.log(url);
	window.location.href =url;
}