<?php

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

$status_booty=array("ID","name","level","region","booty_dice","booty","booty_gamel","booty_card");

$status_associate=array(
	'ID' => 'ID',
	'name' => '名前',
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
	"weapon"=>"武器",
	"hit"=>"命中力",
	"ap"=>"攻撃力",
	"avoid"=>"回避",
	"dp"=>"防護点",
	"HP"=>"HP",
	"MP"=>"MP",
	"special"=>"特殊能力",
	"booty"=>"戦利品",
	"description"=>"詳細"
);

require_once("./conection.php");
$mysqli = db_connect();

$sql_count="SELECT * FROM ".$table_name;
$list=$_POST["list"];
//$list=[1,5,5];
$result = $mysqli -> query($sql_count);
$row_cnt = $result->num_rows;

echo '<tr>';
for($i=0; $i<count($status_booty); $i++){
	if(mb_substr($status_booty[$i],0,6)=="booty_"){
		continue;
	}
	echo '<th class="_'.$status_booty[$i].'">'.$status_associate["$status_booty[$i]"].'</th>';
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

function name_set($list,$ex,$name_num,$l){
	$i=0;
	$j=0;
	$k=0;
	$len=count($list);
	echo $len;
	print_r($list);
	echo $l;
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
		foreach ($result as $row){
			echo '<tr>';
			for($k=0; $k<count($status_booty); $k++){
				$ex=explode("_", $row[$status_booty[$k]]);
				if($status_booty[$k]=="name"){
					$name=name_set($list,$ex,$name_num,$l);
					echo '<td class="_'.$status_booty[$k].'"><a href="#"; return false;>'.$name.'</a></td>';
					$stack[$l][$status_booty[$k]]=$name;
					echo "\n";
					continue;
				}

				if(mb_substr($status_booty[$k],0,5)=="booty"){
					for($j=0; $j<4; $j++){
						$ex_array[$j]=explode("_", $row[$status_booty[$k+$j]]);
					}
					echo '<td class="_'.$status_booty[$k].'">';
					for($i=0; $i<count($ex); $i++){
						echo '<p class="'.$status_booty[$k].'_'.$i.'">';
						$stack[$l][$status_booty[$k]][$i]=$ex_array[0][$i];
						$stack[$l][$status_booty[$k+1]][$i]=$ex_array[1][$i];
						$stack[$l][$status_booty[$k+2]][$i]=$ex_array[2][$i];
						$stack[$l][$status_booty[$k+3]][$i]=$ex_array[3][$i];
						//bootyが飛んでくる. 赤い髪[0]_なし[1]_武器[2]
							
						echo '<span class="booty_dice">'.$ex_array[0][$i].'	</span>';
						echo '<span class="span_booty">'.$ex_array[1][$i].'('.$ex_array[2][$i].' / '.$ex_array[3][$i].')</span>';
						echo "\n";
						echo '</p>';
						echo "\n";
					}
					$k=$k+4;
					echo '</td>';
					echo "\n";
					continue;
				}
				echo '<td class="_'.$status_booty[$k].'">'.$ex[0].'</td>';
				$stack[$l][$status_booty[$k]]=$ex[0];
				echo "\n";
			}
			echo '</tr>';
		}
}

?>

<script id="script" src="enemy.js"
    data-stack='<?php echo json_encode($stack); ?>'
></script>

