function test(){
var arytest =  { "name" : "安部礼司", "age":39 , "nickname":"平均", "bloodtype":"A" };

jQuery.each(arytest, function(key, value) {

    if ( key == "bloodtype" ) return false; //ループを抜けるときはfalseを返す。

    alert("キー:" + key + " 値:" + value);

});
}