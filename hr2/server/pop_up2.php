<?php

$status_pop_up=array(
		"pic",
		"name",
		"level",
		"race",
		"knowledge",
		"sense",
		"reaction",
		"reputation",
		"weak",
		"weak_point",
		"preemptive",
		"move",
		"con",
		"pow",
		"weapon",
		"hit",
		"ap",
		"avoid",
		"dp",
		"HP",
		"MP",
		"region",
		"special"
);

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
if(isset($_POST["table"])){
	$table_name=$_POST["table"];
}
//$table_name="barbaros";
require_once("./conection.php");
$mysqli = db_connect();

$sql="SELECT * FROM ".$table_name." WHERE ID = ".$_POST["id"];
//$sql="SELECT * FROM ".$table_name." WHERE ID = 19";
$result = $mysqli -> query($sql);
foreach ($result as $row);
$sword=[];
$avr=$row["level"]%$row["region"];
for($i=0; $i<$row["region"]; $i++){
	if($_POST["sword"]=="true"){
		$sword[$i]=intval($row["level"]/$row["region"]);
		if($avr>0){
			$sword[$i]++;
			$avr--;
		}
	}else{
		$sword[$i]=0;
	}
}
$arr=array();
$arr[0]=array();


$region_name = explode("_",$row["region_name"]);
$special_region = explode("_",$row["special_region"]);


for($i=0; $i<count($status_pop_up); $i++){
	if($row["region"]>1 && $status_pop_up[$i]=="region"){
		$arr[$i+1] = "部位<br>部位数:".$row["region"];
		$arr[$i+1] .= "(".$special_region[0];
		for($j=1; $j<$row["region"]; $j++){
			$arr[$i+1] .= "／".$special_region[$j];
		}
		$arr[$i+1] .= ")<br>コア部位:";
		$arr[$i+1] .= $row["core"];
		array_push($arr[0], "部位数");
		$i++;
	}

	$arr[$i+1]=$row[$status_pop_up[$i]];
	//部位の処理を入れる
	$arr2=explode("_", $arr[$i+1]);
	if(count($arr2)>1 && $status_pop_up[$i] == "move"){
		$arr[$i+1]=$arr2[0]."/".$arr2[1]."/".$arr2[2];
	}
	if($status_pop_up[$i]=="pic"){
		$arr[$i+1]=$row[$status_pop_up[$i]];
	}
	//ステータス
	if($status_pop_up[$i]=="ap"){
		$arr[$i+1] = "2d+".$arr2[0];
		for($j=1; $j<$row["region"]; $j++){
			$arr[$i+1] .= "<br>2d+".$arr2[$j];
		}
	}
	if($status_pop_up[$i]=="dp" || $status_pop_up[$i]=="HP" || $status_pop_up[$i]=="MP"){
		if($status_pop_up[$i]=="HP"){
			$arr2[0] += $sword[0]*5;
		}
		if($status_pop_up[$i]=="MP"){
			$arr2[0] += $sword[0];
		}
		$arr[$i+1] = $arr2[0];
		for($j=1; $j<$row["region"]; $j++){
			if($status_pop_up[$i]=="HP"){
				$arr2[$j] += $sword[$j]*5;
			}
			if($status_pop_up[$i]=="MP"){
				$arr2[$j] += $sword[$j];
			}
			$arr[$i+1] .= "<br>".$arr2[$j];
		}
	}
	if($status_pop_up[$i]=="con" || $status_pop_up[$i]=="pow" || $status_pop_up[$i]=="hit" || $status_pop_up[$i]=="avoid"){
		$arr[$i+1] = $arr2[0]."(".($arr2[0]+7).")";
		if($status_pop_up[$i]=="hit" || $status_pop_up[$i]=="avoid"){
			for($j=1; $j<$row["region"]; $j++){
				$arr[$i+1] .= "<br>".$arr2[$j]."(".($arr2[$j]+7).")";
			}
		}
	}

	if($status_pop_up[$i]=="special" && $row["region"]>1){
			$arr[$i+1] = "<strong>●".$special_region[0]."</strong><br>".$arr2[0];
		for($j=1; $j<count($special_region); $j++){
			$arr[$i+1] .= "<br><strong>●".$special_region[$j]."</strong><br>".$arr2[$j];
		}
	}

	if($row["region"]>1 && $status_pop_up[$i]=="weapon"){
		$arr[$i+1] = $arr2[0]."(".$region_name[0].")";
		for($j=1; $j<count($special_region); $j++){
			$arr[$i+1] .= "<br>".$arr2[$j]."(".$region_name[$j].")";
		}
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