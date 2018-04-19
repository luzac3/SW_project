<?php
//配列として必要なデータは取っておく
/*
0:id 1:name 2:level 3:race 4:review 5:knowledge 6:sense 7:reaction 8:word 9:habitat 10:reputation 11:weak 12:weak_point 13:preemitive 14:move 15:con 16:pow 17:pic 18:weapon 19:hit 20:avoid 21:ap 22:dp 23:HP 24:MP 25:special 26:booty 27:booty_dice 28:booty_gamel 29:booty_card 30:description

*/
$i=0;
$k=0;
//ここはあとで書き換えられるように

$status_default=array("ID","name","level","reputation","weak","preemptive","move","region","HP","MP");	/*簡易表示(デフォルト)用。必要に応じてJS経由で書き換えを起動させる*/
//連想配列を引っ張り出すためのもの

$status_battle=array("ID","name","level","reputation","weak","preemtive","move","con","pow","HP","MP");

$status_region=array("weapon","hit","ap","avoid","dp","HP","MP","special");
//部位ごとに違う部分。攻撃力などと特殊能力

$status_booty=array("ID","name","level","region","booty","booty_dice","booty_gamel","booty_card");

$status_detail=array("ID","name","level","race","review","knowledge","sense","reaction","word","habitat","reputation","weak","weak_point","preemtive","move","con","pow","region","pic","weapon","hit","ap","avoid","dp","HP","MP","special","booty","booty_dice","booty_gamel","booty_card","description");

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

$show_value=20;
$page_num=0;	/*読み込み開始位置*/
if(isset($_GET["show_value"])){
	$show_value=$_GET["show_value"];
	$page_num=$_GET["page_num"];
	$table_name=$_GET["table"];
}
echo '<div id="main"><form><p id="search_box"><input type="text"><button type="button" onclick="search()">検索</button></p></form>';
echo '<span id="page_set" class="1">';
echo '<span id="edit">';

echo <<<EOT
表示件数
<select id="page_change" onchange="page(0)">
<option value="20">20</option>
<option value="50">50</option>
<option value="100">100</option>
</select>
<span id="jump">
EOT;

$sql_count="SELECT * FROM ".$table_name;

$result = $mysqli -> query($sql_count);
$row_cnt = $result->num_rows;
$len=ceil($row_cnt/$show_value);

if($page_num != ($len-1)){
	echo '<a href="#"; onclick="page(\'next\')";return false;>次へ</a><span>      </span>';
}
if($page_num!=0){
	echo '<a href="#"; onclick="page(\'back\')";return false;>前へ</a><span>      </span>';
}
if($len>5){
	for($i=1; $i<=5; $i++){
	echo '<a href="#"; onclick="page('.($i-1).')";return false;>'.$i.'</a><span>   </span>';
	echo "\n";
	}
	echo "...";
	echo '<a href="#"; onclick="page('.($len-1).')";return false;>'.$len.'</a>';
}else{
	for($i=1; $i<=$len; $i++){
		echo '<a href="#"; onclick="page('.($i-1).')";return false;>'.$i.'</a>';
		echo "\n";
	}
}
$page_num *= $show_value;

echo '</span></span>';
echo "\n";

echo '<div id="status_table"><table><tr>';
for($i=0; $i<count($status_default); $i++){
	echo '<th class="_'.$status_default[$i].'">'.$status_associate["$status_default[$i]"].'</th>';
	echo "\n";
}
echo '<th>セット</th>';
echo "</tr>\n";
//まず表の見出しを作成。最終的には変数$statusをgetなどに置き換えて操作できるように
//データ自体の切り替えは、クラス名の切り替えで問題ないでしょう。DOM操作は最小限です
//今回は実験兼ねてデフォルト分だけ作成する


$sql="SELECT * FROM ".$table_name." LIMIT ".$show_value." OFFSET ".$page_num;
if(isset($_POST["keyword"])){
	$search_range="ID like '%コボ%'";
	$column=tb_make("monster");
	for($i=1; $i<$row_cnt; $i++){
		$search_range .= " OR ".$column[$i]. " LIKE '%".$_POST["keyword"]."%'";
	}
	$sql="SELECT * FROM ".$table_name." WHERE ".$search_range;
	if(isset($_POST["item"])){
		$sql="SELECT * FROM ".$table_name." WHERE ".$item." LIKE '%".$_POST["search"]."%'";
	}
}

//部分一致でも抽出できるようにするには・・・
//*key_word*で出せるかな？
//regionが2以上ならどこかで分岐させないと。この場合で表示が違うのは・・・HPとMPだけ。

$result = $mysqli -> query($sql);
$ex=0;
$ex_region=0;
$reg_count=0;
$region_status=array();
$reg_loop;
$i=0;
foreach ($result as $row){
	echo '<tr class="'.$reg_count.'">';
	for($k=0; $k<count($status_default); $k++){
		$ex=explode("_", $row[$status_default[$k]]);
		if($status_default[$k]!="HP" && $status_default[$k]!="MP" && $reg_count>1){
			continue;
		}

		if($status_default[$k]=="name"){
			echo '<td class="_'.$status_default[$k].'"><a class="id_'.$row["ID"].'"href="#"; return false;>'.$ex[0].'</a></td>';
			echo "\n";
			continue;
		}
		if(count($ex)>3){
			echo '<td class="_'.$status_default[$k].'">';
			for($i=0; $i<count($ex); $i += 2){
				echo '<p id="region_char">'.$ex[$i].'('.$ex[$i+1].')</p>';
				echo "\n";
			}
			echo '</td>';
			continue;
		}
		if(count($ex)==3){
			echo '<td class="_'.$status_default[$k].'">'.$ex[0].'/'.$ex[1].'('.$ex[2].')</td>';
			echo "\n";
		}else{
			echo '<td class="_'.$status_default[$k].'">'.$ex[0].'</td>';
			echo "\n";
		}
	}
	echo '<td class="_button"><button type="button" onclick="stack('.$row["ID"].',\''.$row["name"].'\')" value="set">セット</button>';
	echo "\n";
	echo '</td>';
	echo '</tr>';
}

echo '</table></span>';
echo '<div id="selecter"><span class="0" id="stack"></span><button id="set_button" type="submit" value="move" onclick="change_booty()">移動</button></div><div id="calc_space"></div><div id="footer"></div></div></div>';




?>