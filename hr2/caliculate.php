<?php
$l=$_POST["l"];
$stack=$_POST["stack"];
echo '<div id="booty_form">';
echo '<form id="booty_dice_form"><p>';
for($i=0; $i<$l; $i++){
	echo '<div class="dice_input">'.$stack[$i]["name"].'<br>ダイス目';
	echo '<input type="text" class="'.$i.'" id="form_'.$i.'">';
	echo "</div>\n";
}
echo "</p></form>";

echo '<p>';
echo "<input type='checkbox' class='amulet' value='1' >幸運のお守り\n<input type='checkbox' class='hunt' value='1' >トレジャーハント\n<input type='checkbox' class='eye' value='1' >鋭い目\n<input type='checkbox' class='lacky_star'>幸運の星\n<input class='lacky_star' type='text'>補正値\n";
echo '</p>';
echo "\n";
echo '<p><input class="other" type="checkbox">その他<input class="other" type="text">補正値</p>';
echo "</div>\n";
echo '<button tyep="button" value="booty_dice" onclick="booty()">戦利品決定</button>';
echo '<div id="result_dice"></div><div id="result"></div>';

?>
