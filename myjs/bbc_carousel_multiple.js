_Bbc(function($){
		$('.bbc_carousel_multiple').each(function(index, el) {
			var item_show = 2;
			if (parseInt($(this).attr('item'))) { item_show = parseInt($(this).attr('item')) }
			if (parseInt($(this).attr('item_sm')) && $(window).width() <= 992) { item_show = parseInt($(this).attr('item_sm')) }
			if (parseInt($(this).attr('item_xs')) && $(window).width() <= 768) { item_show = parseInt($(this).attr('item_xs')) }
			if (item_show >= 2) 
			{
				var element = $(this);
				var bbc_carousel_multiple = [];
				var bbc_carousel_multiple_chunk = [];
				element.find('.item').each(function(index, el) {
					bbc_carousel_multiple.push($(this).html());
				});
				$.each(bbc_carousel_multiple, function(index, val) {
					if (bbc_carousel_multiple_chunk.length) 
					{
						var last_index = bbc_carousel_multiple_chunk.length - 1;
						if (bbc_carousel_multiple_chunk[last_index].length == item_show) 
						{
							bbc_carousel_multiple_chunk.push([val]);
						}else
						{
							bbc_carousel_multiple_chunk[last_index].push(val);
						}
					}else
					{
						bbc_carousel_multiple_chunk.push([val]);
					}
				});
				if (bbc_carousel_multiple_chunk) 
				{
					if (!element.hasClass('disable_duplicate')) 
					{
						var last_index = bbc_carousel_multiple_chunk.length - 1;
						if (bbc_carousel_multiple_chunk[last_index].length < item_show) 
						{
							var item_req_add = bbc_carousel_multiple_chunk[last_index].length;
							for (var i = 0; i < item_show - item_req_add; i++) {
								bbc_carousel_multiple_chunk[last_index].push(bbc_carousel_multiple[i]);
							}
						}
					}
					element.find('.carousel-indicators').find('li').each(function(index, el) {
						if (bbc_carousel_multiple_chunk.length <= index) 
						{
							$(this).remove();
						}
					});
					element.find('.item').each(function(index, el) {
						if (bbc_carousel_multiple_chunk.length > index) 
						{
							$(this).html(bbc_carousel_multiple_chunk[index]);
						}else
						{
							$(this).remove();
						}
					});
				}
			}
		});

	});