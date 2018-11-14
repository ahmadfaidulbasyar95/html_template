_Bbc(function($){
		var bbc_header_fixed_active = 1;
		if ($('.bbc_header_fixed').hasClass('disable_mobile')) 
		{
			if ($(window).width() <= 768) 
			{
				bbc_header_fixed_active = 0;
			}
		}
		if (bbc_header_fixed_active) 
		{
			setTimeout(function() {
				if ($('.bbc_header_fixed').hasClass('disable_add_block')) {}else
				{
					$('<div class="bbc_header_fixed_box"></div>').insertAfter('.bbc_header_fixed');
					$('.bbc_header_fixed_box').height($('.bbc_header_fixed').outerHeight(true));
				}
				$('.bbc_header_fixed').css({
					'position': 'fixed',
					'z-index':  '1049',
					'width':    '100%'
				});
				var current_height = [];
				var min_height = [];
				var height_auto = [];
				var set_opacity = [];
				var enebled = [];
				$('.bbc_header_fixed_hide').each(function(index, el) {

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
				if ($('.bbc_header_fixed').hasClass('force_fixed')) { $('.bbc_header_fixed').addClass('fixed'); }
				var window_scroll = $(window).scrollTop();
				$(window).scroll(function(event) {
					window_scroll = $(window).scrollTop();
					if (window_scroll == 0) 
					{
						if ($('.bbc_header_fixed').hasClass('force_fixed')) 
						{ 
							$('.bbc_header_fixed').addClass('fixed'); 
						}else
						{
							$('.bbc_header_fixed').removeClass('fixed');
						}
					}else
					{
						$('.bbc_header_fixed').addClass('fixed');
					}
					window_scroll = window_scroll / 10;
					$('.bbc_header_fixed_hide').each(function(index, el) {
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
									$(this).height(current_height[index] - window_scroll);
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