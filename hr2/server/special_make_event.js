
$(document).ready(function(){
  var table = $("form").id;
  $("table").find("option[value=table]").attr("selected","selected");
  load_make();
});

$(document).on("change","input[name='first_select']",function(){
	special_make(this);
});

$(document).on("change","input[name='magic']",function(){
	$("select[class='"+this.className+"']")[0].disabled = !$("select[class='"+this.className+"']")[0].disabled;
	$("select[class='"+this.className+"']")[1].disabled = !$("select[class='"+this.className+"']")[1].disabled;
	if(this.value=="fairy_limit"){
		var limit = {

		}
		//ここに魔法を記載していく
	}
});

$(document).on("change","input[value='ricovery']",function(){
	$("select[class='"+this.className+"']")[0].disabled = !$("select[class='"+this.className+"']")[0].disabled;
});

$(document).on("change","input[name='no_skill']",function(){
	if($("input[name='no_skill']").prop("checked")){
		$("#skill_inner_"+this.className).hide();
	}else{
		$("#skill_inner_"+this.className).show();
	}
});

$(document).on("change","select[name='commodity']",function(){
	var id_num = $("#"+this.className);
	var check=id_num.find("option:selected").val();
	var content = $(id_num.find("p select")[0]).html();
	id_num.empty();
	id_num.append("<p>");
	var select = document.createElement("select");
	select.name=this.name;
	select.className=this.className;
	id_num.find("p").append(select);
	id_num.find("select").append(content);
	id_num.find("select").val(check);

	var magic_aptitude = {
		// ここはスキル順に
		multi_action : "マルチアクション",
		magic_induction : "魔法誘導",
		magic_convergence : "魔法収束",
		magic_control : "魔法制御",
		eagle_eye : "鷹の目",
		expantion:"魔法拡大",
		// 魔法拡大

		save : "マナセーブ",
		// MP軽減

		word_break : "〆ワードブレイク"
	};

	var select_ex=("<select>");
	if(this.value=="shot"){
		$(id_num.find("p")[0]).append("／")
		$(id_num.find("p")[0]).append(select_ex);	// p内に生成
		for(var i=0; i<30; i++){
			var option = document.createElement("option");
			option.value=i;
			option.innerHTML=i;
			$(id_num.find("select")[1]).append(option);
		}
		$(id_num.find("p")[0]).append("／回避力／消滅　")

		$(id_num.find("p")[0]).append("射程");

		$(id_num.find("p")[0]).append(select_ex);	// p内に生成

		for(var i=10; i<=50; i +=10){
			var option = document.createElement("option");
			option.value=i;
			option.innerHTML=i;
			$(id_num.find("select")[2]).append(option);
		}
		$(id_num.find("p")[0]).append("m");
		if(this.value=="shot"){
			$(id_num.find("p")[1]).append("　装填数");
			$(id_num.find("p")[1]).append(select_ex);	// p内に生成
			for(var i=1; i<12; i++){
				var option = document.createElement("option");
				option.value=i;
				option.innerHTML=i;
				$(id_num.find("select")[3]).append(option);
			}
			$(id_num.find("p")[1]).append("発");
		}

	}else if(this.value=="bow"){
		$(id_num.find("p")[0]).append("　射程");

		$(id_num.find("p")[0]).append(select_ex);	// p内に生成

		for(var i=10; i<=50; i +=10){
			var option = document.createElement("option");
			option.value=i;
			option.innerHTML=i;
			$(id_num.find("select")[1]).append(option);
		}
		$(id_num.find("p")[0]).append("m");

	}else if(this.value == "magic_hit" || this.value == "advanced_magic_hit"){
		var j=1;
		if(this.value=="advanced_magic_hit"){
			$(id_num.find("p")[0]).append("＋");
			$(id_num.find("p")[0]).append(select_ex);	// p内に生成
			for(var i=1; i<12; i++){
				var option = document.createElement("option");
				option.value=i;
				option.innerHTML=i;
				$(id_num.find("select")[j]).append(option);
			}
			$(id_num.find("p")[0]).append("命中");
			j++;
		}

		$(id_num.find("p")[0]).append("＋");

		$(id_num.find("p")[0]).append(select_ex);	// p内に生成

		for(var i=1; i<30; i++){
			var option = document.createElement("option");
			option.value=i;
			option.innerHTML=i;
			$(id_num.find("select")[j]).append(option);
		}
		$(id_num.find("p")[0]).append("ダメージ");

	}else if(this.value=="obstruction"){
		id_num.append(p_ex);
		for (j=1; j<=2; j++){
			$(id_num.find("p")[0]).append(select_ex);
			var option = document.createElement("option");
			option.value="none";
			option.innerHTML="なし";
			$(id_num.find("select")[j]).append(option);

			var option = document.createElement("option");
			option.value="unable";
			option.innerHTML="不可";
			$(id_num.find("select")[j]).append(option);

			for(var i=1; i<8; i++){
				var option = document.createElement("option");
				option.value=i;
				option.innerHTML="＋"+i;
				$(id_num.find("select")[j]).append(option);
			}
		}
	}else if(this.value=="magic_aptitude"){
		var _this=this;
		var p_ex=("<p>");
		id_num.append(p_ex);
		var i=1,j=0,temp=0;
		jQuery.each(magic_aptitude,function(key,val){
			if(key=="expantion" || key=="save"){
				id_num.append(p_ex);
				i++;
			}
			var input = document.createElement("input");
			input.name=_this.value;
			input.value=key;
			input.type="checkbox";
			$(id_num.find("p")[i]).append("<label>");
			$(id_num.find("label")[j]).append(input);
			$(id_num.find("label")[j]).append(val);

			if(key=="expantion" || key=="save"){
				id_num.append(p_ex);
				i++;
				temp=0;
			}
			temp += parseInt(val.length);
			if(temp>20){
				temp =0;
				id_num.append(p_ex);
				i++;
			}
			j++;
		});
	}
});

$(document).on("change","input[name='magic_aptitude']",function(){
	var expantion = {
		number: "数",
		distance : "距離",
		time : "時間",
		range : "範囲",
		certainly : "確実化"
	};

	var save = {
		sorcerer  : "真語魔法",
		conjurer  : "操霊魔法",
		priest : "神聖魔法",
		faily : "妖精魔法",
		magitec : "魔動機術"
	};

	if(this.value=="expantion" || this.value=="save"){

		if($(this).prop("checked")){
			$(this).closest("p").after("<p>");
			var _this=$(this);

			if(this.value=="expantion"){
				var array = expantion;
			}else{
				var array = save;
			}

			jQuery.each(array,function(key,val){
				var input = document.createElement("input");
				input.name=_this.value;
				input.value=key;
				input.type="checkbox";
				_this.closest("p").next().append("<label>");
				_this.closest("p").next().find("label:last-child").append(input);
				_this.closest("p").next().find("label:last-child").append(val);
			});
		}else{
			$(this).closest("p").next().remove();
		}
	}
});

$(document).on("change","input[name='other']",function(){
	var id_num = $("#"+this.className);
	var resist = $(this).closest("p").clone(true);
	id_num.empty();
	id_num.html(resist);
	var p_ex="<p></p>";
	var len = $(this.closest("p")[0]).nextAll().length;
	for(var i=0; i<len; i++){
		this.closest("p").next().remove();
	}
	id_num.append("<p>");

	var select=document.createElement("select");
	select.name=this.name;
	$(id_num.find("p")[1]).append(select);

	$(id_num.find("select")[0]).append("<option>〆</option>");
	$(id_num.find("select")[0]).append("<option>○</option>");
	$(id_num.find("select")[0]).append("<option>&#x2611;</option>");
	$(id_num.find("select")[0]).append("<option>▽</option>");
	$(id_num.find("select")[0]).append("<option>▼</option>");
	$(id_num.find("select")[0]).append("<option>☆</option>");
	$(id_num.find("select")[0]).append("<option>複数</option>");
	//これを選んだ場合は、☑、〆、○のどれかだろ

	var input = document.createElement("input");
	input.name=this.name
	input.type="text";
	$(id_num.find("p")[1]).append("能力名:");
	$(id_num.find("p")[1]).append(input);

	if(this.value == "resist_able"){
		$(id_num.find("p")[1]).append("／");
		var select = document.createElement("select");
		select.name=this.name;
		$(id_num.find("p")[1]).append(select);
		for(var i=1; i<31; i++){
			var option=document.createElement("option");
			option.value=i;
			option.innerHTML=i;
			$(id_num.find("select")[1]).append(option);
		}

		$(id_num.find("p")[1]).append("／");
		var select = document.createElement("select");
		select.name=this.name;
		$(id_num.find("p")[1]).append(select);

		$(id_num.find("select")[1]).append("<option>生命抵抗力</option>");
		$(id_num.find("select")[1]).append("<option>精神抵抗力</option>");
		$(id_num.find("select")[1]).append("<option>回避力</option>");
		$(id_num.find("select")[1]).append("<option>危険感知</option>");

		$(id_num.find("p")[1]).append("／");
		var select = document.createElement("select");
		select.name=this.name;
		$(id_num.find("p")[1]).append(select);

		$(id_num.find("select")[2]).append("<option>消滅</option>");
		$(id_num.find("select")[2]).append("<option>半減</option>");
		$(id_num.find("select")[2]).append("<option>なし</option>");
	}
		id_num.append("<p>説明</p>");
		id_num.append(p_ex);
		var textarea = document.createElement("textarea");
		textarea.name="resist_unable";
		$(id_num.find("p")[3]).append(textarea);

});