window.onload=function(){

	loadData();
}

function loadData(){
	$('ul').children('li').remove();
	$.getJSON("./data/bookmarks.json",function(content,status){
		for(var i in content){
			$(".list").append("<li><div class='list_content'>"
				+ content[i]["title"]+"</div><div class='list_time'>@created &nbsp"
				+ formatDate(content[i]["created"])+"</div></li>");
		}
		alert("load success");
	});
}

function  formatDate(d){ 
	var regS = new RegExp("\\/","g"); 	 
	var regD = new RegExp("(\d{4})-(\d{1,2})-(\d{1|2})","g");
	var regD = new RegExp("[0-9]+-[0-9]+-[0-9]+","g");
  	return new Date(parseInt(d) * 1000).toLocaleString()
  			.replace(regS, "-")
  			.match(regD);
}