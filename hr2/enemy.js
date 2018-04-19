
/*必要なプログラム*/


//クリックされたときまず戦利品フォームに飛ばす

//入力フォームの生成

//"_"を元に文字列を分割。データ自体はPHPでフォーム部だけ書き直し→IDで取得の流れでOK
//そもそも飛ばすデータをID管理。ただし飛ばしたらIDの付け直しを行う(同じエネミーがいたら重複してしまうので、一義的に管理するため)。

//一覧表示のときは名前、レベルと知名度弱点値、HPMP、抵抗、あとは攻撃力等のセット程度の簡易データのみ提示。
//今回はカラム名からデータを抽出するようなことはしない。さすがに面倒が大きすぎて仕方ない。メリットは低いし

//とりあえずphpでデータの取得をさせてみようか

//戦利品フォームでは、名前とレベル、戦利品のリストとダイス範囲を提示。

//エネミーはリストから参照するだけでなく、戦闘用のフォームから参照できるようにする
//戦闘用フォームは簡易表示だけどクリックで展開できるように
//作成自体はjs生成で問題ない

//一旦はspecialの中に収めて実験用とする
/*
function int(){
	 var array=document.getElementById("status_table").getElementsByTagName("td");
	 
	 for(var i=0,len=array.length; i<len; i++){
	 	var a=array[i].text();
	 	if(isFinite(array[i].text())==true){
	 		$(array).addClass("int");
	 	}
	 }
}

*/
function stack(id,name){
	var p=document.createElement("p");
	var elem=document.getElementById("stack");
	var count=elem.getAttribute("class");
	p.id=count;
	p.className=id;
	elem.appendChild(p);
	var a=document.createElement("a");
	a.className="id_"+id;
	a.href="#";
	a.onclick="return false;";
	elem.getElementsByTagName("p")[count].appendChild(a);
	elem.getElementsByTagName("a")[count].innerHTML=id+"    "+name;
	count++;
	$("#stack").attr("class",count);
}
function change_booty(){
	//内容を書き換え
	var list=[];
	var element = $("#status_table").find("table")[0];
	for (var i=element.childNodes.length-1; i>=0; i--){
		element.removeChild(element.childNodes[i]);
	}
	var elem=$("#selecter").find("p");
	for(var i=0,len=elem.length; i<len; i++){
		list[i]=elem[i].getAttribute("class");
	}
	
	while (element.firstChild) {
		element.removeChild(element.firstChild);
	}
	//子ノードの削除
	function booty(){
		return $.ajax({
			type:"POST",
			url:"booty.php",
			cache:false,
			timeout: 10000,
			data:{
				list:list
			}
		});
	}

	function caliculate(stack){
		return $.ajax({
			type:"POST",
			url:"caliculate.php",
			cache:false,
			timeout: 10000,
			data:{
				l:i,
				stack:stack
			}
		});
	}
	$.when(booty())
	.then(function(data){
		$("#status_table").find("table").html(data);
		var stack=JSON.parse($("#script").attr('data-stack'));
		//ここは取得できてる
		caliculate(stack)
		.then(function(data2){
			$("#calc_space").html(data2);
		},
		function(){
			alert("faile to read 'caliculate.php'");
		});
	},
	function(){
		alert("error");
	});
}

function booty(){
	var stack=JSON.parse($("#script").attr('data-stack'));
	var form_array=[];
	var hantei=[];
	var char=[];
	var dice=[];
	var hosei=0;	/*アイテムなどによる修正*/
	var form_value=$("#booty_dice_form").find('input[type="text"]');
	
	function form_check(char){
		var err=[];
		var err_num=0;
		var err_mess="";
		for(var i=0,len=form_value.length; i<len; i++){
			if(parseInt(form_value[i].value)>12 || parseInt(form_value[i].value)<2 || !isFinite(form_value[i].value)){
				err[err_num]=i;
				err_num++;
			}
		}
		for(var err_num=0,len=err.length; err_num<len; err_num++){
			err_mess += stack[err[err_num]]["name"]+"\n";
		}
		var err_return=[err_num,err_mess];
		
		return err_return;
	}
	
	//フォームの値を取得
	if($(".amulet").prop('checked')){
		hosei++;
	}
	if($(".hunt").prop('checked')){
		hosei++;
	}
	if($(".eye").prop('checked')){
		hosei++;
	}
	if($(".lacky_star").prop('checked')){
		hosei=hosei+parseInt($(".lacky_star")[1].value);
	
	}
	for (var i=0,len=stack.length; i<len; i++){
		hantei[i]=hosei+parseInt(form_value[i].value);
	}
	
	//飛んできたフォームと大きさを比較..form_num>data[0]
	//比較回数はbootyの元の大きさなのでlength(stack[$l]["booty"])で見ればOK
	//ただしstack[$l]["booty"][0]=="自動"の場合は一つ減らして、その分は自動で取得
	
	/*iはキャラクター、kはダイス範囲*/
	for(var i=0; i<len; i++){	/*キャラクター数*/
		for(var k=0,len2=stack[i]["booty_dice"].length; k<len2; k++){
			if(stack[i]["booty_dice"][k]=="自動"){
				//保存する
				char.push(i);
				dice.push(k);
				continue;
			}
			var ex=(stack[i]["booty_dice"][k]).split("～");
			//これを分割
			if(ex[1]!=""){
				if(hantei[i]<=ex[1]){
				//上とだけ比較すればOK
				//順番に比較している関係上、ここで一致しなければ自動的に次の[0]は超える
				//このときのkを保持すれば全てのデータが抽出できる
					char.push(i);
					dice.push(k);
					break;
				}
			}else{
				//上限なし。ここまで来てる時点でこれにあたるはず
				char.push(i);
				dice.push(k);
				//この先はない
				break;
			}
							
		}
	}
	//以下を関数とし、ダイアログの有無で発火を変える
	var err_return=form_check(char);
	if(err_return[0]!=0){
		alert(err_return[1]+"のフォームが不正です\n2～12の半角数字で入力してください");
		return;
	}
	//書き込む前にチェック
	var len=char.length;
	var Dgamel=[];
	for (var i=0,k=0; i<len; i++){
		var ex2=stack[char[i]]["booty_gamel"][dice[i]].split("×");
		if(ex2.length>1 && !isFinite(ex2[1])){
			var p=document.createElement("p");
			document.getElementById("result_dice").appendChild(p);
			var elem=document.getElementById("result_dice");
			elem.getElementsByTagName("p")[k].innerHTML=stack[char[i]]["name"]+" / "+stack[char[i]]["booty"][dice[i]]+":"+ex2[0]+"× ";
			var input=document.createElement("input");
			input.class="form_D6";
			input.type="text";
			elem.getElementsByTagName("p")[k].appendChild(input);
			var span=document.createElement("span");
			elem.getElementsByTagName("p")[k].appendChild(span);
			elem.getElementsByTagName("span")[k].innerHTML=" G";
			//銀貨袋：30×ボックスG　みたいな感じにしたい
			Dgamel.push(i);
			//kの値とiの値を両方とっておく必要がある
			k++;
		}
	}
	if(k==0){
		caliculate(stack,char,dice);
	}else{
		var button=document.createElement("button");
		button.type="button";
		button.id="booty_6D";
		elem.appendChild(button);
		elem.getElementsByTagName("button")[0].innerHTML="確定";
	}
	$('#script').attr({
		'data-char': "["+char+"]",
		'data-dice': "["+dice+"]",
		'data-dice_key': k,
		'data-Dgamel': "["+Dgamel+"]"
	});
	var test=$('#script').attr('data-char');
	
}

$('body').on('click', '#booty_6D', function(){
	var stack=JSON.parse($("#script").attr('data-stack'));
	var char=JSON.parse($("#script").attr('data-char'));
	var dice=JSON.parse($("#script").attr('data-dice'));
	var dice_key=$("#script").attr('data-dice_key');
	var Dgamel=JSON.parse($("#script").attr('data-Dgamel'));
	for(var i=0; i<dice_key; i++){
		stack[char[Dgamel[i]]]["booty_gamel"][dice[Dgamel[i]]]=parseInt(stack[char[Dgamel[i]]]["booty_gamel"][dice[Dgamel[i]]])+"×"+$("#result_dice").find("input")[i].value;
		if(stack[char[Dgamel[i]]]["booty_card"][dice[Dgamel[i]]].slice(-1)=="d"){
			var ex=stack[char[Dgamel[i]]]["booty_card"][dice[Dgamel[i]]].split("×");
			stack[char[Dgamel[i]]]["booty_card"][dice[Dgamel[i]]]=ex[0]+"×"+$("#result_dice").find("input")[i].value;
		}
	}
	caliculate(stack,char,dice);
});

function caliculate(stack,char,dice){
	var sum_gamel=0;
	var sum_card=[];
	var len=char.length;
	var elem=document.getElementById("result");
	for (var i=0; i<len; i++){
		var ex3=stack[char[i]]["booty_gamel"][dice[i]].split("×");
		var p=document.createElement("p");
		elem.appendChild(p);
		elem.getElementsByTagName("p")[i].innerHTML=stack[char[i]]["name"]+"戦利品:"+stack[char[i]]["booty_dice"][dice[i]]+"　　"+stack[char[i]]["booty"][dice[i]]+"("+stack[char[i]]["booty_gamel"][dice[i]]+"/"+stack[char[i]]["booty_card"][dice[i]]+")";
		if(isFinite(ex3[0])){
			if(ex3.length>1 && isFinite(ex3[1])){
				sum_gamel += parseInt(stack[char[i]]["booty_gamel"][dice[i]])*parseInt(ex3[1]);
			}else{
				sum_gamel += parseInt(stack[char[i]]["booty_gamel"][dice[i]]);
			}
		}
		if(stack[char[i]]["booty_dice"][dice[i]]=="自動"){
			i++;
			var ex3=stack[char[i]]["booty_gamel"][dice[i]].split("×");
			var p=document.createElement("p");
			//p.class="move_right";
			elem.appendChild(p);
			elem.getElementsByTagName("p")[i].innerHTML=stack[char[i]]["booty_dice"][dice[i]]+"　　"+stack[char[i]]["booty"][dice[i]]+"("+stack[char[i]]["booty_gamel"][dice[i]]+"/"+stack[char[i]]["booty_card"][dice[i]]+")";
			if(isFinite(ex3[0])){
				if(ex3.length>1 && isFinite(ex3[1])){
					sum_gamel += parseInt(stack[char[i]]["booty_gamel"][dice[i]])*parseInt(ex3[1]);
				}else{
					sum_gamel += parseInt(stack[char[i]]["booty_gamel"][dice[i]]);
				}
			}
		}
	}
	var p=document.createElement("p");
	elem.appendChild(p);
	elem.getElementsByTagName("p")[i].innerHTML="合計:　"+sum_gamel+"ガメル";
	var p=document.createElement("p");
	elem.appendChild(p);
	var ex4=[];
	for(var ex=0,len=char.length; ex<len; ex++){
			ex4[ex]=stack[char[ex]]["booty_card"][dice[ex]].split("×");
			stack[char[ex]]["booty_card"][dice[ex]]=ex4[ex][0];
		}
	for(var flag=0,k=0,m=0,j=0; k<len; k++){
		flag=0;
		if(stack[char[k]]["booty_card"][dice[k]]=="―"){
		//ない場合は戻す
			continue;
		}
		
		for(var l=0; l<=k; l++){
		//自分(k)の前だけ比較
			if(l!=k && stack[char[k]]["booty_card"][dice[k]]==stack[char[l]]["booty_card"][dice[l]]){
				flag++;
				break;
				//前にあれば比較しない
			}
		}
		if(flag==0){
			for(var j=1,n=k; n<len; n++){
				//自分の後ろ(自分より大きい)と比較
				if(n!=k && stack[char[k]]["booty_card"][dice[k]]==stack[char[n]]["booty_card"][dice[n]]){
					j++;
					//一致する数をカウント
					if(ex4[n].length>1 && isFinite(ex4[n][1])){
						j += ex4[n][1]-1;
					}
					
				}
			}
			if(ex4[k].length>1 && isFinite(ex4[k][1])){
				j += ex4[k][1]-1;
			}
			sum_card[m]=[stack[char[k]]["booty_card"][dice[k]],j];
			m++;
			//抜けた場合はここにこないからね
			//ヒットした場合のカード名、ヒットした回数を記録
		}
	}
	for(k=0; k<m; k++){
		var span=document.createElement("span");
		elem.getElementsByTagName("p")[i+1].appendChild(span);
		elem.getElementsByTagName("span")[k].innerHTML=sum_card[k][0]+"　×　"+sum_card[k][1]+"枚　";
	}
}

//後で上へ
function page(page_num){
	var show_value=$("#page_change").val();
	if(page_num!=0){
		if(!isFinite(page_num)){
			if(page_num=="next"){
				page_num=$("#page_set").attr("class");
			}
			if(page_num=="back"){
				page_num=$("#page_set").attr("class")-2;
			}
		}
		$("#page_set").attr("class",parseInt(page_num)+1);
	}else{
		page_num=$("#page_set").attr("class")-1;
		
	}
	
	$.ajax({
			type:"POST",
			url:"special.php",
			cache:false,
			timeout: 10000,
			data:{
				show_value:show_value,
				page_num:page_num
			}
		})
		.then(function(data){
			$("#page_set").html(data);
			$("#page_change").val(show_value);
		},
		function(){
			alert("faile to page_change");
		});
	
}

function search(){		/*thisで持ってくる*/
	var keyword=$("#search_box").find("input")[0].value;
		$.ajax({
			type:"POST",
			url:"special.php",
			cache:false,
			timeout: 10000,
			data:{
				keyword:keyword
			}
		})
		.then(function(data){
			$("#page_set").html(data);
		},
		function(){
			alert("faile to page_change");
		});
}

function search_enter(){
	$("#search_box").find("input").keypress(function(){
		if(event.keyCode == 13){
			$("#search_box").find("button").click();
		}
	});
}
//onloadで起動するイベント。キー監視して検索窓にいる間に押したEnterを検索キーに関連付ける

function position(e){
	if(e.clientX < window.innerWidth/2){
		var mouseX = e.pageX;	// X座標
		if(e.clientY < window.innerHeight/3){
			var mouseY = e.pageY;	// Y座標
		}else if(e.clientY < window.innerHeight/3*2){
			var mouseY = e.pageY-$("#contents").height()/2;	// Y座標
			if($("#contents").height()==0){
				mouseY = e.pageY-50;
			}
		}else{
			var mouseY = e.pageY-$("#contents").height();
			if($("#contents").height()==0){
				mouseY = e.pageY-100;
			}
		}
	}else{
		var mouseX = e.pageX-$("#contents").width();
		if(e.clientY < window.innerHeight/3){
			var mouseY = e.pageY;	// Y座標
		}else if(e.clientY < window.innerHeight/3*2){
			var mouseY = e.pageY-$("#contents").height()/2;	// Y座標
			if($("#contents").height()==0){
				mouseY = e.pageY-50;
			}
		}else{
			var mouseY = e.pageY-$("#contents").height();
			if($("#contents").height()==0){
				mouseY = e.pageY-100;
			}
		}
	
	}
	var mouse=[mouseX,mouseY];
	return mouse;
}

$(function(){ /*これはマウスオーバーで起動するシステム*/
	//thisで乗っているクラスを判別。飛んでくるアンサーはclassName=id_numで帰ってくる
	//そのナンバーをajaxでサーバーに要求。そのためのPHPファイルを作成。
	//戻ってきた配列データをobj_pop_upクラスで取得した配列に流し込んで書き換える
	//基本思想はとても簡単なのでいけるぞ
	$("#main")
	  .on('mouseenter','a', function(e){
		var ex=$(this).attr("class").split("_");
		var id=parseInt(ex[1]);
		var mouse=0;
		// マウス位置を取得する
		mouse=position(e);
		$("#contents").css({
			"display":"none",
		});
		
		$("#pop_up").css({
			"display":"block",
			top : parseInt(mouse[1])+"px",
			left : parseInt(mouse[0])+"px",
			width: 100+"px",
			height:100+"px"
		});
		$("#splash").css({
			"display":"block",
		});
		//実際は取得するまでロードを表示、取得したらすりかえる
		//htmlファイルは書き換え、別ファイルにしておいて流し込む方式になる
		//それほど面倒でもないはず
		$.ajax({
			type:"POST",
			url:"pop_up2.php",
			cache:false,
			timeout: 10000,
			data:{
				id:id
			}
		})
		.then(function(array){
			
			var array=JSON.parse(array);
			document.getElementsByClassName("obj_pop_up")[0].setAttribute("src","./img/"+array[1]);
			for(var i=1,k=1,len=array.length-2; k<len; k++,i++){
				document.getElementsByClassName("obj_pop_up")[k].innerHTML=array[i+1]+"　";
				if(array[0][i]=="知名度"){
					document.getElementsByClassName("obj_pop_up")[k].innerHTML=array[i+1]+"/"+array[i+2]+"　";
					i++;
				}
				if(array[0][i]=="攻撃方法(部位)"){
					document.getElementById("weapon").innerHTML="攻撃方法(部位)";
				}
				if(array[0][i]=="攻撃方法"){
					document.getElementById("weapon").innerHTML="攻撃方法";
				}
			}
			
			$("#contents").css({
				"display":"inline",
			});
			$("#splash").css({
				"display":"none",
			});
			$("#pop_up").css({
				width: 400+"px"
			});
			mouse=position(e);
			$("#pop_up").css({
				top : parseInt(mouse[1])+"px",
				left : parseInt(mouse[0])+"px",
				height: $("#contents").height()+"px"
			});
		},
		function(){
			alert("faile to page_change");
		});
	});
	 $("#main")
	   .on('mouseleave','a',function(){
	  	$("#pop_up").css({
				"display":"none"
		});
	  });
});
//クリックで消せるように

