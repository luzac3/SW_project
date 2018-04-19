function map_make(meisyou,area,shisetsu,pic,No){
	
	var td_meisyou=document.createElement("td");
	var td_area=document.createElement("td");
	var td_shisetsu=document.createElement("td");
	var td_picture=document.createElement("td");
	
	
	var RC=document.getElementById("meisyou");
	while (RC.firstChild){
	RC.removeChild(RC.firstChild);}
	var RC=document.getElementById("area");
	while (RC.firstChild){
	RC.removeChild(RC.firstChild);}
	var RC=document.getElementById("shisetsu");
	while (RC.firstChild){
	RC.removeChild(RC.firstChild);}
	var RC=document.getElementById("event").getElementsByTagName("li");
	for(var i=RC.length-1; i>=0; -- i){
	var parent=RC[i].parentNode;
	parent.removeChild(RC[i]);}
	
	
	
	document.getElementById("meisyou").appendChild(td_meisyou);
	td_meisyou.setAttribute("colspan","2");
	td_meisyou.innerHTML=meisyou;
	
	document.getElementById("area").appendChild(td_area);
	document.getElementById("area").appendChild(td_picture);
	td_picture.setAttribute("rowspan","2");
	td_picture.innerHTML=pic;
	document.getElementById("shisetsu").appendChild(td_shisetsu);
	td_area.innerHTML=area;
	td_shisetsu.innerHTML=shisetsu;
	var li_tag=document.createElement("li");
	cell_main.innerHTML="<tr>"+"<td colspan=2>"+"ƒCƒxƒ“ƒg‚ÌÚ×"+"</tr>"+"</td>"
	event(No);


	

}