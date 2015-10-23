$(document).ready(function(){

	var $items = [],
		count = $(".b-house li").length,
		nowItem = 1;

	$(".b-house li").each(function(){
		$items.push($(this));
	});

	$(".b-house li").hide();

	$(".b-house-thumbs li").click(function(){
		if( $(this).index() != nowItem )
			goTo($(this).index());
	});

	goTo(0);
	
	function goTo(to){
		$(".b-way-2").addClass("transition");

		if( to == 4 ){
			$(".b-way-2").addClass("day");
			$(".b-way-2 .b-day").fadeIn(500);
			setTimeout(function(){
				$(".b-way-2").removeClass("transition");
			},500);
		}else{
			$(".b-way-2").removeClass("day");
			$(".b-way-2 .b-day").fadeOut(1000);
			setTimeout(function(){
				$(".b-way-2").removeClass("transition");
			},1000);
		}
		$(".b-house-thumbs li").eq(nowItem).removeClass("active");
		$(".b-house-thumbs li").eq(to).addClass("active");
		$items[nowItem].css("z-index",10).delay(500).fadeOut(500);
		$items[to].css("z-index",11).fadeIn(1000);

		nowItem = to;
	}

});