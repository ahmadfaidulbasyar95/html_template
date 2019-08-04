(function() {
	window.addEventListener('load', function() { 
		window.scroll_to = function(selector,add_offset) {
			if (selector) {
				if (add_offset == undefined) add_offset = 0;
				if ($(selector).length) {
					$('html, body').animate({scrollTop: $(selector).offset().top - add_offset}, $('body').height() / 3 , 'linear');
				}else {
					window.location.href = _URL+selector;
				}
			}
		}
		window.scroll_click = function(selector) {
			if (selector) {
				$('body').on('click', selector, function(event) {
					var t_selector = '';
					if ($(this).data('selector')) t_selector = $(this).data('selector');
					else if ($(this).attr('href')) t_selector = $(this).attr('href');
					window.scroll_to(t_selector,$(this).data('offset'));
				});
			}
		}
		window.scroll_menu = function(selector,s_par_active) {
			if (selector) {
				$(window).scroll(function(event) {
					if($(selector).length) {
						if (s_par_active) {
							$(selector).parents(s_par_active).removeClass('active');
						}else{
							$(selector).removeClass('active');
						}
						$(selector).each(function(index, el) {
							var t_selector = '';
							if ($(this).data('selector')) t_selector = $(this).data('selector');
							else if ($(this).attr('href')) t_selector = $(this).attr('href');
							if($(t_selector).length){
								var add_offset = ($(this).data('offset')) ? $(this).data('offset') : 0;
								if ($(t_selector).offset().top - add_offset <= $(window).scrollTop() && $(t_selector).offset().top + $(t_selector).outerHeight() - add_offset >= $(window).scrollTop()) {
									if (s_par_active) {
										$(this).parents(s_par_active).addClass('active');
									}else {
										$(this).addClass('active');
									}
								}
							}
						});
					}
				});
			}
		}
		if (window.location.hash) {
			if ($(window.location.hash).length) {
				setTimeout(function() {
					var add_offset = 0;
					if($('[data-selector="'+window.location.hash+'"]').length) add_offset = $('[data-selector="'+window.location.hash+'"]').data('offset');
					if($('[href="'+window.location.hash+'"]').length) add_offset = $('[href="'+window.location.hash+'"]').data('offset');
					window.scroll_to(window.location.hash,add_offset);
				}, 500);
			}
		}
		window.scroll_click('.scroll_to_menu');
		window.scroll_menu('.scroll_to_menu','li');
	}, false);
})();