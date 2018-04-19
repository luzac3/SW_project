//インプットされたデータの取得用
//とにかくここはバグのないように丁寧に！
function test(){
var array = {};
	array["race"] = $("#race option:selected").text();
	//種族。内容のほうを取得

	array["name"] = $("#name input")[0].value;
	if($($("#name input")[1]).prop("checked")){
		var pic = "sample";
	}else{
		//なにもしない
	}

	array["level"]=$("#level select")[0].value;

	array["review"] = $("#review option:selected").text();
	console.log(parseInt($("#review input")[0].value)+parseInt(32));
	if($("#review option:selected").val()=="base1"){
		array["review"] += $("#review input")[0].value + "P(改訂版:" +(parseInt($("#review input")[0].value)+parseInt(32))+"p)";
	}else if($("#review option:selected").val()=="base2"){
		array["review"] += $("#review input")[0].value + "P(改訂版:" +(parseInt($("#review input")[0].value)+parseInt(16))+"p)";
	}else if($("#review option:selected").val()=="base3"){
		array["review"] += $("#review input")[0].value + "P(改訂版:" +(parseInt($("#review input")[0].value)+parseInt(24))+"p)";
	}else{
		array["review"] += $("#review input")[0].value + "P";
	    //ここは内容が空でも通る。調べられない場合があるので
	}

	array["knowledge"] = $("[name=knowledge]:checked").parent().text();
	//console.log($("[name=knowledge]:checked")[0].value);

	array["sense"] = $($("#sense option:selected")[0]).text();

	array["reaction"] = $("[name='reaction']:checked").parent().text();

	if($("[name='word_first']:checked").val() != "exist"){
		array["word"] =  $($("[name='word_first']:checked")[0]).parent().text();
	}else{
		array["word"]="";
		$("[name='word']:checked").each(function() {
			console.log($(this).parent());

			array["word"] += $(this).parent().text()+"、";
			if(this.value=="other"){
				for(var i=0; i<$(this).nextAll().length; i++){
					array["word"] += $(this).nextAll()[i].value+"、";
				}
				//その他が複数追加できる場合に合わせておく
			}
		});
		array["word"] = array["word"].slice(0, -1);
		//最後の句読点を削除
	}

	if($("#habitat p input:checked")[0].value != "other"){
		array["habitat"] =  $(".label[name='habitat']:checked").parent().text();
	}else{
		array["habitat"]="";
		$("[name=habitat]:checked").each(function() {
			array["habitat"] += $(this).parent().text()+"、";
			if($(this).value=="other"){
				for(var i=0; i<$(this).nextAll().length; i++){
					array["habitat"] += $(this).nextAll()[i].value+"、";
				}
				//その他が複数追加できる場合に合わせておく
			}
		});
		array["habitat"] = array["habitat"].substr(0, array["habitat"].length-1);
		//最後の句読点を削除
	}

	array["reputation"] = $("#reputation select")[0].value;
	array["weak"] = $("#weak select")[0].value;
	array["weakness"] = $("#weakness option:selected").text();

	//省略表示について考えておくこと
	//純エネルギーなら純Eがいいな

	array["preemptive"] = $("#preemptive select")[0].value;
	array["move"] = $("#move select")[0].value;
	if($($("#move input")[0]).prop("checked")){
		array["move"] += "_"+"飛行"+"_"+$("select[class='sp_move']")[0].value;
	}
	if($($("#move input")[1]).prop("checked")){
		array["move"] += "_"+"水中"+"_"+$("select[class='sp_move']")[0].value;
	}
	//ただしプレビューのときはこのまま表示してはいけない
	//これはあくまで送信用

	array["pow"] = $("#resist select")[0].value;
	array["con"] = $("#resist select")[1].value;

	array["region"] = $("#region select")[0].value;

	//ここから


	array["weapon"] = array["hit"] = array["ap"] = array["avoid"] = array["dp"] = array["HP"] = array["MP"] = "";

	for(var i=0; i<array["region"]; i++){
		array["weapon"] += $("#status_"+i+" input")[0].value;
		array["hit"] += $("#status_"+i+" select")[0].value;
		array["ap"] += $("#status_"+i+" select")[1].value;
		array["avoid"] += $("#status_"+i+" select")[2].value;
		array["dp"] += $("#status_"+i+" select")[3].value;
		array["HP"] += $("#status_"+i+" input")[1].value;
		array["MP"] += $("#status_"+i+" input")[2].value;
	}
	//部位がある場合はまた別に考える
	//ここからスキル

	//if(array["region"]==1){
	for(var reg=0; reg<array["region"]; reg++){
		if($("#skill_"+reg+" input:first-child").prop("checked")){
			array["skill"]="なし";
		}
		//まず全数を取得
		//全数が仕込まれている場所(skill_inner?)からクラス名を取得
		var len = $("#skill_"+reg).attr("class");
		var first_select=[];
		array["skill"]="";
		for(var i=0; i<len+1; i++){
			console.log($("#first_select_0_0 input:checked")[0].value);
			console.log($("#first_select_"+reg+"_"+i+" input:checked")[0].value);
			first_select[i]=$("#first_select_"+reg+"_"+i+" input:checked")[0].value;
			var data = $("[name='"+first_select[i]+"']:checked");
	    	//全ての基盤となる最初のセレクト(first_select)を取得
	    	switch(first_select[i]){
	    		case "resistance":
	    			array["skill"] +="<span class='bold'>○";
	    			data.each(function() {
	    				array["skill"] += $(this).parent().text()+"、";
	    			});
	                if(data.value=="magic_registance"){
	                    array["skill"] +="　いかなる魔法に対してでも、この魔物が精神抵抗力判定に成功した場合、結果を「消滅」として扱う。魔法以外(練技、呪歌、賦術、魔物の能力による効果)には適用されない。";
	                }
	                if(data.value=="bones" || data.value=="iron" || data.value=="machine"){
	                    array["skill"] +="　刃のついた武器から、クリティカルを受けない。";
	                }
	                if(data.value=="rock"){
	                    array["skill"] +="　刃のついた武器から、クリティカルを受けない。<br>　純エネルギー属性以外の魔法から、クリティカルを受けない。";
	                }
	    			array["skill"]=array["skill"].slice(0,-1);
	    			array["skill"] += "</span><br><br>";
	    			break;

	    		case "magic":
	    			//取得は上とほぼ同じでいいのだが、同じレベルの魔法を所有している場合をわけないといけない
	    			//ex)真語魔法、操霊魔法5レベル、というふうに
	                //限定妖精魔法のことも考える必要がある
	                //限定妖精魔法は属性とレベルにより使えるものが変わる
	    			var temp = [];//一度データをこの中に放り込んでから取り直す
	                var level =[];
	                var power = [];

	                //最初の選択肢の値を持つデータを検索
	    			for(var k=0; k<data.length; k++){
		    			temp[k] = $(data[k]).parent().text();
		    			level[k] = $("#"+data[k].value+"_level").val();
		    			power[k] = $("#"+data[k].value+"_power").val();
	    			}
	                var k=0;
	                while(1){
	                    if(k==data.length){
	                        break;
	                    }
	                    var pos=$.inArray(level[k],level,k+1);
	                    //一致するレベルがあるかどうか調べる
	                    if(pos != -1){
	                        //hitしたら比較元の魔法名とhitした魔法名をまとめる
	                        temp[k] += "、"+temp[pos];
	                        level.splice(pos,1);
	                        power.splice(pos,1);
	                        //まとめた魔法の,hitしたほうのレベルと魔力を削除
	                    }else{
	                        k++;
	                    }
	                }
	                for(var j=0; j<k; j++){
	                	array["skill"] +="<span class='bold'>〆";
		                array["skill"] += temp[j]+level[j]+"レベル／魔力"+power[j]+"("+power[j]+7+")";
	                }

	                /**
	                 * 結論、多岐にわたりすぎていてこっちでは導入できない
	                 */
	                array["skill"] += "</span><br><br>";
	    			break;

	    		case "enhancer":
	                array["skill"] += "<span class='bold'>☆練技";
	                if($(".secrets input").prop("checked")){
	                    array["skill"] += "＆○練体の極意　"
	                }
	                array["skill"] += "</span>";
	    			data.each(function(){
	                    array["skill"] += "【"+$(this).parent().text()+"】";
	                    console.log(this.value);
	                    console.log($(this).value);
	                    console.log(this.val());
	                    console.log($(this).val());

	                    if(this.value == "recovery"){
	                        array["skill"] = array["skill"].slice(1,-1);
	                        array["skill"] += $("."+this.className+" option:checked").value+"点回復】"
	                    }
	                });
	                array["skill"] += "の練技を使用する。";
	                if($(".secrets input").prop("checked")){
	                    array["skill"] += "<br>　これらの練技は通常の2倍の持続時間を持つものとして扱われる"
	                }
	                array["skill"] += "<br><br>";
	    			break;

	    		case "song":
	                //効果範囲の設定が必要
	                array["skill"] += "<span class='bold'>☆呪歌";
	                array["skill"] += "</span>";
	    			data.each(function(){
	                    array["skill"] += "【"+$(this).parent().text()+"】";
	                });
	                array["skill"] += "の呪歌を使用する。";
	                array["skill"] += "<br><br>";
	    			break;

	    		case "commodity":
	                array["skill"] += "<span class='bold'>";
	                    array["skill"] += data.parent().text();
	                if(data.value=="full_power"){
	                    array["skill"] += "</span>　打撃点を＋4点する。同時に、自身の回避力判定に－2のペナルティ修正を受ける。";
	                }else if(data.value=="full_power2"){
	                    array["skill"] += "</span>　打撃点を＋12点する。同時に、回避力判定に－2のペナルティ修正を受ける。";
	                }else if(data.value=="provocation"){
	                    array["skill"] += "</span>　打撃点が－2点される。<br>　攻撃が命中した相手は、次の手番で可能な限りこのキャラクターを攻撃しなければならない。地力が18以上、あるいは「知能：高い」であるキャラクターには効果がない。";
	                }else if(data.value=="tail_sweep"){
	                    array["skill"] += "</span>　自身の存在する乱戦エリア内の任意の5体までに、尻尾での攻撃を行う。<br>　この能力は連続した手番には使えない。";
	                }else if(data.value=="cleave"){
	                    array["skill"] += "</span>　自身の存在する乱戦エリア内の任意の5体までに武器での攻撃を行う。すべての命中力判定に－2のペナルティ修正を受ける。";
	                }else if(data.value=="magic_hit"){
	                    array["skill"] += "＝＋"+$($("select[class='"+data.className+"'] option:selected")[0]).value+"ダメージ</span>　";
	                    array["skill"] += "打撃点を＋"+$($("select[class='"+data.className+"'] option:selected")[0]).value+"点する。同時に、自身の回避力・生命抵抗力・精神抵抗力判定に－1のペナルティ修正を受ける。";
	                }else if(data.value=="advanced_magic_hit"){
	                    array["skill"] += "＝＋"+$($("select[class='"+data.className+"'] option:selected")[0]).value+"命中・"+$($("select[class='"+data.className+"'] option:selected")[1]).value+"ダメージ</span>　";
	                    array["skill"] += "命中力判定に＋"+$($("select[class='"+data.className+"'] option:selected")[0]).value+"のボーナス修正を得、打撃点を＋"+$($("select[class='"+data.className+"'] option:selected")[1]).value+"点する。同時に、自身の回避力・生命抵抗力・精神抵抗力判定に－2のペナルティ修正を受ける。";
	                }else if(data.value=="shot"){
	                    array["skill"] += "／";
	                    array["skill"] += $("select[class='"+data.className+"'] option")[0].value+"("+$("select[class='"+data.className+"'] option:selected")[0].value+7+")／回避力／消滅</span>";
	                    array["skill"] += "銃による射撃攻撃を行う。射程は"+$("select[class='"+data.className+"'] option")[1].value+"mで装填数は"+$("select[class='"+data.className+"'] option")[2].value;
	                }else if(data.value=="bow"){
	                    array["skill"] += "</span>　";
	                    array["skill"] += "弓による射撃攻撃を行う。射程は"+$("select[class='"+data.className+"'] option")[1].value+"mで、命中力と打撃点は通常の攻撃と同じ。";
	                    //銃撃は同じがあるので修正
	                }else if(data.value=="pinpoint_eagle"){
	                    array["skill"] += "</span>　乱戦に飛び道具を射ち込んでも誤射しない。また、遮蔽越しに射撃攻撃を行える。";
	                }else if(data.value=="rush"){
	                    array["skill"] += "</span>　攻撃が命中した場合、同じ対象にもう1回攻撃できる。2回目の攻撃が命中しても、この効果はない。";
	                }else if(data.value=="rush2"){
	                    array["skill"] += "</span>　攻撃が命中した場合、同じ対象にもう1回攻撃できる。この効果は2回目の攻撃まで発生する。3回目の攻撃が命中しても、この効果はない。";
	                }else if(data.value=="double_atack_twin"){
	                    array["skill"] += "</span>　両手に持った武器でそれぞれ1回ずつの攻撃を行う。1回目の攻撃の結果を確認してから、2回目の攻撃を、同じ対象にさらに行うか、別の対象を選んで行うかを選ぶことができる。";
	                }else if(data.value=="double_action"){
	                    array["skill"] += "</span>　1ラウンドに主動作を2回行える。";
	                }else if(data.value=="pinpoint_shot"){
	                    array["skill"] += "</span>　乱戦に飛び道具を射ちこんでも誤射しない。";
	                }else if(data.value=="counter"){
	                    array["skill"] += "</span>　戦闘特技≪カウンター≫を習得している。";
	                }else if(data.value=="fly"){
	                    array["skill"] += "</span>　近接攻撃の命中力・回避力判定に＋1のボーナス修正を得る。";
	                }else if(data.value=="warter_aptitude"){
	                    array["skill"] += "</span>　水中の行動によるペナルティ修正を受けない。";
	                }else if(data.value=="warter_specialize"){
	                    array["skill"] += "</span>　水中で呼吸・発生ができ、水中の行動によるペナルティ修正を受けない。<br>　逆に、地上ではすべての行為判定に－2のペナルティ修正を受ける。";
	                }else if(data.value=="warter_only"){
	                    array["skill"] += "</span>　水中の行動でペナルティ修正をいっさい受けない。しかし、水から上がるといっさい行動できない。";
	                }else if(data.value=="flr_region"){
	                	//この中で種類わけの必要あり

	                }else if(data.value=="flr_region2"){
	                	//この中で種類わけの必要あり

	                }else if(data.value=="obstruction"){
	                	//この中で種類わけの必要あり

	                }else{
	                    array["skill"] += "</span>";
	                }
	                array["skill"] += "<br><br>";
	    			break;

	    		case "other":
	                array["skill"] += "<span class='bold'>";
	                array["skill"] += $($(select[name='"+data.value+"'])[0]).find("option:selected").val();
	                array["skill"] += $($(input[name='"+data.value+"'])[0]).value;

	                if(data.value=="resist_able"){
	                    array["skill"] += "／";
	                    array["skill"] += $($(select[name='"+data.value+"'])[1]).find("option:selected").val();
	                    array["skill"] += "("+$($(select[name='"+data.value+"'])[1]).find("option:selected").val()+7+")";
	                    array["skill"] += "／";
	                    array["skill"] += $($(select[name='"+data.value+"'])[1]).find("option:selected").parent().text();
	                }
	                array["skill"] += $($(textarea[name='"+data.value+"'])[0]).value;
	            	array["skill"] += "<br><br>";
	    			break;
	    	}
	    }
	    array["skill"] = array["skill"].slice(0,-8);
	    array["skill"] += "_";
	}
	array["skill"] = array["skill"].slice(0,-1);

	//ここから戦利品
	array["booty"]="";
	array["booty_dice"]="";
	array["booty_gamel"]="";
	array["booty_card"]="";

	var num=$("#booty").attr("class");
	var len=parseInt(num);
	var temp=2;
	for(var k=0; k<=len; k++){
		var dice=$("#booty_"+k).find("option:selected")[0].value;
		if(dice=="auto"){
			array["booty_dice"] += "自動_";
		}else if(dice=="max"){
			array["booty_dice"] += temp+"～_";
		}else{
			array["booty_dice"] += temp+"～"+dice+"_";
			temp = val;
			temp++;
		}

	    array["booty"] += $("#booty_"+k).find("input")[0].value+"_";

	    if($("#booty_"+k).find("input")[1].value==0 || $("#booty_"+k).find("input")[1].value=="undefined"){
	    	array["booty_gamel"] += "―";
	    }else{
	    	array["booty_gamel"] += $("#booty_"+k).find("input")[1].value;
	        var val =array["booty_gamel"];
	        if($("#booty_"+k).find("option:selected")[1].value != "none"){
	        	array["booty_gamel"] += "×"+$("#booty_"+k).find("option:selected")[1].value;
	        }
	    }
	    array["booty_gamel"] += "_";

	    var len2=$("#booty_"+k).find("input:checked").length;

	    if($("#booty_"+k).find("input:checked")[0].value=="none"){
	    	array["booty_card"] += "―";
	    }else{
	    	for(var i=2; i<len2; i++){
	        	array["booty_card"] += $($("#booty_"+k).find("input:checked")[i]).parent().text();
	    	}
	    	if(0<val && val<100){
	    		array["booty_card"] +="B";
	    	}else if(100<=val && val<1000){
	    		array["booty_card"] +="A";
	    	}else if(1000<=val && val<10000){
	    		array["booty_card"] +="S";
	    	}else{
	    		array["booty_card"] +="SS";
	    	}
	    }
	    array["booty_card"] += "_";
	}
	array["booty"]=array["booty"].slice(0,-1);
	array["booty_gamel"]=array["booty_gamel"].slice(0,-1);
	array["booty_card"]=array["booty_card"].slice(0,-1);
	array["booty_dice"]=array["booty_dice"].slice(0,-1);


	array["description"] = $("textarea")[0].value.replace(/\n/g,"<br>");


	//var URL = "http://wolfnet-twei.sakura.ne.jp/SW/special/post_prev.php?="+array;

	//var URL = "./post_prev.php?="+array;
	var URL = "post_prev.php";
	//window.href = "./post_prev.php?="array;
	//これは小ウィンドウで開く
	//ajaxで呼び出すしかないか
	var w = window.open("",array["name"]+"プレビュー", 'width=600, height=800, menubar=no, toolbar=no, location=no, resizable=no, scrollbars=yes');
	//var w = window.open("",'_blank');
	$.ajax({
		type:"POST",
		url:URL,
		cache:false,
		timeout: 10000,
		data:{array:array}
	})
	.then(function(data){
		//window.open(URL,array["name"]+"プレビュー", 'width=600, height=800, menubar=no, toolbar=no, scrollbars=yes');
		console.log(array);
		//w.$("body").hide();
		w.location.href="post_prev.html";
		w.document.open();
		w.document.write(data);
		w.document.close();
	},
	function(data){
		alert("failue");
	});
}
