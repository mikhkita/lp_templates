function getNextField($form){
	var j = 1;
	while( $form.find("input[name="+j+"]").length ){
		j++;
	}
	return j;
}

function getInternetExplorerVersion()
{
    var rv = -1;
    if (navigator.appName == 'Microsoft Internet Explorer')
    {
        var ua = navigator.userAgent;
        var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null)
            rv = parseFloat( RegExp.$1 );
    }
    else if (navigator.appName == 'Netscape')
    {
        var ua = navigator.userAgent;
        var re  = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null)
            rv = parseFloat( RegExp.$1 );
    }
    return rv;
}

function fancyOpen(el){
	var ie='\v'=='v';
    $.fancybox(el,{
        scrolling: 'no',
        afterShow: function(){
        	setTimeout(function(){
        		$.fancybox.update();
        	},300);
        },
        onUpdate:function(){
        	$('.fancybox-wrap').css({
                'position':'absolute'
            });
            // setTimeout(function(){
                if( getInternetExplorerVersion() !== -1 ) 
                	$('.fancybox-wrap').css({
	                    'top':'0'
	                });
                $('.fancybox-inner').css('height','auto');
            // },200);
        },
        padding:0
    }); 
    $('html').addClass('fancybox-lock'); 
    $('.fancybox-overlay').html($('.fancybox-wrap')); 
    return false;
}

var customHandlers = [];

$(document).ready(function(){	
	var rePhone = /^\+\d \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
		tePhone = '+7 (999) 999-99-99';

	$.validator.addMethod('customPhone', function (value) {
		return rePhone.test(value);
	});

	$(".ajax").parents("form").each(function(){
		$(this).validate({
			rules: {
				email: 'email',
				phone: 'customPhone'
			}
		});
		if( $(this).find("input[name=phone]").length ){
			$(this).find("input[name=phone]").mask(tePhone,{placeholder:" "});
		}
	});

	function whenScroll(){
		var scroll = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
		if( customHandlers["onScroll"] ){
			customHandlers["onScroll"](scroll);
		}
	}
	$(window).scroll(whenScroll);
	whenScroll();

	$(".fancy").each(function(){
		var $popup = $($(this).attr("data-block")),
			$this = $(this);
		$this.fancybox({
			padding : 0,
			content : $popup,
			fitToView: false,
			tpl: {
				closeBtn : '<a title="Закрыть" class="fancybox-item fancybox-close popup-close" href="javascript:;"></a>'
			},
			helpers: {
	         	overlay: {
	            	locked: true 
	         	}
	      	},
			beforeShow: function(){
				$popup.find(".custom-field").remove();
				if( $this.attr("data-value") ){
					var name = getNextField($popup.find("form"));
					$popup.find("form").append("<input type='hidden' class='custom-field' name='"+name+"' value='"+$this.attr("data-value")+"'/><input type='hidden' class='custom-field' name='"+name+"-name' value='"+$this.attr("data-name")+"'/>");
				}
				if( $this.attr("data-beforeShow") && customHandlers[$this.attr("data-beforeShow")] ){
					customHandlers[$this.attr("data-beforeShow")]($this);
				}
			},
			afterShow: function(){
				if( $this.attr("data-afterShow") && customHandlers[$this.attr("data-afterShow")] ){
					customHandlers[$this.attr("data-afterShow")]($this);
				}
			},
			beforeClose: function(){
				if( $this.attr("data-beforeClose") && customHandlers[$this.attr("data-beforeClose")] ){
					customHandlers[$this.attr("data-beforeClose")]($this);
				}
			},
			afterClose: function(){
				if( $this.attr("data-afterClose") && customHandlers[$this.attr("data-afterClose")] ){
					customHandlers[$this.attr("data-afterClose")]($this);
				}
			}
		});
	});

	$(".b-go").click(function(){
		var block = $( $(this).attr("data-block") ),
			off = $(this).attr("data-offset")||0;
		$("body, html").animate({
			scrollTop : block.offset().top-off
		},800);
		return false;
	});

	$(".fancy-img").fancybox({
		padding : 0,
		fitToView: false,
		maxWidth: 1000
	});

	$(".ajax").parents("form").submit(function(){
  		if( $(this).find("input.error,select.error,textarea.error").length == 0 ){
  			var $this = $(this),
  				$thanks = $($this.attr("data-block"));

  			if( $this.attr("data-beforeAjax") && customHandlers[$this.attr("data-beforeAjax")] ){
				customHandlers[$this.attr("data-beforeAjax")]($this);
			}

  			$.ajax({
			  	type: $(this).attr("method"),
			  	url: $(this).attr("action"),
			  	data:  $this.serialize(),
				success: function(msg){
					var $form;
					if( msg == "1" ){
						$form = $thanks;
					}else{
						$form = $("#b-popup-error");
					}

					if( $this.attr("data-afterAjax") && customHandlers[$this.attr("data-afterAjax")] ){
						customHandlers[$this.attr("data-afterAjax")]($this);
					}

					$this.find("input[type=text],textarea").val("");
					$.fancybox.open({
						content : $form,
						padding : 0,
				        afterShow: function(){
				            setTimeout(function(){
				                $('.fancybox-wrap').css('position','absolute');
				                $('.fancybox-inner').css('height','auto');
				                $('html').addClass('fancybox-margin').addClass('fancybox-lock');
				                $('.fancybox-overlay').html($('.fancybox-wrap'));
				            },100);
				        }
					});	
				}
			});
  		}
  		return false;
  	});
});