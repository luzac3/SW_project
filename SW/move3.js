$(document).ready(function(){
	$("#site-box img").bind("load",function(){ //全ての画像が読み込まれてから動くように設定
			$("#line_icon a").click(function(){
				$("img",this).attr('src', $("img",this).attr('src').replace('_normal', '_choose'));
				//要するに、_offという文字列を_onという文字列に入れ替える、というだけの関数。
				//InnerHTMLをいちいち使わなくてよいというのは楽ってレベルじゃない。
				$("img",this).attr('src', $("img",this).attr('src').replace('_onmouse', '_choose'));
				//マウス乗せっぱなしならこっちになる
				if (!$(this).hasClass("choose")){ //選択されているクラスを持っていない
					$("#line_icon a").removeClass("choose"); //全てのimgからChooseクラスを削除
					$(this).addClass("choose"); //選択した要素にChooseクラスを付加

						if ($(this).hasClass("profile")){
							//$('#sample2 img').hide().attr('src',$("img",this).attr("src").replace("_choose","_profile")).fadeIn();
							//InHTML($(".choose").attr("href"));
							var ac=document.createElement("p")
							var RC=document.getElementById("sample");
							for(var i=RC.length-1; i>=0; -- i){
								var parent=RC[i].parentNode;
								parent.removeChild(RC[i]);
							}
							var cal=$(".choose").attr("href");
							ac.innerHTML="<img src='img/select.png'>";
							ac.setAttribute=("class","profile");
								$('#sample2 img').hide().attr('src',$(".choose img").attr("src").replace("_choose","_profile")).fadeIn();
								//要素を全て削除、appendCildでimgをセット
						}
						else if ($(this).hasClass("detail")){
							var cal=$(".choose").attr("href");
							ac.setAttribute=("class","detail");
							ac.innerHTML='<img class="status_list" src="img/'+cal+'_status_list.png">';

							$('#sample2 img').hide().attr('src',$(this).attr("src").replace("_choose","_detail")).fadeIn();
						}else if ($(this).hasClass("status")){
							$('#sample2 img').hide().attr('src',$(this).attr("src").replace("_choose","_status")).fadeIn();
						}else if ($(this).hasClass("skill")){
							$('#sample2 img').hide().attr('src',$(this).attr("src").replace("_choose","_skill")).fadeIn();
						}else{
							$('#sample2 img').hide().attr('src',$(this).attr("src").replace("_choose","_equip")).fadeIn();
						}
				};
				return false;

			})
	})
})

function InHTML(cal_No){
	var F=cal_No
}


