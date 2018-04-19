<!DOCTYPE html>
<html>
<head>
<title>エネミーリスト</title>
<style></style>
<script type="text/javascript" src="../jquery-3.1.1.min.js"></script>
<script type="text/javascript" src="get_input.js" charset="uft-8"></script>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<meta http-equiv="content-style-type" content="text/css">
<meta name="robots" content="noindex, nofollow">
<link rel="stylesheet" href="special.css" type="text/css" media="screen">
<link rel="stylesheet" href="pop_up.css" type="text/css" media="screen">
</head>
<body>

<?php
if(isset($_POST["array"])){
    $array = $_POST["array"];

echo "<h1>プレビュー(".$array["name"].")</h1>";
echo <<<EOT
<table>
<tr id="race">
<td class="label">種族:</td>
EOT;
echo "<td>".$array["race"]."</td></tr>";

echo <<<EOT
<tr id="name">
<td class="label">名前:</td>
EOT;
echo "<td>".$array["name"]."<span>画像:なし</span></td></tr>";

echo <<<EOT
<tr id="level">
<td class="label">レベル:</td>
EOT;
echo "<td>".$array["level"]."</td></tr>";

echo <<<EOT
<tr id="review">
<td class="label">参照:</td>
EOT;
echo "<td>".$array["review"]."</td></tr>";

echo <<<EOT
<tr id="knowledge">
<td class="label">知能:</td>
EOT;
echo "<td>".$array["knowledge"]."</td></tr>";

echo <<<EOT
<tr id="sense">
<td class="label">知覚:</td>
EOT;
echo "<td>".$array["sense"]."</td></tr>";

echo <<<EOT
<tr id="reaction">
<td class="label">反応:</td>
EOT;
echo "<td>".$array["reaction"]."</td></tr>";

echo <<<EOT
<tr id="word">
<td class="label">言語:</td>
EOT;
echo "<td>".$array["word"]."</td></tr>";

echo <<<EOT
<tr id="habitat">
<td class="label">生息地:</td>
EOT;
echo "<td>".$array["habitat"]."</td></tr>";

echo <<<EOT
<tr id="reputation">
<td class="label">知名度/弱点値:</td>
EOT;
echo "<td>".$array["reputation"]."／".$array["weak"]."</td></tr>";

echo <<<EOT
<tr id="weakness">
<td class="label">弱点:</td>
EOT;
echo "<td>".$array["weakness"]."</td></tr>";

echo <<<EOT
<tr id="preemptive">
<td class="label">先制値:</td>
EOT;
echo "<td>".$array["preemptive"]."</td></tr>";

echo <<<EOT
<tr id="move">
<td class="label">移動速度:</td>
EOT;
$ex = explode("_",$array["move"]);
if(count($ex)>1){
    echo "<td>".$ex[0]."／".$ex[1]."(".$ex[2].")</td></tr>";
}else{
	echo "<td>".$ex[0]."</td></tr>";
}

echo <<<EOT
<tr id="pow">
<td class="label">生命抵抗:</td>
EOT;
echo "<td>".$array["pow"]."</td></tr>";

echo <<<EOT
<tr id="con">
<td class="label">精神抵抗:</td>
EOT;
echo "<td>".$array["con"]."</td></tr>";

echo <<<EOT
<tr id="region">
<td class="label">部位数:</td>
EOT;
echo "<td>".$array["region"]."</td></tr>";

//部位がある場合
if(isset($array["region_name"])){

echo <<<EOT
<tr id="region">
<td class="label">部位名:</td>
EOT;
echo "<td>".$array["region_name"]."</td></tr>";

echo <<<EOT
<tr id="region">
<td class="label">コア部位:</td>
EOT;
echo "<td>".$array["core"]."</td></tr>";
}

echo <<<EOT
<tr id="region">
<td class="label">ステータス:</td>
EOT;
echo "<td><p>攻撃方法".$array["weapon"]."　命中力".$array["hit"]."打撃点:2d+".$array["ap"]."</p>";
echo "<p>回避".$array["avoid"]."　防護点".$array["dp"]."</p>";
echo "<p>HP:".$array["HP"]."　MP:".$array["MP"]."</p></td></tr>";

if(isset($array["region_name"])){

echo <<<EOT
<tr id="region">
<td class="label">特殊能力部位:</td>
EOT;
echo "<td>".$array["skill_region"]."</td></tr>";

echo <<<EOT
<tr id="region">
<td class="label">特殊能力:</td>
EOT;
echo "<td>".$array["skill"]."</td></tr>";
}else{
echo <<<EOT
<tr id="skill">
<td class="label">特殊能力:</td>
EOT;
echo "<td>".$array["skill"]."</td></tr>";
}

echo <<<EOT
<tr id="booty">
<td class="label">戦利品:</td>
EOT;

$ex1=explode("_",$array["booty_dice"]);
$ex2=explode("_",$array["booty"]);
$ex3=explode("_",$array["booty_gamel"]);
$ex4=explode("_",$array["booty_dice"]);
$len=count($ex1);

echo "<td>";
for($i=0; $i<$len; $i++){
	echo"<p>".$ex1[$i]."　".$ex2[$i]."(".$ex3[$i]."G／".$ex4[$i].")</p>";
}
echo "</td></tr>";

echo <<<EOT
<tr id="booty">
<td class="label">詳細:</td>
EOT;
echo "<td>".$array["description"]."</td></tr></table>";
}else{
	echo "no_data";
}
?>


