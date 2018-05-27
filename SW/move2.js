$(function(){
	$(".character_list").hide();
	$("#main_character").show();
})
//キャラクターにおいて
//一旦全てのキャラクターアイコンを閉じ、開きなおす

$(function(){
	$(".character_window").hide();
	$("#profile").show();
})
//これまた一回メインウィンドウ全部閉じて開く。
$(document).ready(function(){

	$(".icon").click(function(){
		var test=$(this).attr("href");
		$(".character_list").hide();
		$("#"+test+"_character").show();
	})
})

//マウスオーバーの実装をすること

$(document).ready(function(){
	$(".character_list img").bind("load",function(){ //全ての画像が読み込まれてから動くように設定
			$(".character_list a").click(function(){
				$(".choose_character").each(function(){
					var off_mouse=$(this).html();
					$(this).html(off_mouse.replace(/_choose/g,'_normal'));
				});
					//キャラクタークラスのChooseをNormalに置換
				$("img",this).attr('src', $("img",this).attr('src').replace('_normal', '_choose'));
				//要するに、_offという文字列を_onという文字列に入れ替える、というだけの関数。
				//InnerHTMLをいちいち使わなくてよいというのは楽ってレベルじゃない。
				$("img",this).attr('src', $("img",this).attr('src').replace('_onmouse', '_choose'));
				//マウス乗せっぱなしならこっちになる
					var cal_old=$(".choose_character").attr("href");
					//今まで選択されていたキャラクター名を取得しておく
				if (!$(this).hasClass("choose_character")){ //選択されているクラスを持っていない
					$("#line_icon a").removeClass("choose_character"); //全てのimgからChooseクラスを削除
					$(this).addClass("choose_character"); //選択した要素にChooseクラスを付加
						var window_kind=$("#character").attr("class");
						var cal_new=$(".choose_character").attr("href");
						$("#"+window_kind).animate({ top: '20px',opacity:"toggle" }, 2000 )
							setTimeout(function(){
							for(var i=0; i<$("#"+window_kind+" img").length; i++){

									$("#"+window_kind+" img").eq(i).attr("src",$("#"+window_kind+" img" ).eq(i).attr("src").replace(cal_old,cal_new));
									//旧キャラクターと新キャラクターを切り替える
									$("#"+window_kind).removeClass(cal_old).addClass(cal_new);
									text_change(cal_new,window_kind);
							}
							},2000);
						$("#"+window_kind).animate( {top: '0',opacity:"toggle" }, 1500 )
				};
				return false;


			})
	})
})

$(document).ready(function(){
	$("#tab img").bind("load",function(){ //全ての画像が読み込まれてから動くように設定
			$("#tab a").click(function(){

				$("#tab a").each(function(){
					var off_tab=$(this).html();
					$(this).html(off_tab.replace(/_choose/g,'_normal'));
				});
				$("img",this).attr('src', $("img",this).attr('src').replace('_normal', '_choose'));
				//要するに、_offという文字列を_onという文字列に入れ替える、というだけの関数。
				//InnerHTMLをいちいち使わなくてよいというのは楽ってレベルじゃない。
				$("img",this).attr('src', $("img",this).attr('src').replace('_onmouse', '_choose'));
				//マウス乗せっぱなしならこっちになる

				var old_class=$("#character").attr("class");
				var new_class=$(this).attr("href")
					if (!$("#character").hasClass(new_class)){ //選択されているクラスを持っていない
						$("#character").removeClass(old_class); //全てのimgからTabのクラスを削除
							var cal_old=$("#"+new_class).get(0).className.split(" ")[1];
							var cal_new=$(".choose_character").attr("href");
							$("#"+new_class).animate( {left: '20px'});
								for(var i=0; i<$("#"+new_class+" img").length; i++){
								$("#"+new_class+" img").eq(i).attr("src",$("#"+new_class+" img").eq(i).attr("src").replace(cal_old,cal_new));
								//旧キャラクターと新キャラクターを切り替える
								}

							text_change(cal_new,new_class);
					};

                    if (new_class == "profile" && old_class != "profile")
                        $("#line").animate({"left":"100px"},{duration: 1000});
                    else if (new_class != "profile" && old_class == "profile")
                        $("#line").animate({"left": "12px"},{duration: 1000});

                $(".character_window").animate({left: '20px',opacity:"hide" }, 1000 );
                $("#"+new_class).animate( {left: '0',opacity:"show" }, 750, function(){
                    $("#"+new_class).queue([]);
                    $("#"+new_class).stop();
                });
                $("#"+old_class).animate({ left: '0'});
                $("#character").addClass(new_class); //選択した要素にtabのクラスを付加

				//おなじみの、全部閉じてまた開く

		})
		return false;
	})
})
function InHTML(cal_No){
var F=cal_No
}

function text_change(cal,place){

	switch(cal){

	case "maple":
		$("."+place+"_text").html("　19歳のナイトメア。"+"<br>"+"　自分に似た誰かが村で悪評を立てたため、それを倒すため、妹のかりんを連れて旅に出た。"+"<br>"+"　まっすぐで素直な心を持つが、それゆえ騙されたり弄られたりすることも"+"<br>"+"　正義心が強いとは言えないが、一般的なレベルには正義感を持っているといえる。"+"<br>"+"　よくものを食べる。");
		break;

	case "karin":
		$("."+place+"_text").html("　典型的な壁ファイターで、きわめて高い防護点を誇る。"+"<br>"+"　メイプルに連れ出される形で旅に出た。"+"<br>"+"　引っ込み思案であまり喋らないが、芯は強いと思われる。");
		break;

	case "flare":
		$("."+place+"_text").html("　テキストがまだない");
		break;

	case "nelva":
		$("."+place+"_text").html("　テキストがまだない");
		break;

	case "aaliyah":
		$("."+place+"_text").html(
			"　テキストがまだない"
		);
		break;

	case "lynx":
		$("."+place+"_text").html(
			"　18歳のミアキスで、結構ハードな過去を持つらしい。"+"<br>"+
			"　踊り子：4、娼婦：2、芸人：3、歌手：1と多彩な経験を持っている。"+"<br>"+
			"　過去にはジプシーとして生活しており、踊りや芸を行うことができる。旅立ってからは、各地で芸を披露しながら生活してきたが、それだけで足りないときは「花売り」として生活していたこともある。"+"<br>"+
			"　人生経験豊富なためか、PT内で最も若い18歳でありながら、何かとお姉さんぶりたがるところがあり、他人に対して異常なまでにお節介になることがしばしばある。"
		);
		break;

	case "fenrir":
		$("."+place+"_text").html(
			"　メイプルに共鳴し、一時はメイプルを乗っ取る形で現界した魔剣の管理者(アバター)。強力な氷の力を操る。"+"<br>"+"" +
			"　主と融合することで力を発揮する融合型の魔剣で、その力はまさしく絶大と言える"+"<br>"+
			"　冒険者たちとひと悶着あった後、メイプルと契約を結び、正式な仲間として迎えられた。"+"<br>"+
			"　その能力、正体には未だ謎が多く神紀文明時代の魔剣ではないかという話も。"+"<br>"+
			"　隔世家で世界や人を嫌っているように見えるが――その実、幼い子供のような存在で、無意識に、誰かに頼りたいと思っているようだ。"
		);
		break;

	default:
		$("."+place+"_text").html("　テキストがまだない");
		return false;
	}
}