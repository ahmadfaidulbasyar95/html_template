_Bbc(function($){
		var header_auto_fixed_active = 1;
		if ($('.header_auto_fixed').hasClass('disable_mobile')) 
		{
			if ($(window).width() <= 768) 
			{
				header_auto_fixed_active = 0;
			}
		}
		if (header_auto_fixed_active) 
		{
			setTimeout(function() {
				if ($('.header_auto_fixed').hasClass('disable_add_block')) {}else
				{
					$('<div class="header_auto_fixed_box"></div>').insertAfter('.header_auto_fixed');
					$('.header_auto_fixed_box').height($('.header_auto_fixed').outerHeight(true));
				}
				$('.header_auto_fixed').css({
					'position': 'fixed',
					'z-index':  '1049',
					'width':    '100%'
				});
				var current_height = [];
				var hide_speed = [];
				var min_height = [];
				var height_auto = [];
				var set_opacity = [];
				var enebled = [];
				$('.header_auto_fixed_hide').each(function(index, el) {
					hide_speed[index] = 1;
					if ($(this).attr('hide_speed')) 
					{
						if (parseFloat($(this).attr('hide_speed'))) {
							hide_speed[index] = parseFloat($(this).attr('hide_speed'));
						}
					}
					enebled[index] = 1;
					if ($(this).hasClass('disable_mobile')) 
					{
						if ($(window).width() <= 768) 
						{
							enebled[index] = 0;
						}
					}
					current_height[index] = $(this).height();
					if ($(this).hasClass('disable_opacity'))
					{
						set_opacity[index] = 0;
					}else
					{
						set_opacity[index] = 1;
					}
					if ($(this).attr('min_height'))
					{
						min_height[index] = parseFloat($(this).attr('min_height'));
						if ($(this).attr('min_height').indexOf('%') != -1) 
						{
							min_height[index] = (min_height[index] / 100) * current_height[index];
						}
					}else
					{
						min_height[index] = 0;
					}
					if ($(this).hasClass('set_height_auto'))
					{
						height_auto[index] = 1;
					}else
					{
						height_auto[index] = 0;
					}
				});
				if ($('.header_auto_fixed').hasClass('force_fixed')) { $('.header_auto_fixed').addClass('fixed'); }
				var window_scroll = $(window).scrollTop();
				$(window).scroll(function(event) {
					window_scroll = $(window).scrollTop();
					if (window_scroll == 0) 
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
					window_scroll = window_scroll / 10;
					$('.header_auto_fixed_hide').each(function(index, el) {
						if (enebled[index]) 
						{
							if (window_scroll <= 1) 
							{
								$(this).css('overflow', 'visible');
							}else
							{
								$(this).css('overflow', 'hidden');
							}
							if (window_scroll == 0) 
							{
								if (height_auto[index]) 
								{
									$(this).css('height', 'auto');
								}else
								{
									$(this).css('height', '100%');
								}
							}else
							{
								if (current_height[index] - window_scroll >= min_height[index]) 
								{
									$(this).height(current_height[index] - window_scroll * hide_speed[index]);
								}else
								{
									$(this).height(min_height[index]);
								}
							}
							if (set_opacity[index]) 
							{
								$(this).css('opacity', $(this).height() / current_height[index]);
							}
						}
					});
				});
			}, 200);
		}

	});