
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
});

$(document).on("change","input[name='no_skill']",function(){
	if($("input[name='no_skill']").checked){
		$("#skill_inner_"+this.className).hide();
	}else{
		$("#skill_inner_"+this.className).show();
	}
});

function booty_make(obj){
	if(obj.value=="booty_append"){
		var number = $("#booty").attr("class");
		// クローニング
		var clone = $("#booty"+number).clone(true);
		number++;
		clone.id = "booty" + number;
		$("#booty").append(clone);
	}else if(obj.value=="booty_edit"){
		var number = $("#booty").attr("class");
		if(number == 0){
			return;
			// 一つ目は削除できない
		}
		// ここで値が入っている場合アラートを表示？
		if(!window.confirm("項目を削除しますか？")){
			return;
		}
		$("#booty"+number).empty();
		number--;
		$("#booty").attr("class",number);
	}
}

function release(obj){
	$("option[class=obj.className]").disabled = !$("option[class=obj.className]").disabled;
}

function commodity_change(obj){
	var id_num = $("#"+obj.className);
	// 銃撃の場合も分岐(射程と装填数)
	// 魔力撃も分岐
	// 攻撃障害も分岐(不可か可か、可なら回避いくつか)→不可、数字、なしのどれか。
	// 魔法適正はセレクトボックス
	for (var i=1; i<id_num.childlen().length; i++){
		id_num.childlen().remove()[i];
	}
	var magic_aptitude = {
		// ここはスキル順に
		multi_action : "マルチアクション",
		magic_induction : "魔法誘導",
		magic_convergence : "魔法収束",
		magic_control : "魔法制御",
		eagle_eye : "鷹の目",
		// 魔法拡大
		number: "数",
		distance : "距離",
		time : "時間",
		range : "範囲",
		certainly : "確実化",
		save : "マナセーブ",
		// MP軽減
		sorcerer  : "真語魔法",
		conjurer  : "操霊魔法",
		priest : "神聖魔法",
		faily : "妖精魔法",
		magitec : "魔動機術",
		word_break : "〆ワードブレイク"
	};
	if(obj.value=="shot" || "bow"){
		id_num.append(p_ex);

		id_num.find("p")[1].append("射程");

		id_num.find("p")[1].append(select_ex);	// p内に生成

		for(var i=10; i<50; i +=10){
			var option = document.createElement("option");
			option.value=i;
			option.innerHTML=i;
			id_num.find("select")[1].append(option);
		}
		id_num.find("p")[1].append("m");
		if(obj.value=="shot"){
			id_num.find("p")[1].append("　装填数");
			id_num.find("p")[1].append(select_ex);	// p内に生成
			for(var i=1; i<12; i++){
				var option = document.createElement("option");
				option.value=i;
				option.innerHTML=i;
				id_num.find("select")[1].append(option);
			}
			id_num.find("p")[1].append("発");
		}

	}else if(obj.value=="magic_hit" || "advanced_magic_hit"){
		id_num.append(p_ex);

		if(obj.value=="advanced_magic_hit"){
			id_num.find("p")[1].append("＋");
			id_num.find("p")[1].append(select_ex);	// p内に生成
			for(var i=1; i<12; i++){
				var option = document.createElement("option");
				option.value=i;
				option.innerHTML=i;
				id_num.find("select")[1].append(option);
			}
			id_num.find("p")[1].append("命中");
		}

		id_num.find("p")[1].append("＋");

		id_num.find("p")[1].append(select_ex);	// p内に生成

		for(var i=1; i<30; i++){
			var option = document.createElement("option");
			option.value=i;
			option.innerHTML=i;
			id_num.find("select")[1].append(option);
		}
		id_num.find("p")[1].append("ダメージ");

	}else if(obj.value=="obstruction"){
		id_num.append(p_ex);
		for (j=0; j<2; j++){
			id_num.find("p")[1].append(select_ex);
			var option = document.createElement("option");
			option.value="none";
			option.innerHTML="なし";
			id_num.find("select")[1].append(option);

			var option = document.createElement("option");
			option.value="unable";
			option.innerHTML="不可";
			id_num.find("select")[1].append(option);

			for(var i=1; i<8; i++){
				var option = document.createElement("option");
				option.value=i;
				option.innerHTML="＋"+i;
				id_num.find("select")[1].append(option);
			}
		}
	}else if(obj.value=="magic_aptitude"){
		id_num.append(p_ex);
		var j=0;
		jQuery.each(magic_aptitude,function(key,val){
			if(j%5==0){
				id_num.append(p_ex);
			}
			var input = document.createElement("input");
			input.value=key;
			input.innerHTML=val;
			id_num.find("select")[1].append(input);
			j += 5;
		});
	}
}






