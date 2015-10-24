$(document).ready(function(){	
    function resize(){
       if( typeof( window.innerWidth ) == 'number' ) {
            myWidth = window.innerWidth;
            myHeight = window.innerHeight;
        } else if( document.documentElement && ( document.documentElement.clientWidth || 
        document.documentElement.clientHeight ) ) {
            myWidth = document.documentElement.clientWidth;
            myHeight = document.documentElement.clientHeight;
        } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
            myWidth = document.body.clientWidth;
            myHeight = document.body.clientHeight;
        }
    }
    $(window).resize(resize);
    resize();

    $.fn.placeholder = function() {
        if(typeof document.createElement("input").placeholder == 'undefined') {
            $('[placeholder]').focus(function() {
                var input = $(this);
                if (input.val() == input.attr('placeholder')) {
                    input.val('');
                    input.removeClass('placeholder');
                }
            }).blur(function() {
                var input = $(this);
                if (input.val() == '' || input.val() == input.attr('placeholder')) {
                    input.addClass('placeholder');
                    input.val(input.attr('placeholder'));
                }
            }).blur().parents('form').submit(function() {
                $(this).find('[placeholder]').each(function() {
                    var input = $(this);
                    if (input.val() == input.attr('placeholder')) {
                        input.val('');
                    }
                });
            });
        }
    }
    $.fn.placeholder();
    
	// var myPlace = new google.maps.LatLng(55.754407, 37.625151);
 //    var myOptions = {
 //        zoom: 16,
 //        center: myPlace,
 //        mapTypeId: google.maps.MapTypeId.ROADMAP,
 //        disableDefaultUI: true,
 //        scrollwheel: false,
 //        zoomControl: true
 //    }
 //    var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions); 

 //    var marker = new google.maps.Marker({
	//     position: myPlace,
	//     map: map,
	//     title: "Ярмарка вакансий и стажировок"
	// });

    //  var options = {
    //     $AutoPlay: true,                                
    //     $SlideDuration: 500,                            

    //     $BulletNavigatorOptions: {                      
    //         $Class: $JssorBulletNavigator$,             
    //         $ChanceToShow: 2,                           
    //         $AutoCenter: 1,                            
    //         $Steps: 1,                                  
    //         $Lanes: 1,                                  
    //         $SpacingX: 10,                              
    //         $SpacingY: 10,                              
    //         $Orientation: 1                             
    //     }
    // };

    // var jssor_slider1 = new $JssorSlider$("slider1_container", options);

    $( ".tabs" ).tabs({
        active: 0
    });

    $("#b-categories li").click(function(){
        if( !$(this).hasClass("more") ) {
            var cat = $(this).attr("data-cat");

            $("#b-categories li.active").removeClass("active");
            $(this).addClass("active");

            $("#b-catalog-list>li").hide();
            $("#b-catalog-list>li."+cat).fadeIn(300);
        }
        return false;
    });

    customHandlers["popup"] = function(el){
        $(".b-popup h2").text(el.parents(".example-page").find(".buy").attr("data-value"));
        $(".b-buy-butt").attr("data-value",el.parents(".example-page").find(".buy").attr("data-value")).attr("data-name","Шаблон");

        var $cont = el.parents(".example-page");

        $(".b-popup").find(".b-asd").prop('checked', false);

        $cont.find("input:checked").each(function(){
            $(".b-popup").find("#"+$(this).attr("data-id")).prop('checked', true);
        });
    };

    customHandlers["popup-buy"] = function(el){
        var $cont = el.parents(".example-page"),
            string = [];

        $cont.find("input:checked").each(function(){
            string.push($(this).val());
        });

        $(".b-kit-input").val(string.join(", "));
    };

    customHandlers["popup-buy-1"] = function(el){
        var $cont = el.parents("form"),
            string = [];

            alert();

        $cont.find(".b-asd:checked").each(function(){
            string.push($(this).val());
        });

        $(".b-kit-input").val(string.join(", "));
    };

    $(".category-checkbox").change(function(){
        if($(this).parent().hasClass("active")) {
            $(this).parent().removeClass("active");
        } else $(this).parent().addClass("active");
    });
});