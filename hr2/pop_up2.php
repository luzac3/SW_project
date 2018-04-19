<?php

$status_pop_up=array("pic","name","level","race","knowledge","sense","reaction","reputation","weak","weak_point","preemptive","move","con","pow","weapon","hit","ap","avoid","dp","HP","MP","region","special");

$status_associate=array(
	'ID' => 'ID',
	'name' => '名称',
	'level' => 'レベル',
	'race' => '種族',
	"review"=>"参照",
	"knowledge"=>"知力",
	"sense"=>"知覚",
	"reaction"=>"反応",
	"word"=>"言語",
	"habitat"=>"生息地",
	"reputation"=>"知名度",
	"weak"=>"弱点値",
	"weak_point"=>"弱点",
	"preemptive"=>"先制値",
	"move"=>"移動力",
	"con"=>"生命抵抗",
	"pow"=>"精神抵抗",
	"region"=>"部位数",
	"weapon"=>"攻撃方法",
	"hit"=>"命中力",
	"ap"=>"攻撃力",
	"avoid"=>"回避",
	"dp"=>"防護点",
	"HP"=>"HP",
	"MP"=>"MP",
	"special"=>"特殊能力",
	"booty"=>"戦利品",
	"description"=>"詳細",
	"pic"=>"pic"
);

$table_name="monster";
require_once("./conection.php");
$mysqli = db_connect();

$sql="SELECT * FROM ".$table_name." WHERE ID = ".$_POST["id"];
//$sql="SELECT * FROM ".$table_name." WHERE ID = 19";
$result = $mysqli -> query($sql);
foreach ($result as $row);
$arr=array();
$arr[0]=array();
for($i=0; $i<count($status_pop_up); $i++){
	$arr[$i+1]=$row[$status_pop_up[$i]];
	//部位の処理を入れる
	$arr2=explode("_", $arr[$i+1]);

	if(count($arr2)<2 && $status_associate[$status_pop_up[$i]]=="打撃点"){
		$arr[$i+1]="2d+".$row[$status_pop_up[$i]];
		continue;
	}
	if(count($arr2)<2 && ($status_associate[$status_pop_up[$i]]=="生命抵抗" || $status_associate[$status_pop_up[$i]]=="精神抵抗" || $status_associate[$status_pop_up[$i]]=="命中力" || $status_associate[$status_pop_up[$i]]=="回避")){
		$arr[$i+1]=$row[$status_pop_up[$i]]."(".($row[$status_pop_up[$i]]+7).")";
		continue;
	}
	if(count($arr2)<2 || $status_associate[$status_pop_up[$i]]=="pic"){
		$arr[$i+1]=$row[$status_pop_up[$i]];
	}
	if(count($arr2)==3 && $status_associate[$status_pop_up[$i]] == "move"){
		$arr[$i+1]=$arr2[0]."/".$arr2[1]."/".$arr2[2];
	}
	if(count($arr2) > 1 && $status_associate[$status_pop_up[$i]] != "pic"){
		if(substr($arr2[0],0,3)=="<p>"){
			$arr[$i+1] = "<strong>●".$arr2[1]."</strong><br>".$arr2[0];
			for($k=2; $k<count($arr2); $k+=2){
				$arr[$i+1] .= "<strong>●".$arr2[$k+1]."</strong><br>".$arr2[$k];
			}
		}else{
			$arr[$i+1]="";
			for($k=0; $k<count($arr2); $k++){
				if($status_associate[$status_pop_up[$i]]=="打撃点"){
					$arr[$i+1] .= "<p>2d+".$arr2[$k]."</p>";
					continue;
			}
				if($status_associate[$status_pop_up[$i]]=="生命抵抗" || $status_associate[$status_pop_up[$i]]=="精神抵抗" || $status_associate[$status_pop_up[$i]]=="命中力" || $status_associate[$status_pop_up[$i]]=="回避"){
					$arr[$i+1] .= "<p>".$arr2[$k]."(".($arr2[$k]+7).")</p>";
					continue;
				}
				if($status_associate[$status_pop_up[$i]]=="攻撃方法"){
					$arr3=explode("_", $row["region_sub"]);
					$arr[$i+1] .= "<p>".$arr2[$k]."(".$arr3[$k].")</p>";
					continue;
				}
				$arr[$i+1] .= "<p>".$arr2[$k]."</p>";
			}
		}
	}
	if(count($arr2) > 1 && $status_associate[$status_pop_up[$i]]=="攻撃方法"){
		$temp= $status_associate[$status_pop_up[$i]]."(部位)";
		array_push($arr[0], $temp);
	}else{
		array_push($arr[0], $status_associate[$status_pop_up[$i]]);
		//arr[0]には配列として項目名が入る
	}
}

echo json_encode($arr);
//print_r($arr);
$mysqli -> close();
?>