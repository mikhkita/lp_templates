$(document).ready(function(){

	var $items = [],
		count = $(".b-way").length,
		nowItem = 0;

	$(".b-way").each(function(){
		$items.push($(this));
	});

	$(".b-way").hide();

	$(".b-way-nav-left").click(function(){
		goTo( ( nowItem > 0 )?(nowItem-1):(count-1), -1 );
	});

	$(".b-way-nav-right").click(function(){
		goTo( ( nowItem < count-1 )?(nowItem+1):0, 1 );
	});

	$(".b-steps li").click(function(el,attr){
		if( typeof attr == "undefined" ) attr = false;
		if( $(this).index() != nowItem )
			goTo($(this).index(),attr);
	});

	goTo(1);

	var timer;
	
	function goTo(to,delay){
		clearTimeout(timer);
		$(".b-steps li").eq(nowItem).removeClass("active");
		$(".b-steps li").eq(to).addClass("active");
		$items[nowItem].fadeOut(300);

		nowItem = to;

		timer = setTimeout(function(){
			TweenLite.to($(".b-5"), 0.3, { height : $items[to].attr("data-height"), ease : Quad.easeOut } );
			TweenLite.to($items[nowItem].find(".step"), 0, { y : 30, opacity: 0, ease : Quad.easeOut } );
			$items[nowItem].fadeIn(500);

			$items[nowItem].find(".step").each(function(){
				TweenLite.to($(this), ($(this).attr("data-duration"))?($(this).attr("data-duration")*1/1000):0.5, { y : 0, opacity: 1, delay: $(this).attr("data-delay")*1/1000,ease : Quad.easeOut } );
			});
		},300+((delay)?500:0));
	}

	var swipeh = new MobiSwipe("b-5");
        swipeh.direction = swipeh.HORIZONTAL;
    	swipeh.onswiperight = function() { $(".b-way-nav-left").click(); };
    	swipeh.onswipeleft = function() { $(".b-way-nav-right").click(); };

    $(document).keyup(function(e){
    	if( e.keyCode == 37 ){
    		$(".b-way-nav-left").click();
    	}else if( e.keyCode == 39 ){
    		$(".b-way-nav-right").click();
    	}
    });

});