<?php
echo <<<EOT
<!DOCTYPE html>
<html>
<head>
<title>Jquery_test</title>
<style></style>
<script type="text/javascript" src="../jquery-3.1.1.min.js"></script>
<script type="text/javascript" src="enemy.js"></script>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<meta http-equiv="content-style-type" content="text/css">
<meta name="robots" content="noindex, nofollow">
<link rel="stylesheet" href="battle.css" type="text/css" media="screen">
</head>
<body><table>
EOT;
//バトル用のPHP
//配列として必要なデータは取っておく
/*
0:id 1:name 2:level 3:race 4:review 5:knowledge 6:sense 7:reaction 8:word 9:habitat 10:reputation 11:weak 12:weak_point 13:preemitive 14:move 15:con 16:pow 17:pic 18:weapon 19:hit 20:avoid 21:ap 22:dp 23:HP 24:MP 25:special 26:booty 27:booty_dice 28:booty_gamel 29:booty_card 30:description

*/
$i=0;
$j=0;
$k=0;
$l=0;
$table_name="monster";
//ここはあとで書き換えられるように

$status_battle=array("ID","name","level","reputation","weak","preemptive","move","con","pow");
$status_region=array("weapon","hit","ap","avoid","dp","HP","MP","special");


$status_associate_battle=array(
//戦闘用に組み替え
	'ID' => 'ID',
	'name' => '名前',
	'level' => 'Lv',
	'race' => '種族',
	"review"=>"参照",
	"knowledge"=>"知力",
	"sense"=>"知覚",
	"reaction"=>"反応",
	"word"=>"言語",
	"habitat"=>"生息地",
	"reputation"=>"知",
	"weak"=>"弱",
	"weak_point"=>"弱点",
	"preemptive"=>"先制",
	"move"=>"移動",
	"con"=>"生命",
	"pow"=>"精神",
	"region"=>"部位",
	"weapon"=>"武器",
	"hit"=>"命中",
	"ap"=>"攻",
	"avoid"=>"避",
	"dp"=>"防",
	"HP"=>"HP",
	"MP"=>"MP",
	"special"=>"特殊能力",
	"booty"=>"戦利品",
	"description"=>"詳細"
);

require_once("./conection.php");
$mysqli = db_connect();

$sql_count="SELECT * FROM ".$table_name;
//$list=$_POST["list"];
$list=[1,5,5];
$result = $mysqli -> query($sql_count);
$row_cnt = $result->num_rows;

echo '<tr>';
for($i=0; $i<count($status_battle); $i++){
	if($status_battle[$i]=="reputation"){
		echo '<th class="_'.$status_battle[$i].'_'.$status_battle[$i+1].'">'.$status_associate_battle["$status_battle[$i]"].'/'.$status_associate_battle[$status_battle[$i+1]].'</th>';
		echo "\n";
		$i++;
		continue;
	}
	echo '<th class="_'.$status_battle[$i].'">'.$status_associate_battle["$status_battle[$i]"].'</th>';
	echo "\n";
}
for($i=0; $i<count($status_region); $i++){
	echo '<th class="_'.$status_region[$i].'">'.$status_associate_battle["$status_region[$i]"].'</th>';
	echo "\n";
}
echo "</tr>\n";
//まず表の見出しを作成。最終的には変数$statusをgetなどに置き換えて操作できるように
//データ自体の切り替えは、クラス名の切り替えで問題ないでしょう。DOM操作は最小限です
//今回は実験兼ねてデフォルト分だけ作成する

$ex=0;
$ex_array=array();
$stack=array();
$flag=0;
$name=0;
$name_num = array("A","B","C","D","E","F","G","H");
//戦闘用ですが、この辺までは同じです
//問題は多部位モンスターの扱い
//多部位モンスターを作ってから実験しないと
//部位数でループさせるように。
//後のため、MAX_HPとNOW_HPを作る必要はある。
//受けた処理にあわせて、NOWのほうを書き換えていく

//この辺もそのまま使ってOK
function name_set($list,$ex,$name_num,$l){
	$i=0;
	$j=0;
	$k=0;
	$len=count($list);
	for($j=0; $j<$len; $j++){
		if($list[$j]==$list[$l] && $j!=$l){
			//何かが重複
			//同値は無視
			for($k=0; $k<$l; $k++){
				if($list[$k]==$list[$l] && $k!=$l){
				//同値なら無視するため、同値だとのまま
					$i++;
					//あれば増える
				}
			}
			return $ex[0].'_'.$name_num[$i];
		}else{
			continue;
		}
	}
	//ひとつも重複なし
	return $ex[0];
}
for($l=0; $l<count($list); $l++){
	
	$sql="SELECT * FROM ".$table_name." LIMIT 1 OFFSET ".($list[$l]-1);
	
	$result = $mysqli -> query($sql);
	echo '<tr>';
	foreach ($result as $row){
			
		for($k=0; $k<count($status_battle); $k++){
			if($status_battle[$k]=="reputation"){
				echo '<td class="_'.$status_battle[$k].'/'.$status_battle[$k+1].'">'.$row[$status_battle[$k]].'/'.$row[$status_battle[$k+1]].'</td>';
				echo "\n";
				$k++;
				continue;
			}
			$ex=explode("_", $row[$status_battle[$k]]);
			if($status_battle[$k]=="name"){
				$name=name_set($list,$ex,$name_num,$l);
				echo '<td class="_'.$status_battle[$k].'"><a href="#"; return false;>'.$name.'</a></td>';
				$stack[$l][$status_battle[$k]]=$name;
				echo "\n";
				continue;
			}
			if(count($ex)>2){
				echo '<td class="_'.$status_battle[$k].'">'.$ex[0].'/'.$ex[1].'('.mb_substr($ex[2],0,1).')</td>';
				echo "\n";
				continue;
				//移動
			}
			
			echo '<td class="_'.$status_battle[$k].'">'.$ex[0].'</td>';
			$stack[$l][$status_battle[$k]]=$ex[0];
			echo "\n";
			
		}
		
	}
	for($k=0; $k<count($status_region); $k++){
		echo '<td>';
		foreach ($result as $row){
			for($i=0; $i<$row["region"]; $i++){
				if($status_region[$k]=="HP" || $status_region[$k]=="MP"){
					echo '<span class="NOW_'.$status_region[$k].'">'.$row[$status_region[$k]].'</span>';
					echo '<span class="_'.$status_region[$k].'">/'.$row[$status_region[$k]].'</span>';
					echo "\n";
					continue;
					//現在HP/MPを表示できるようにclassも設定
					//特定のキャラクターのclassにアクセスしたい場合、class_name[$l(キャラ番号)]でアクセスできる
					//その場合の名前は、$stack[$l]["name"]と紐付けされているため、どういう形でアクセスしようとキャラ番号で指定できる
				}
				echo '<span class="_'.$status_region[$k].'">'.$row[$status_region[$k]].'</span>';
				$stack[$l][$status_region[$k]][$i]=$status_region[$k];
				//キャラ番号(上から),部位データ(カラム),部位数(何部位目か)
				echo "\n";
			}
			echo '</p>';
		}
		echo '</td>';
	}
	echo '</tr>';
}

$result -> close();

?>

<script id="script" src="enemy.js"
    data-stack='<?php echo json_encode($stack); ?>'
></script>

