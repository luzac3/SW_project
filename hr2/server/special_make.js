//ボタンの実装急げよ

function table_change(obj){
	var url=[];
	var url_split = window.location.href.split("=");
	url = url_split[0];
	url += "="+obj.value;
	window.location.href =url;
}
$(document).on("change","[name=word_first]:checked",function(){
	if($(this).val() != "exist"){
		$(".word_disabled").hide();
	}else{
		$(".word_disabled").show();
	}
});
//その他ボタン設置

$(document).on("click","#word button",function(){
	if(this.value=="add"){
		$(this).parent().prev().clone(true).insertBefore($(this).parent());
	}else{
		if($("#word").find("[value='other']").length<2){
			alert("一つだけの要素は削除できません");
		}else{
			$(this).parent().prev().remove();
		}
	}
});

$(document).on("change","[name=habitat_first]:checked",function(){
	if($(this).val() != "other"){
		$(".habitat_disabled").hide();
	}else{
		$(".habitat_disabled").show();
	}
});

$(document).on("click","#habitat button",function(){
	if(this.value=="add"){
		$(this).parent().prev().clone(true).insertBefore($(this).parent());
	}else{
		if($("#habitat").find("[value='other']").length<3){
			alert("一つだけの要素は削除できません");
		}else{
			$(this).parent().prev().remove();
		}
	}
});

$(document).on("change","#move input",function(){
	if(this.value=="fly"){
		if($(this).prop("checked")){
			$(this).next().prop("disabled",true);
			$(this).next().next().prop("disabled",false);
		}else{
			$(this).next().prop("disabled",false);
			$(this).next().next().prop("disabled",true);

		}
	}
	if(this.value=="swim"){
		if($(this).prop("checked")){
			$(this).prev().prop("disabled",true);
			$(this).next().prop("disabled",false);
		}else{
			$(this).prev().prop("disabled",false);
			$(this).next().prop("disabled",true);
		}
	}
});

function region_make(obj){
	var val = obj.value;
	//追加要件・コア部位、部位、スキル部位(この部分だけ最初1枠)
	//hideクラスを持つ者はOnload時に隠す
	if(val>1){
		$(".hide").show();
	}else{
		$(".hide").hide();
	}
	var status=$("#status_0").html();
	$("#status_0").parent().html("<div id='status_0'>"+status+"</div>");

	var reg_name = $("#region_name").find("p:first-child").html();
	$("#region_name").find("p:first-child").parent().html("<p>"+reg_name+"</p>");

	for(var i=0; i<val-1; i++){
		$("#status_"+i).clone(true).attr("id","status_"+parseInt(i+1)).insertAfter($("#status_"+i));
		$("#region_name").find("p:last-child").clone(true).insertAfter($("#region_name").find("p:last-child"));
	}
}

function skill_region(obj){
	console.log($(obj.closest("tr")).find("p:last").clone(true));
	if(obj.value=="add"){
		var num = $(obj.closest("tr")).find("p:last").attr("class");
		num = parseInt(num)+parseInt(1);
		$(obj.closest("tr")).find("p:last").clone(true).attr("class",num).insertAfter($(obj.closest("tr")).find("p:last"));
	}else{
		if($(obj.closest("tr")).find("input").length<2){
			alert("一つだけの要素は削除できません");
		}else{
			$(obj.closest("tr")).find("p:last-child").remove();
		}
	}
}
$(document).ready(function(){
	$(".hide").hide();
	var table = $($("form")[0]).attr("id");
	$($("table select:first-child")[0]).val(table);
	load_make();
});


$(function(){
	$("#skill").on("change",".skill input",function(){
		special_make(this);
	});
	$("#skill").on("click","button",function(){
		special_make(this);
	});
});


function special_make(obj){
	var number = $("#skill_"+obj.className).attr("class");
	//obj.classNameは部位のナンバリングです

	if(obj.value == "skill_delete"){
		var id_num = obj.className+"_"+number;
		// 内容が入っていたら警告するように作り直す？できなくはないがめんどくさいぞ

		if(number == 0){
			alert("項目が一つしかない場合は削除できません");
			return;
		}
		if(!window.confirm("項目を削除しますか？")){
			return;
		}
		$("#first_select_"+id_num).remove();
		$("#skill_insert_"+id_num).remove();
		// 中身を全部消す
		number--;
		$("#skill_"+obj.className).attr("class",number);
		// クラスデータを書き換える
		return;
		// 終了
	}

	if(obj.value == "skill_append"){
		number++;
		$("#skill_"+obj.className).attr("class",number);

		var p = document.createElement("p");
		p.id="first_select_"+obj.className+"_"+number;
		p.className="skill";
		$("#skill_inner_"+obj.className).append(p);

		var div = document.createElement("div");
		div.id="skill_insert_"+obj.className+"_"+number;
		$("#skill_inner_"+obj.className).append(div);

		var first_select_array = {
			"resistance":"○○無効",
			"magic" : "魔法",
			"enhancer" : "練技",
			"song" : "呪歌",
			"commodity" : "汎用",
			"other" : "その他"
		};
		$("#first_select_"+obj.className+"_"+number).empty();
		jQuery.each(first_select_array,function(key,val){
			var input = document.createElement("input");
			if(key == "resistance"){
				input.checked="checked";
			}
			input.type = "radio";
			input.name = "first_select_"+number;
			input.value = key;
			input.className= obj.className;
			//jqueryのonイベントで取得してもいい。うまく動かなければそちらで
			$("#first_select_"+obj.className+"_"+number).append(input);
			$("#first_select_"+obj.className+"_"+number).append(val);
		});
		var first_select = "resistance";
		var id_num = $("#skill_insert_"+obj.className+"_"+number);
	}else{
		var first_select=obj.value;
		id_num = $("#skill_insert_"+obj.className+"_"+number);
	}

	id_num.empty();

	var select_ex="<option></option>";
	var p_ex="<p></p>";
	var span_ex="<span></span>";
	switch(first_select){

	/**
	 * なし、無効/耐性、魔法、戦闘特技、練技、汎用、その他・ラジオ
	 */
	case "none":
		// 何もしない、というかここが呼ばれることはないはずなんだが
	case "resistance":
		var resistance_list = {
			fire_invalid : "炎無効",
			ice_invalid : "水・氷無効",
			thunder_invalid : "雷無効",
			wind_invalid : "風無効",
			ground_invalid : "土無効",
			pure_invalid : "純エネルギー無効",
			impact_invalid : "衝撃・斬撃属性無効",
			normal_invalid : "通常武器無効",
			disease_invalid : "病気属性無効",
			poison_invalid : "毒属性無効",
			pow_weak_invalid : "精神効果属性(弱)無効",
			pow_invalid : "精神効果属性無効",
			curse_invalid : "呪い属性無効",
			magic_invalid : "魔法無効",
			magic_registance : "魔法耐性",
			bones : "骨の身体",
			iron : "機械の身体",
			machine : "機械の身体",
			machine : "機械の身体",
			rock : "岩の身体"
		};
		//メモ：書いてある部分はすべて出力時spanタグでくくる

		id_num.append(p_ex);
		var i=0,j=0;
		var temp=0;
		// まずはPで段落生成
		jQuery.each(resistance_list,function(key,val){
			var input = document.createElement("input");
			input.type ="checkbox";
			input.name=first_select;
			input.value=key;
			$(id_num.find("p")[i]).append("<label>");
			$(id_num.find("label")[j]).append(input);
			$(id_num.find("label")[j]).append(val);
			//こんな感じ　修正
			temp += parseInt(val.length);
			if(temp>20){
				id_num.append(p_ex);
				temp=0;
				i++;
			}
			j++;
			//20オーバーで段落変更
		});
		break;

	case "magic":
		var magic_list = {
			sorcerer : "真語魔法",
			conjurer : "操霊魔法",
			priest : "神聖魔法",
			magitec : "魔動機術",
			fairy : "妖精魔法",
			fairy_limit :"妖精魔法限定",
			other : "その他",
		};
		//つまりリミット系は選択式イベントで表示する必要がある(チェックしたら作成するやつ)

		// その他は特殊系統なので、選択したら別に表示させる
		var i=0;
		jQuery.each(magic_list,function(key,val){
			id_num.append(p_ex);

			var input = document.createElement("input");
			input.name=first_select;
			input.value=key;
			input.className=key+"_"+obj.className;
			input.type="checkbox";
			$(id_num.find("p")[i]).append("<label>");
			$(id_num.find("label")[i]).append(input);
			$(id_num.find("label")[i]).append(val);

			$(id_num.find("p")[i]).append(span_ex);

			if(key=="other"){
				var input = document.createElement("input");
				input.name=first_select;
				input.value=key;
				$(id_num.find("span")[i]).append("　名称");
				var input = document.createElement("input");
				input.type ="text";
				$(id_num.find("span")[i]).append(input);	// p内に生成
			}

			var select = document.createElement("select");
			select.className=key+"_"+obj.className;
			select.disabled=true;
			select.id=key+"_level";
			$(id_num.find("span")[i]).append(select);
			for(l=1; l<=15; l++){
				var option = document.createElement("option");
				option.value=l;
				option.innerHTML=l;
				$(id_num.find("#"+key+"_level")).append(option);
			}

			$(id_num.find("span")[i]).append("レベル／魔力");

			var select = document.createElement("select");
			select.className=key+"_"+obj.className;
			select.disabled=true;
			select.id=key+"_power";
			$(id_num.find("span")[i]).append(select);
			for(l=1; l<=30; l++){
				var option = document.createElement("option");
				option.value=l;
				option.innerHTML=l;
				$(id_num.find("#"+key+"_power")).append(option);
			}

			if(key=="other"){
				var input = document.createElement("input");
				input.name=first_select;
				input.value=key;
				$(id_num.find("span")[i]).append("説明");
				var input = document.createElement("input");
				input.type ="text";
				$(id_num.find("span")[i]).append(input);	// p内に生成
			}

			i++;
		});
		break;

	case "enhancer":
		var enhancer = {
			// ここはスキル順に
			anti_body : "アンチボディ",
			owl_vision : "オウルビジョン",
			gazzel_hoot : "ガゼルフット",
			cats_eye : "キャッツアイ",
			scale_leggings : "スケイルレギンス",
			strong_blood: "ストロングブラッド",
			tick_tick : "チックチック",
			dragon_tale : "ドラゴンテイル",
			beatle_skin : "ビートルスキン",
			muscle_bear : "マッスルベアー",
			medi_tation : "メディテーション",
			rabbit_ear : "ラビットイヤー",
			centaur_leg  : "ケンタウロスレッグ",
			shape_animal : "シェイプアニマル",
			giant_arm : "ジャイアントアーム",
			sphinx_knowledge : "スフィンクスノレッジ",
			deamon_finger : "デーモンフィンガー",
			fire_bress : "ファイアブレス",
			ricovery : "リカバリィ",
			//回復量？
			wide_wing : "ワイドウィング",
			chameleon_camouflage : "カメレオンカムフラージュ",
			kraken_stability  : "クラーケンスタビリティ",
			gie_prophecy : "ジィプロフェシー",
			strider_walk  : "ストライダーウォーク",
			spider_web : "スパイダーウェブ",
			titan_foot : "タイタンフット",
			troll_vital : "トロールバイタル",
			balloon_seed_shot : "バルーンシードショット",
			fenrir_bite  : "フェンリルバイト",
			healthy_body  : "ヘルシーボディ"
		};
		id_num.append(p_ex);
		var input = document.createElement("input");
		input.name=first_select;
		input.className="secrets";
		input.type="checkbox";
		$(id_num.find("p")[0]).append(input);
		$(id_num.find("p")[0]).append("練体の極意");

		var input = document.createElement("input");
		input.type="radio";
		input.name=first_select;
		input.value="exist";
		$(id_num.find("p")[0]).append(input);
		$(id_num.find("p")[0]).append("あり");

		var input = document.createElement("input");
		input.type="radio";
		input.name=first_select;
		input.value="none";
		input.checked="checked";
		$(id_num.find("p")[0]).append(input);
		$(id_num.find("p")[0]).append("なし");

		id_num.append(p_ex);
		var j=0,temp=0;
		var i=1;
		jQuery.each(enhancer,function(key,val){
			if(key=="ricovery"){
				var input=document.createElement("input");
				input.name=first_select;
				input.type="checkbox";
				input.value=key;
				input.className=key+"_"+obj.className;
				$(id_num.find("p")[i]).append("<label>");
				$(id_num.find("label")[j]).append(input);
				$(id_num.find("label")[j]).append(val);

				var select = document.createElement("select");
				select.className=key+"_"+obj.className;
				select.disabled=true;
				$(id_num.find("label")[j]).append(select);
				for(var k=1; k<=20; k++){
					var option = document.createElement("option");
					option.value=k;
					option.innerHTML=k;
					$(id_num.find("select")[0]).append(option);
				}
				temp += parseInt(val.length)+3;
				j++;
				return true;
			}
			var input = document.createElement("input");
			input.name=first_select;
			input.type="checkbox";
			input.value=key;
			input.innerHTML=val;
			$(id_num.find("p")[i]).append("<label>");
			$(id_num.find("label")[j]).append(input);
			$(id_num.find("label")[j]).append(val);
			temp += parseInt(val.length);
			if(temp>21){
				temp =0;
				id_num.append(p_ex);
				i++;
			}
			j++;
		});
		break;

	case "song":
		var song = {
			early_bird :"アーリーバード",
			summon_small_animl :"サモン・スモールアニマル",
			summon_fish :"サモン・フィッシュ",
			ambient:"アンビエント",
			noise:"ノイズ",
			ballade:"バラード",
			healing:"ヒーリング",
			vivid:"ビビッド",
			morals:"モラル",
			lullaby:"ララバイ",
			requiem :"レクイエム",
			resistance:"レジスタンス",
			atribute:"アトリビュート",
			curiosity:"キュアリオスティ",
			charming:"チャーミング",
			choke:"チョーク",
			noody:"ヌーディ",
			nostalgy:"ノスタルジィ",
			bitter:"ビター",
			love_song:"ラブソング",
			amasing:"アメージング",
			crap:"クラップ",
			chorus:"コーラス",
			sonic_voice:"ソニックヴォイス",
			dull:"ダル",
			dance:"ダンス",
			fall:"フォール",
			march:"マーチ",
			reduction:"リダクション",
			lazy:"レイジィ"
		};
		var j=0,i=0,temp=0;
		id_num.append(p_ex);
		jQuery.each(song,function(key,val){
			var input = document.createElement("input");
			input.name=first_select;
			input.type="checkbox";
			input.value=key;
			$(id_num.find("p")[i]).append("<label>");
			$(id_num.find("label")[j]).append(input);
			$(id_num.find("label")[j]).append(val);
			temp += parseInt(val.length);
			if(temp>20){
				temp =0;
				id_num.append(p_ex);
				i++;
			}
			j++;
		});

		id_num.append(p_ex);
		var select=document.createElement("select");
		select.name=first_select;
		id_num.find("p:last").append("範囲:");
		id_num.find("p:last").append(select);
		for(var i=10; i<50; i+=10){
			var option=document.createElement("option");
			option.value=i;
			option.innerHTML=i;
			id_num.find("select").append(option);
		}
		id_num.find("p:last").append("m");
		break;

	case "commodity":
		// 別に戦闘特技じゃなくていいね。汎用特技に入れてしまおう
		var commodity = {
			// ここはスキル順に
			full_power : "&#x2611;全力攻撃",
			full_power2 : "&#x2611;全力攻撃Ⅱ",
			provocation : "&#x2611;挑発攻撃",
			tail_sweep : "&#x2611;テイルスイープ",
			cleave :"〆薙ぎ払い",
			magic_hit : "&#x2611;魔力撃",
			advanced_magic_hit : "&#x2611;強化魔力撃",
			shot : "〆銃撃",
			bow : "〆弓",
			pinpoint_shot : "○精密射撃",
			pinpoint_eagle : "○精密射撃＆鷹の目",
			rush : "▽連続攻撃",
			rush2 : "▽連続攻撃Ⅱ",
			double_atack_twin : "〆2回攻撃＆双撃",
			double_action: "○2回行動",
			triple_action: "○3回行動",
			double_declaration: "○複数宣言 = 2回",
			triple_declaration: "○複数宣言 = 3回",

			counter : "▼カウンター",
			fly : "○飛行",
			warter_aptitude : "○水中適正",
			warter_specialize : "○水中特化",
			warter_only : "○水中専用",
			fly_region : "○飛翔",	// 部位もちの場合のみ
			fly_region2 : "○飛翔Ⅱ",
			obstruction : "○攻撃障害",
			stand : "▽棒立ち",

			magic_aptitude  : "魔法適正",
			// 魔法適正の取得時、それぞれ1ずつ足して頭につける記号を選ぶ
			//魔法適正時はonchange
			magic_incarnation  : "魔法の化身"
			// これは全部乗せ
		};

		id_num.append(p_ex);
		var select = document.createElement("select");
		select.name=first_select;
		select.className="skill_insert_"+obj.className+"_"+number;
		$(id_num.find("p")[0]).append(select);	// p内に生成

		jQuery.each(commodity,function(key,val){
			var option = document.createElement("option");
			option.value=key;
			option.innerHTML=val;
			$(id_num.find("select")[0]).append(option);
		});
		break;

	case "other":
		//抵抗がある？ない？
		var other={
			resist_able:"抵抗可能",
			resist_unable:"抵抗不可能"
		}
		id_num.append(p_ex);
		var i=0;
		jQuery.each(other,function(key,val){
			var input = document.createElement("input");
			input.name=first_select;
			input.type="radio";
			input.value=key;
			input.className="skill_insert_"+obj.className+"_"+number;
			if(key=="resist_unable"){
				input.checked="checked";
			}
			$(id_num.find("p")[0]).append("<label>");
			$(id_num.find("label")[i]).append(input);
			$(id_num.find("label")[i++]).append(val);
		});
		id_num.append(p_ex);

		var select=document.createElement("select");
		select.name="resist_unable";
		$(id_num.find("p")[1]).append(select);

		$(id_num.find("select")[0]).append("<option>〆</option>");
		$(id_num.find("select")[0]).append("<option>○</option>");
		$(id_num.find("select")[0]).append("<option>&#x2611;</option>");
		$(id_num.find("select")[0]).append("<option>▽</option>");
		$(id_num.find("select")[0]).append("<option>▼</option>");

		var input = document.createElement("input");
		input.name="resist_unable";
		input.type="text";
		$(id_num.find("p")[1]).append("能力名:");
		$(id_num.find("p")[1]).append(input);

		id_num.append("<p>説明</p>");
		id_num.append(p_ex);
		var textarea = document.createElement("textarea");
		textarea.name="resist_unable";
		$(id_num.find("p")[3]).append(textarea);
		break;
	}
}

function load_make(){
	var p_ex="<p></p>";
	var len=$("#region").find("select")[0].value;
	for (var i=0; i<len; i++){
		//iは部位ナンバー
		//0がコア、1が上半身・・・みたいな

		$("#skill td:nth-child(2)").empty();

		var div = document.createElement("div");
		div.id="skill_"+i;
		div.className=-1;
		$("#skill td:nth-child(2)").append(div);
		// 部位ごとにidをわけてdivを作成

		$("#skill_"+i).append(p_ex);

		var input = document.createElement("input");
		input.type="checkbox";
		input.className=i;
		input.name="no_skill";
		input.value="none";
		$("#skill_"+i).find("p").append(input);
		$("#skill_"+i).find("p").append("なし");

		var div = document.createElement("div");
		div.id="skill_inner_"+i;
		$("#skill_"+i).find("p").append(div);

		// pタグの中にinputを作成(なし用)

		var button = document.createElement("button");
		button.type="button";
		button.className=i;
		button.value="skill_append";
		button.innerHTML="追加";
		$("#skill_"+i).append(button);

		var button = document.createElement("button");
		button.type="button";
		button.className=i;
		button.value="skill_delete";
		button.innerHTML="削除";
		$("#skill_"+i).append(button);


		special_make($("#skill_"+i).find("button")[0]);
		// 中身の作成
	}
}

function booty_make(obj){
	//製作に変更
	if(obj.value=="booty_append"){
		var number = $("#booty").attr("class");
		// クローニング
		var clone = $("#booty_"+number).clone(true).attr("id","booty_"+(parseInt(number)+1)).attr("class","booty");
		$("#booty_"+number).after(clone);
		$("#booty").attr("class",(parseInt(number)+parseInt(1)));
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
		$("#booty"+number).remove();
		number--;
		$("#booty").attr("class",number);
	}
}
