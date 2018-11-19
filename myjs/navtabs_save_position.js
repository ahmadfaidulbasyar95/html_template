_Bbc(function($){
		window.navtabs_save_position = function() {
			$('.navtabs_save_position').each(function(index, el) {
				var tab_name = $(this).data('tab_name');
				if(!tab_name) tab_name = 'navtabs_save_position';
				if (tab_name) 
				{
					var cur_tab = localStorage.getItem(tab_name);
					if (cur_tab) 
					{
						$(this).find('[aria-controls="'+cur_tab+'"]').trigger('click');
					}
				}
			});
		};
		setTimeout(function() {
			window.navtabs_save_position();
		}, 2000);
		$('body').on('click', '.navtabs_save_position a', function(event) {
			var tab_name = $(this).parents('.navtabs_save_position').data('tab_name');
			if(!tab_name) tab_name = 'navtabs_save_position';
			if (tab_name) 
			{
				localStorage.setItem(tab_name,$(this).attr('aria-controls'));
			}
		});
	});