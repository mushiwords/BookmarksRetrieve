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
