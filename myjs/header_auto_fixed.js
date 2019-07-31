(function() {
	window.addEventListener('load', function() { 
		window.header_auto_fixed = function() {
			window.header_auto_fixed_active = 1;
			if ($('.header_auto_fixed').hasClass('disable_mobile')) 
			{
				if ($(window).width() <= 768) 
				{
					window.header_auto_fixed_active = 0;
				}
			}
			if (window.header_auto_fixed_active) 
			{
				setTimeout(function() {
					if (!$('.header_auto_fixed').hasClass('disable_add_block'))
					{
						if ($('.header_auto_fixed_box').length==0) {
							$('<div class="header_auto_fixed_box"></div>').insertAfter('.header_auto_fixed');
						}
						$('.header_auto_fixed_box').height($('.header_auto_fixed').outerHeight(true));
					}
					$('.header_auto_fixed').css({
						'position': 'fixed',
						'z-index':  '1049',
						'width':    '100%'
					});
					window.haf_current_height = [];
					window.haf_hide_speed = [];
					window.haf_min_height = [];
					window.haf_height_auto = [];
					window.haf_set_opacity = [];
					window.haf_enebled = [];
					window.haf_hide_down_offset = [];
					$('.header_auto_fixed_hide_down').each(function(index, el) {
						window.haf_hide_down_offset[index] = 0;
						if ($(this).attr('offset')) {
							if (parseFloat($(this).attr('offset'))) {
								window.haf_hide_down_offset[index] = parseFloat($(this).attr('offset'));
							}
						}
					});
					$('.header_auto_fixed_hide').each(function(index, el) {
						window.haf_hide_speed[index] = 1;
						if ($(this).attr('hide_speed')) 
						{
							if (parseFloat($(this).attr('hide_speed'))) {
								window.haf_hide_speed[index] = parseFloat($(this).attr('hide_speed'));
							}
						}
						window.haf_enebled[index] = 1;
						if ($(this).hasClass('disable_mobile')) 
						{
							if ($(window).width() <= 768) 
							{
								window.haf_enebled[index] = 0;
							}
						}
						window.haf_current_height[index] = $(this).height();
						if ($(this).hasClass('disable_opacity'))
						{
							window.haf_set_opacity[index] = 0;
						}else
						{
							window.haf_set_opacity[index] = 1;
						}
						if ($(this).attr('min_height'))
						{
							window.haf_min_height[index] = parseFloat($(this).attr('min_height'));
							if ($(this).attr('min_height').indexOf('%') != -1) 
							{
								window.haf_min_height[index] = (window.haf_min_height[index] / 100) * window.haf_current_height[index];
							}
						}else
						{
							window.haf_min_height[index] = 0;
						}
						if ($(this).hasClass('set_height_auto'))
						{
							window.haf_height_auto[index] = 1;
						}else
						{
							window.haf_height_auto[index] = 0;
						}
					});
					if ($('.header_auto_fixed').hasClass('force_fixed')) { $('.header_auto_fixed').addClass('fixed'); }
					window.haf_window_scroll           = $(window).scrollTop();
					window.haf_window_scroll_prev      = window.haf_window_scroll;
					window.haf_window_scroll_direction = 1;
				}, 200);
			}
		}
		window.haf_header_auto_fixed_scrollHandler = function(){
			window.haf_window_scroll           = $(window).scrollTop();
			window.haf_window_scroll_direction = (window.haf_window_scroll > window.haf_window_scroll_prev) ? 1 : 2;
			if (window.haf_window_scroll_direction==1) {
				$('.header_auto_fixed').addClass('scrolling_down').removeClass('scrolling_up'); 
				$('.header_auto_fixed_hide_down').each(function(index, el) {
					if (window.haf_window_scroll >= window.haf_hide_down_offset) {
						if (!$(this).hasClass('onhide')) {
							$(this).addClass('onhide').removeClass('onshow');
							$(this).fadeOut(200);
						}
					}
				});
			}else{
				$('.header_auto_fixed').addClass('scrolling_up').removeClass('scrolling_down'); 
				$('.header_auto_fixed_hide_down').each(function(index, el) {
					if (!$(this).hasClass('onshow')) {
						$(this).addClass('onshow').removeClass('onhide');
						$(this).fadeIn(200);
					}
				});
			}
			window.haf_window_scroll_prev = window.haf_window_scroll;
			if (window.haf_window_scroll == 0) 
			{
				if ($('.header_auto_fixed').hasClass('force_fixed')) 
				{ 
					$('.header_auto_fixed').addClass('fixed'); 
				}else
				{
					$('.header_auto_fixed').removeClass('fixed');
				}
			}else
			{
				$('.header_auto_fixed').addClass('fixed');
			}
			window.haf_window_scroll = window.haf_window_scroll / 10;
			$('.header_auto_fixed_hide').each(function(index, el) {
				if (window.haf_enebled[index]) 
				{
					if (window.haf_window_scroll <= 1) 
					{
						$(this).css('overflow', 'visible');
					}else
					{
						$(this).css('overflow', 'hidden');
					}
					if (window.haf_window_scroll == 0) 
					{
						if (window.haf_height_auto[index]) 
						{
							$(this).css('height', 'auto');
						}else
						{
							$(this).css('height', '100%');
						}
					}else
					{
						if (window.haf_current_height[index] - window.haf_window_scroll >= window.haf_min_height[index]) 
						{
							$(this).height(window.haf_current_height[index] - window.haf_window_scroll * window.haf_hide_speed[index]);
						}else
						{
							$(this).height(window.haf_min_height[index]);
						}
					}
					if (window.haf_set_opacity[index]) 
					{
						$(this).css('opacity', $(this).height() / window.haf_current_height[index]);
					}
				}
			});
		}

		window.header_auto_fixed();
		setTimeout(function() {
			$(window).scroll(window.haf_header_auto_fixed_scrollHandler);
			$('body').on('click', '.header_auto_fixed_update', function(event) {
				setTimeout(function() {
					window.header_auto_fixed();
				}, 1000);
			});
		}, 200);
	}, false);
})();