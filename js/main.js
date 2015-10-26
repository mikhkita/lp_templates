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
        $(".b-popup .maket-thumb").attr("src","images/"+el.parents(".example-page").find(".buy").attr("data-img")+"-thumb.jpg");
        $("#maket").attr("src","images/"+el.parents(".example-page").find(".buy").attr("data-img")+".jpg");
        $(".b-buy-butt").attr("data-value",el.parents(".example-page").find(".buy").attr("data-value")).attr("data-name","Шаблон");

        var $cont = el.parents(".example-page");

        $(".b-popup").find(".b-asd").prop('checked', false);

        $cont.find("input:checked").each(function(){
            $(".b-popup").find("#"+$(this).attr("data-id")).prop('checked', true);
        });
        $(".b-popup").find(".template-price").text($cont.find(".template-price").text());

    };

    customHandlers["popup-buy"] = function(el){
        var $cont = el.parents(".example-page"),
            string = [];

        $cont.find("input:checked").each(function(){
            string.push($(this).val());
        });

        $(".b-kit-input").val(string.join(", "));
        if($cont.hasClass("b8-sentence")) {
           $(".b-price-input").val($cont.find(".template-price").text()+"999"); 
        } else $(".b-price-input").val($cont.find(".template-price").text()+"000");
    };

    customHandlers["popup-buy-1"] = function(el){
        var $cont = el.parents("form"),
            string = [];

        $cont.find(".b-asd:checked").each(function(){
            string.push($(this).val());
        });

        $(".b-kit-input").val(string.join(", "));
        $(".b-price-input").val($cont.find(".template-price").text());
    };

    $(".category-checkbox,.category-checkbox1").change(function(){
        if($(this).parent().hasClass("active")) {
            $(this).parent().removeClass("active");
        } else $(this).parent().addClass("active");
    });


    $(".category-checkbox").change(function(){
        var $price = $(this).closest('.example-page').find(".template-price");
        if($(this).prop( "checked" )) {
            $price.text( ($price.text()*1)+($(this).attr("data-price")*1) ); 
        } else $price.text( ($price.text()*1)-($(this).attr("data-price")*1) ); 
    });

    $(".category-checkbox1").change(function(){
        var $full_price = $(this).closest('.example-page').find(".full-price");
        var $action_price = $(this).closest('.example-page').find(".template-price");
        if($(this).prop( "checked" )) {
            $full_price.text( ($full_price.text()*1)+($(this).attr("data-price")*1) ); 
        } else {
            $full_price.text( ($full_price.text()*1)-($(this).attr("data-price")*1) ); 
        }
        if($("input[data-check='kit']").prop("checked") && $("input[data-check='script']").prop("checked") && $("input[data-check='key']").prop("checked")) {$action_price.text(14); return false;}
        if( !$("input[data-check='kit']").prop("checked") && !$("input[data-check='script']").prop("checked") && !$("input[data-check='key']").prop("checked") ) {$action_price.text(9); return false;}
        if($("input[data-check='key']").prop("checked")) { $action_price.text(11); return false;}
        if($("input[data-check='key']").prop("checked") && $("input[data-check='script']").prop("checked") ) { $action_price.text(13); return false;}
        if($("input[data-check='kit']").prop("checked") && $("input[data-check='key']").prop("checked")) { $action_price.text(10); return false;}
        if($("input[data-check='kit']").prop("checked") && $("input[data-check='script']").prop("checked")) { $action_price.text(12); return false;}
        if($("input[data-check='kit']").prop("checked")) { $action_price.text(10); return false;}
        if($("input[data-check='script']").prop("checked")) { $action_price.text(11); return false;}
    });

    $(".b-asd").change(function() {
        var $price = $(this).closest("form").find(".template-price");
        if($(this).prop( "checked" )) {
            $price.text( ($price.text()*1)+($(this).attr("data-price")*1) ); 
        } else $price.text( ($price.text()*1)-($(this).attr("data-price")*1) );
    });

    $(".b-4 .b-block").slick({
        autoplay: true,
        dots: true,
        arrows: false,
        fade: true
    });

    $( "#accordion" ).accordion({
      collapsible: true,
      heightStyle:'content',
      active: false
    });


});