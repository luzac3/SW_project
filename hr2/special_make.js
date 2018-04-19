
$(document).ready(function(){
  var table = $("form").id;
  $("table").find("option[value=table]").attr("selected","selected");
  load_make();
});

$(document).on("change","input[name='first_select']",function(){
	special_make(this);
});


//input.type="checkbox";
//on系は別のファイルにまとめようか？

function special_make(obj){
	var number = $("#skill_"+obj.className).attr("class");

	if(obj.value == "skill_delete"){
		var id_num = $("#skill_insert_"+obj.className+"_"+number);
		// 内容が入っていたら警告するように作り直す？できなくはないがめんどくさいぞ
		if(!window.confirm("項目を削除しますか？")){
			return;
		}
		if(number == 0){
			alert("項目が一つしかない場合は削除できません");
			return;
		}
		$("#skill_inner_"+obj.className).empty();
		// 中身を全部消す
		number--;
		$("#skill_"+obj.value).attr("class",number);
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
			"valit" : "汎用",
			"other" : "その他"
		};
		var p = document.createElement("p");
		p.id = "first_select_"+obj.className+"_"+number;
		$("#skill_inner_"+obj.className).append(p);
		$("#first_select_"+obj.className+"_"+number).empty();
		jQuery.each(first_select_array,function(key,val){
			var input = document.createElement("input");
			if(key == "resistance"){
				input.checked="checked";
			}
			input.type = "radio";
			input.name = "first_select";
			input.value = key;
			input.className= obj.className;
			input.onchange="special_make(this)";
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
			fire_invalid : "○炎無効",
			ice_invalid : "○水・氷無効",
			thunder_invalid : "○雷無効",
			wind_invalid : "○風無効",
			ground_invalid : "○土無効",
			pure_invalid : "○純エネルギー無効",
			impact_invalid : "○衝撃・斬撃属性無効",
			normal_invalid : "○通常武器無効",
			disease_invalid : "○病気属性無効",
			poison_invalid : "○毒属性無効",
			pow_weak_invalid : "○精神効果属性(弱)無効",
			pow_invalid : "○精神効果属性無効",
			curse_invalid : "○呪い属性無効",
			magic_invalid : "○魔法無効",
			magic_registance : "○魔法耐性",
			machine : "○機械の身体",
			rock : "○岩の身体"
		};
		//メモ：書いてある部分はすべて出力時spanタグでくくる

		id_num.append(p_ex);
		var i=0;
		var temp=0;
		// まずはPで段落生成
		jQuery.each(resistance_list,function(key,val){
			var input = document.createElement("input");
			input.type ="checkbox";
			input.name=first_select;
			input.value=key;
			$(id_num.find("p")[i]).append(input);
			$(id_num.find("p")[i]).append(val);
			temp += parseInt(val.length);
			if(temp>20*(i+1)){
				id_num.append(p_ex);
				i++;
			}
			//20オーバーで段落変更
		});
		break;

	case "magic":
		var magic_list = {
			sorcerer : "〆真語魔法",
			conjurer : "〆操霊魔法",
			priest : "〆神聖魔法",
			magitec : "〆魔動機術",
			fairy : "〆妖精魔法",
			fairy_limit :"〆妖精魔法限定",
			other : "その他",
		};

		// その他は特殊系統なので、選択したら別に表示させる
		var i=0;
		jQuery.each(magic_list,function(key,val){
			id_num.append(p_ex);

			var input = document.createElement("input");
			input.name=first_select;
			input.value=key;
			input.className=key+"_"+obj.className;
			input.type="checkbox";
			$(id_num.find("p")[i]).append(input);	// p内に生成
			$(id_num.find("p")[i]).append(val);

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
		var j=5;
		id_num.append(p_ex);
		id_num.find("p")[0].append("練体の極意");

		var input = document.createElement("input");
		input.type="radio";
		input.name=first_select;
		input.value="exist";
		input.innerHTML="あり";
		id_num.find("p")[0].append(input);

		var input = document.createElement("input");
		input.type="radio";
		input.name=first_select;
		input.value="none";
		input.innerHTML="なし";
		input.checked="checked";
		id_num.find("p")[0].append(input);

		jQuery.each(magic_list,function(key,val){
			if(j%5==0){
				id_num.append(p_ex);
			}
			if(key==ricovery){
				id_num.append(p_ex);
				j += 5;

				input.name=first_select;
				input.type="checkbox";
				input.value=key;
				input.className==key+"_"+obj.className;
				input.innerHTML=val;
				id_num.find("p")[parseInt(j/5)].append(input);	// p内に生成

				var select = document.createElement("select");
				select.className=key+"_"+obj.className;
				select.disabled=true;
				id_num.find("p")[parseInt(j/5)].append(select);
				for(var i=1; i<=20; i++){
					var option = document.createElement("option");
					option.value=i;
					option.innerHTML=i;
					id_num.find("p")[parseInt(j/5)].append(option);
				}
				id_num.find("p")[parseInt(j/5)].append("点回復");
				id_num.append(p_ex);
				j += 5;
				return true;
			}
			var input = document.createElement("input");
			input.name=first_select;
			input.type="checkbox";
			input.value=key;
			input.innerHTML=val;
			id_num.find("p")[parseInt(j/5)].append(input);	// p内に生成
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
		var j=0;
		id_num.append(p_ex);
		jQuery.each(magic_list,function(key,val){
			if(j%5==0){
				id_num.append(p_ex);
			}
			var input = document.createElement("input");
			input.name=first_select;
			input.type="checkbox";
			input.value=key;
			input.innerHTML=val;
			id_num.find("p")[parseInt(j/5)].append(input);	// p内に生成

			j++;
		});
		break;

	case "commodity":
		// 別に戦闘特技じゃなくていいね。汎用特技に入れてしまおう
		var resistance_list = {
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
			double_atack : "〆2回攻撃",
			double_atack_twin : "〆2回攻撃＆双撃",
			double_action: "○2回行動",//1ラウンドに主動作二回可
			triple_action: "○3回行動",
			double_declaration: "○複数宣言 = 2回",
			triple_declaration: "○複数宣言 = 3回",

			counter : "▼カウンター",
			fly : "○飛行",
			warter_aptitude : "○水中適正",
			warter_specialize : "○水中専用(特化)",
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

		var j=0;
		id_num.append(p_ex);
		var select = document.createElement("select");
		select.name=first_select;
		select.onchange="commodity_change(this)";
		select.className=id_num;
		id_num.find("p")[0].append(select);	// p内に生成

		jQuery.each(magic_list,function(key,val){
			if(j%5==0){
				id_num.append(p_ex);
			}
			var option = document.createElement("option");
			option.value=key;
			option.innerHTML=val;
			id_num.find("select")[0].append(select);
			j += 5;
		});
		break;

	case "other":
		//抵抗がある？ない？
		var other={
			resist_able:"抵抗可能",
			resist_unable:"抵抗不可能"
		}
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
		input.onchange="no_skill(this)";
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






