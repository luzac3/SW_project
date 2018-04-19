function table_select(kind){
	var kind = kind.value;
	$("#tb_show").attr("class",kind);
	$("#tb_edit").attr("class",kind);
	table_change(kind);
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

$(document).ready(function(){
	var top =window.parent.screen.height/2-300+"px";
	$("form").css({
        "margin-top": top
	});
});