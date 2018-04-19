<?php
/**
まず名前を決定→ナンバリング→部位ごとに分類
たとえばスキュラ_Aができてから部位を分類
スキュラ_A(触手)_1
スキュラ_A(触手)_2...
触手部分は、一週目の最後に
if(region>1){
	name += "(".region_name[reg].")"
}

全体を部位数でくくって、ぐるぐる回せばいいかと
必ず分割すれば回すとき楽やんな
*/

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
$first_list = $_POST["list"];
//$first_list = ["1_sword"];
$table_name= $_POST["table"];
//$table_name = "barbaros";

$URL = "http://wolfnet-twei.sakura.ne.jp/DodontoF/DodontoFServer.rb";
$roomNo     = 1;
$password = "wolf";

$URL .= "?webif=addCharacter";
$URL .= "&room=".$roomNo;
$URL .= "&password=".$password;

$URL_CHANGE = "http://wolfnet-twei.sakura.ne.jp/DodontoF/DodontoFServer.rb";
$URL_CHANGE .= "?webif=changeCharacter";
$URL_CHANGE .= "&room=".$roomNo;
$URL_CHANGE .= "&password=".$password;


	//飛んでくるリストナンバーは、順番にIDナンバーなのでそこからデータを抽出
	//①分割してswordがついているか調べる
	//②分割されたものの中に、複数あるものがあるか調べる
	//③複数あるものはナンバリング
	$sword_array=array();
	$len = count($first_list);
	for($i=0; $i<$len; $i++){
		$sword_array[$i] = explode("_",$first_list[$i]);
		$first_list[$i] = $sword_array[$i][0];
	}

	require_once("./conection.php");
	$mysqli = db_connect();

	$ex=0;
	$ex_array=array();
	$stack=array();
	$flag=0;
	$name=0;
	$name_num = array("A","B","C","D","E","F","G","H","I","J","K");
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
	for($l=0; $l<count($first_list); $l++){
		//リスト(キャラクターリスト)

		$sql="SELECT * FROM ".$table_name." LIMIT 1 OFFSET ".($first_list[$l]-1);
		$result = $mysqli -> query($sql);
		foreach ($result as $row){
			//部位で別れるのはここ
			//この時点で名前を調整しておく必要あり
			//もっというと剣用のHP調整もここでしないとダメだわ
			//名前に名前(剣)(部位名)にしておく必要が

			$len=$row["region"];
			$region_name=explode("_",$row["region_name"]);

			$name=[];
			$temp=[];
			$list=[];
			$HP=explode("_",$row["HP"]);
			$MP=explode("_",$row["MP"]);
			$dp=explode("_",$row["dp"]);
			$hit=explode("_",$row["hit"]);
			$ap=explode("_",$row["ap"]);
			$avoid=explode("_",$row["avoid"]);
			$move=explode("_",$row["move"]);

			$reg_hosei = ($row["level"]*5)%$row["region"];

			for($i=0; $i<$len; $i++){
				if(count($sword_array[$l])>1){
					if($len>1){
						$name[$i]=$row["name"]."(剣)(".$region_name[$i].")";
					}else{
						$name[$i]=$row["name"]."(剣)";
					}
					$HP[$i] += intval($row["level"]*5/$row["region"]);
					$MP[$i] += intval($row["level"]/$row["region"]);

					if($reg_hosei>0){
						$HP[$i] += 1;
						$MP[$i] += 1;
						$reg_hosei--;
					}
					$temp[$i]=$name[$i];
				}else{
					if($len>1){
						$name[$i]=$row["name"]."(".$region_name[$i].")";
					}else{
						$name[$i]=$row["name"];
					}
					$temp[$i]=$name[$i];
				}
			}
			$num=2;
			//この位置でナンバリングする
			for($i=0; $i<$len; $i++){
				for($k=0; $k<$len; $k++){
					if($name[$i]==$name[$k] && $k!=$i){
						$name[$k]=$name[$k]."_".$num;
						$num++;
						$temp[$i]=$name[$i]."_1";
					}
				}
				$name[$i]=$temp[$i];
			}
			print_r($name);

			for($k=0; $k<$len; $k++){
				$list[$l+$k] = array("name"=>$name[$k]);
				$list[$l+$k] += array("HP"=>$HP[$k]);
				$list[$l+$k] += array("/HP"=>$HP[$k]);
				$list[$l+$k] += array("MP"=>$MP[$k]);
				$list[$l+$k] += array("/MP"=>$MP[$k]);

				$list[$l+$k] += array("dp"=>$dp[$k]);
				$list[$l+$k] += array("hit"=>$hit[$k]);
				$list[$l+$k] += array("ap"=>$ap[$k]);
				$list[$l+$k] += array("avoid"=>$avoid[$k]);

				for($j=8; $j<11; $j++){
					$list[$l+$k] += array($chip[$j]=>$row[$chip[$j]]);
				}
				$sp_ex = explode("_",$row["special"]);
				$ex_sp_reg = explode("_",$row["special_region"]);
				if($len>1){
					$list[$l+$k] += array("special"=>$ex_sp_reg[$k]."\n".$sp_ex[$k]);
				}else{
					$list[$l+$k] += array("special"=>$sp_ex[$k]);
				}
			}
		}
	}
print_r($list);
	for($l=0; $l<count($list); $l++){
		$list[$l]["name"]=name_set($list,$name_num,$l);
		//ダブった名前を識別
	}

	//name(S)(reg_name)_1_A...
	//これを摩り替える。要は分割してcount(ex)>2になる場合は


	for($l=0; $l<count($list); $l++){
		//ここで_Aをつけてタッチだけする(書き換えしない)
		//エラーが出たらAはいないからそのまま進む。
		//エラーが出なかったら、_Aがいるので(無印はいないはず)、自分を_Bに書き換えて進む

		if($responce = file_get_contents($URL_CHANGE .= "&targetName=".urlencode($list[$l]["name"])."_A"."&name=".urlencode($list[$l]["name"])."_A")){
			$responceData = json_decode($responce, true);
			if($responceData["result"] == "OK"){
				//OKが出た(_Aがいた)場合のみ中身を書き換える
				$list[$l]["name"]=$list[$l]["name"]."_B";
			}
		}

		$ex=explode("_",$list[$l]["name"]);
		if(count($ex)>3){
			$list[$l]["name"] = $ex[0]."_".$ex[2]."_".$ex[1];
		}
		if($responce = file_get_contents($URL."&name=".urlencode($list[$l]["name"]))){
			$responceData = json_decode($responce, true);
			if($responceData["result"] != "OK"){
				$result = $responceData["result"];
				$alpha=0;
				if(mb_strpos($result,"同じ名前") !== false){
				//同じ名前が既にいる場合
					for($alpha=0; $alpha<10; $alpha++){
						$ex=explode("_",$list[$l]["name"]);
						//再分割

						//後ろに何もついてない場合(分割の結果が1)
						if(count($ex)==1){
							$list[$l]["name"] .= "_A";
							$rewrite = 0;
						}else if(count($ex)==2){
							if(ctype_digit($ex[1])){
							//最後の文字が数字の場合
								$list[$l]["name"] .= "_A";
								$rewrite = 0;
							}else{
								$temp=array_search($ex[1],$name_num);
								$temp++;
								$list[$l]["name"] = $ex[0]."_".$name_num[$temp];
								//文字を一つ進める
							}
						}else{
							$temp=array_search($ex[1],$name_num);
							$temp++;
							$list[$l]["name"] = $ex[0]."_".$name_num[$temp];
						}
						$responce = file_get_contents($URL."&name=".urlencode($list[$l]["name"]));
						$responceData = json_decode($responce, true);
						$result = $responceData["result"];
						if(mb_strpos($result,"同じ名前") === false){
							break;
						}
					}
				}
				if($alpha==11){
					$result="[ERROR]コマが10個を超えています。もう勘弁してください";
					echo $result;
					return;
				}
			}
		}else{
			$result = "[ERROR]どどんとふにアクセスできません。\nどどんとふのURLが正しいか確認して下さい。";
			echo $result;
			return;
		}
	}

	function url_set($list=null,$chip_associate=null,$chip=null){
		for($i=0; $i<count($list); $i++){
			sleep(1);
			$URL = "http://wolfnet-twei.sakura.ne.jp/DodontoF/DodontoFServer.rb";
			$roomNo     = 1;
			$password = "wolf";

			$URL .= "?webif=changeCharacter";
			$URL .= "&room=".$roomNo;
			$URL .= "&password=".$password;

			$URL .= "&targetName=".urlencode($list[$i]["name"]);
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
			$responce = file_get_contents($URL);
			$responceData = json_decode($responce, true);
			if($responceData["result"] != "OK"){
				$result = "何かおかしなエラーが発生しています。";
				return $result;
			}else{
				$result="正常に終了しました。";
			}
		}
		return $result;
	}
//先に名前だけ送って重複チェックをする計画

	$result = url_set($list,$chip_associate,$chip);

}else{
	$result = "[ERROR]キャラクターデータにアクセスできません。\nキャラクターIDや外部参照設定を確認して下さい。";
}

echo $result;
?>
