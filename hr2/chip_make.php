<?php
if(isset($_POST["list"])){
	//あくまで部位がない場合。部位有は非常にめんどくさい
	//URL固定
	$chip=array("HP","/HP","MP","/MP","dp","hit","ap","avoid","con","pow","move","special");
	$chip_associate=array(
		"move"=>"移動",
		"con"=>"生命",
		"pow"=>"精神",
		"hit"=>"命中",
		"ap"=>"攻撃",
		"avoid"=>"回避",
		"dp"=>"防護",
		"HP"=>"HP",
		"MP"=>"MP",
		"/MP"=>"/MP",
		"/HP"=>"/HP",
		"special"=>"特殊能力"
	);
	$name_array=array("A","B","C","D","E","F","G");
	$list = $_POST["list"];
	$table_name= $_POST["table"];

	//飛んでくるリストナンバーは、順番にIDナンバーなのでそこからデータを抽出
	//①分割してswordがついているか調べる
	//②分割されたものの中に、複数あるものがあるか調べる
	//③複数あるものはナンバリング
	$sword_array=array();
	$len = count($list);
	for($i=0; $i<$len; $i++){
		$sword_array[$i] = explode("_",$list[$i]);
		$list[$i] = $sword_array[$i][0];
	}

	require_once("./conection.php");
	$mysqli = db_connect();

	$ex=0;
	$ex_array=array();
	$stack=array();
	$flag=0;
	$name=0;
	$name_num = array("A","B","C","D","E","F","G","H","I","J");
		function name_set($list,$name_num,$l){
		$i=0;
		$j=0;
		$k=0;
		$len=count($list);

		for($j=0; $j<$len; $j++){
			if($list[$j]["name"]==$list[$l]["name"] && $j!=$l){
				//何かが重複
				//同値は無視
				for($k=0; $k<$l; $k++){
					if($list[$k]["name"]==$list[$l]["name"] && $k!=$l){
					//同値なら無視するため、同値だとのまま
						$i++;
						//あれば増える
					}
				}
				return $list[$l]["name"].'_'.$name_num[$i];
			}else{
				continue;
			}
		}
		//ひとつも重複なし
		return $list[$l]["name"];
	}

	for($l=0; $l<count($list); $l++){

		$sql="SELECT * FROM ".$table_name." LIMIT 1 OFFSET ".($list[$l]-1);
		$result = $mysqli -> query($sql);
		foreach ($result as $row){


			if(count($sword_array[$l])>1){
				$list[$l] = array("name"=>$row["name"]."(剣)");
				$list[$l] += array("HP"=>$row["HP"]+$row["level"]*5);
				$list[$l] += array("/HP"=>$row["HP"]+$row["level"]*5);
				$list[$l] += array("MP"=>$row["MP"]+$row["level"]*1);
				$list[$l] += array("/MP"=>$row["MP"]+$row["level"]*1);
			}else{
				$list[$l] = array("name"=>$row["name"]);
				$list[$l] += array("HP"=>$row["HP"]);
				$list[$l] += array("/HP"=>$row["HP"]);
				$list[$l] += array("MP"=>$row["MP"]);
				$list[$l] += array("/MP"=>$row["MP"]);
			}
			for($j=4; $j<12; $j++){
				$list[$l] += array($chip[$j]=>$row[$chip[$j]]);
			}
		}
	}

	for($l=0; $l<count($list); $l++){
		$list[$l]["name"]=name_set($list,$name_num,$l);
		//ダブった名前を識別
	}

	function url_set($num=null,$list=null,$chip_associate=null,$chip=null){

		for($i=0; $i<count($list); $i++){
			$URL = "http://wolfnet-twei.sakura.ne.jp/DodontoF/DodontoFServer.rb";
			$roomNo     = 1;
			$password = "wolf";

			$URL .= "?webif=addCharacter";
			$URL .= "&room=".$roomNo;
			$URL .= "&password=".$password;
			if($num != "first"){
				$URL .= "&name=".urlencode($list[$i]["name"]."_".$num);
			}
			$URL .= "&name=".urlencode($list[$i]["name"]);
			$URL .= "&counters=";

			for($l=0; $l<count($chip)-1; $l++){
				$URL .= urlencode($chip_associate[$chip[$l]]).":".urlencode($list[$i][$chip[$l]]).",";
			}
			$URL .= urlencode($chip_associate[$chip[$l]]).":".urlencode($list[$i][$chip[$l]]);

			$special = str_replace("<br>","\n",$list[$i]["special"]);
			$special = str_replace("<p>","",$special);
			$special = str_replace("</p>","",$special);
			$special = str_replace("<div>","",$special);
			$special = str_replace("</div>","",$special);
			$special = str_replace('<span class="bold">',"",$special);
			$special = str_replace("</span>","",$special);
			$special = str_replace("&#09745;","☑",$special);

			$URL .= "&info=".urlencode("特殊能力\n").urlencode($special);

			if(isset($_POST["url"])){
				$URL .= "&url=".urlencode($_POST["url"][$i]);
			}
			return $URL;
		}
	}

	$URL = url_set("first",$list,$chip_associate,$chip);
		if($responce = file_get_contents($URL)){
			$responceData = json_decode($responce, true);
			if($responceData["result"] != "OK"){
				$result = $responceData["result"];
				if(mb_strpos($result,"同じ名前") !== false){
					for($i=0; $i<10; $i++){
						$URL = url_set($name_array[$i],$list,$chip_associate,$chip);
						$responce = file_get_contents($URL);
						$responceData = json_decode($responce, true);
						$result = $responceData["result"];
						if(mb_strpos($result,"同じ名前") === false){
							break;
							//同じ名前がある場合、なくなるまで回すのだ
						}
					}
				}
				if($i==10){
					$result="[ERROR]コマが10個を超えました。もう勘弁してください";
				}
			}
		}else{
			$result = "[ERROR]どどんとふにアクセスできません。\nどどんとふのURLが正しいか確認して下さい。";
			break;
		}
	if($responceData["result"] == "OK"){
		$result = "すべて正常に終了しました";
		//配列が来た場合、全部がうまくいったかどうかチェックする必要があるか？
	}
}else{
	$result = "[ERROR]キャラクターデータにアクセスできません。\nキャラクターIDや外部参照設定を確認して下さい。";
}


echo $result;
?>
