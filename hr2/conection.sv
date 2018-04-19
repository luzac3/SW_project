<?php

function db_connect(){
	//db接続関数
	$server ="mysql608.db.sakura.ne.jp";
	$username="wolfnet-twei";
	$password="alderaan123";
	$db_name="wolfnet-twei_enemy";
	
	$mysqli = new mysqli($server,$username,$password,$db_name);
	
	if($mysqli->connect_error){
		echo $mysqli->connection_error;
		exit();
	}else{
		$mysqli->set_charset("utf8");
	}
	return $mysqli;
}

function tb_make($table_name){
	$mysqli = db_connect();
	$sql = "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA='wolfnet-twei_enemy' AND TABLE_NAME='".$table_name."'";
	$result = $mysqli -> query($sql);
	$i=0;
	foreach ($result as $row){
		$column[$i]=$row['COLUMN_NAME'];
		$i++;
	}
	$result->close();
	$mysqli->close();
	return $column;
}
?>
