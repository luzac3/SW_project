<?php
require_once("./conection.php");
$mysqli = db_connect();
if(isset($_GET["array"])){
    $array = $_GET["array"];
    $table_name = $array["race"];

    if(isset($array["region_name"])){
        $sql="INSERT INTO ".$table_name." (name,level,review,knowledge,sense,reaction,word,habitat,reputation,weak,weakness,preemptive,move,pow,con,region,region_name,core,weapon,hit,ap,avoid,dp,HP,MP,skill,booty,booty_dice,booty_gamel) VALUES (".$array["name"].",".$array["level"].",".$array["review"].",".$array["knowledge"].",".$array["sense"].",".$array["reaction"].",".$array["word"].",".$array["habitat"].",".$array["reputation"].",".$array["weak"].",".$array["weakness"].",".$array["preemptive"].",".$array["move"].",".$array["pow"].",".$array["con"].",".$array["region"].",".$array["region_name"].",".$array["core"].",".$array["weapon"].",".$array["hit"].",".$array["ap"].",".$array["avoid"].",".$array["dp"].",".$array["HP"].",".$array["MP"].",".$array["skill"].",".$array["booty"].",".$array["booty_dice"].",".$array["booty_gamel"].")";
        //skill_regionってどこだっけ
    }else{
        $sql="INSERT INTO ".$table_name." (name,level,review,knowledge,sense,reaction,word,habitat,reputation,weak,weakness,preemptive,move,pow,con,region,weapon,hit,ap,avoid,dp,HP,MP,skill,booty,booty_dice,booty_gamel) VALUES (".$array["name"].",".$array["level"].",".$array["review"].",".$array["knowledge"].",".$array["sense"].",".$array["reaction"].",".$array["word"].",".$array["habitat"].",".$array["reputation"].",".$array["weak"].",".$array["weakness"].",".$array["preemptive"].",".$array["move"].",".$array["pow"].",".$array["con"].",".$array["region"].",".$array["weapon"].",".$array["hit"].",".$array["ap"].",".$array["avoid"].",".$array["dp"].",".$array["HP"].",".$array["MP"].",".$array["skill"].",".$array["booty"].",".$array["booty_dice"].",".$array["booty_gamel"].")";
    }
    $mysqli -> query($sql);
    $mysqli -> close();
    echo "アップロードが完了しました";
}
?>

