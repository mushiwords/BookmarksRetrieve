$(function(){
    var lowerCase = new Array();
    var $content = $("#content_id");
    $.getJSON("data/bookmarks.json",function(data){
        var strHtml = "";
        $$content.empty();
        $.each(data,function(infoIndex,info){
            var myDate = new Date( info["created"] *1000);
            var realtime = myDate.toLocaleString();
            strHtml +="<div>";
            strHtml += "<div class=\'title\'>"+info["title"]+"</div>";
            strHtml += "<div class=\'time\'>"+"Created @ "+realtime+"</div>";
            strHtml +="</div>";
            strHtml += "<hr class=\'hr\'>"
            info = _.mapObject(info, function(val, key) {
                return val.toLowerCase();
            });
            lowerCase.push(info);
          })
        $content.html(strHtml);
      });

    $("#textbox").keyup(function(){
        var value = $(this).val();
        $content.empty();
        // var test = _.filter(lowerCase, function(object,infoIndex){
        //   return object.title.indexOf(value); });
        $.getJSON("data/bookmarks.json",function(data){
            var strHtml = "";
            $.each(lowerCase,function(infoIndex,info){
                if (info["title"].indexOf(value.toLowerCase()) !=-1) {
                    var myDate = new Date( info["created"] *1000);
                    var realtime = myDate.toLocaleString();
                    var position = info["title"].indexOf(value.toLowerCase());
                    var defaultTitle = data[infoIndex].title;
                    var title =  defaultTitle.substring(0,position) + "<mark>";
                    title +=defaultTitle.substring(position,position+value.length) + "</mark>";
                    title += defaultTitle.substring(position+value.length,data[infoIndex].length);
                    strHtml +="<div>";
                    strHtml += "<div class=\'title\'>"+title+"</div>";
                    strHtml += "<div class=\'time\'>"+"Created @ "+realtime+"</div>";
                    strHtml +="</div>";
                    strHtml += "<hr class=\'hr\'>"
                }
              })
              $content.html(strHtml);
      });
      });
})

function loadData(){
	$('ul').children('li').remove();
	$.getJSON("./data/bookmarks.json",function(content,status){
		for(var i in content){
			$(".list").append("<li><div>"
				+ content[i]["title"]+"</div><div>@created &nbsp"
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
