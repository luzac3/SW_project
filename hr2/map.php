//基本的な構想としては、まずマップ自体の生成

//マップができたら、移動機能の設定

//ステータス等は後！！
//と思っていた時代が僕にもありました。canvasを使って描画していく方向でやろう


//当然専用のCSSを作っていく

$map_x=20;
$map_y=15;

パネルを並べますか
if(isset($._POST["map_x"])){
	$map_x=$._POST["map_x"];
	$map_y=$._POST["map_y"];
}

for($i=0; $i<$map_y; $i++){
	for($k=0; $k<$map_x; $k++){
		echo '<div id="map_box_'.$i.'_'.$k.'" class="map_box">';	/*順序はy_x*/
	}
}
//まず左右の数を設定
//場所は固定せず、位置は固定？
//でもHTMLに位置情報を入れるのはちょっとなあ
//ではクラスを一個ずつずらし、個数に応じてCSSをJSで弄ればよいのでは

//逆にサイズは必要なのでそのまま
//また位置に関しては、BackGroundと同位置に設定し、BackGroundの上にセットする
//原則として色は透明、表示するときは透過で色をつけていく

//どうやらそんな面倒をしなくても、canvas属性というものがあるらしい。お絵かきできるなら出来るだろそりゃ
//位置の指定をボックスででかくすればいいだけだからね
//node.jsと連携させて同期も出来るのがポイントIOイベントの処理を把握するように

