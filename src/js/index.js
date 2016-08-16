//事件代理
$("#Jwrap").delegate("[data-bind]","click",function(){
	var parent = $(this).parents(".inner");
	!!$(".popbox",parent) && $(".popbox",parent).hide();
	
	var pos = $(this).data("bind");
	var id =  $(this).data("id");
	var itemTmpl = $("#tmpl1").html();
	var partID = $(this).parents(".area").data("part");
	var htmlInfo = Mustache.to_html(itemTmpl, popInfo[partID]["items"][id]);

	if($(".popbox",parent).length == 0){
		$(this).parents(".inner").append(htmlInfo);
	}else{
		$(htmlInfo).replaceAll($(".popbox",parent));
	}
	$(".popbox",parent).css({"left":pos.split(",")[0]+"px","top":pos.split(",")[1]+"px"})
	$(".popbox",parent).hover(function(){},function(){
		$(this).hide();
	})
	$(".popbox",parent).show();
})

$("#Jwrap").delegate(".pop-close","click",function(){
	$(this).parent().hide();
})