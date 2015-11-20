window.onload=function(){

	loadData();
	$(".search")
		.bind('keyup',function(event) {
			$(this).css({
					color: '#4499ee'
				});
			$(".list_content").map(function(index, val) {
				var temp = this.innerHTML.replace(/<.*?>/ig,"");	
				this.innerHTML = temp;
			});
			var keywords = this.value;
			if(this.value !=""){
				var keywordRE = new RegExp("(" + keywords + ")", "ig");
				$(".list_content").each(function(){	
					var text = this.innerHTML.toLocaleString();				
					if(text.match(keywordRE)){
						console.log(text);
						var highlightedText = text.replace(keywordRE, "<span class='highlight'>$1</span>");							
						this.innerHTML = highlightedText;
						var $li = $(this).parent("li").show();
					}
					else{
						var $li = $(this).parent("li").hide();	
					}
				});
			}
			else{
				$("li").show();
			}
		});
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
