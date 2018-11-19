_Bbc(function($){
		$('.carousel_multiple').each(function(index, el) {
			var item_show = 2;
			if (parseInt($(this).attr('item'))) { item_show = parseInt($(this).attr('item')) }
			if (parseInt($(this).attr('item_sm')) && $(window).width() <= 992) { item_show = parseInt($(this).attr('item_sm')) }
			if (parseInt($(this).attr('item_xs')) && $(window).width() <= 768) { item_show = parseInt($(this).attr('item_xs')) }
			if (item_show >= 2) 
			{
				var element = $(this);
				var carousel_multiple = [];
				var carousel_multiple_chunk = [];
				element.find('.item').each(function(index, el) {
					carousel_multiple.push($(this).html());
				});
				$.each(carousel_multiple, function(index, val) {
					if (carousel_multiple_chunk.length) 
					{
						var last_index = carousel_multiple_chunk.length - 1;
						if (carousel_multiple_chunk[last_index].length == item_show) 
						{
							carousel_multiple_chunk.push([val]);
						}else
						{
							carousel_multiple_chunk[last_index].push(val);
						}
					}else
					{
						carousel_multiple_chunk.push([val]);
					}
				});
				if (carousel_multiple_chunk) 
				{
					if (!element.hasClass('disable_duplicate')) 
					{
						var last_index = carousel_multiple_chunk.length - 1;
						if (carousel_multiple_chunk[last_index].length < item_show) 
						{
							var item_req_add = carousel_multiple_chunk[last_index].length;
							for (var i = 0; i < item_show - item_req_add; i++) {
								carousel_multiple_chunk[last_index].push(carousel_multiple[i]);
							}
						}
					}
					element.find('.carousel-indicators').find('li').each(function(index, el) {
						if (carousel_multiple_chunk.length <= index) 
						{
							$(this).remove();
						}
					});
					element.find('.item').each(function(index, el) {
						if (carousel_multiple_chunk.length > index) 
						{
							$(this).html(carousel_multiple_chunk[index]);
						}else
						{
							$(this).remove();
						}
					});
				}
			}
		});

	});