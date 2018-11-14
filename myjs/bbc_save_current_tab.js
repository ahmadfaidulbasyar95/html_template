_Bbc(function($){
		window.bbc_save_current_tab = function() {
			$('.bbc_save_current_tab').each(function(index, el) {
				var tab_name = $(this).data('tab_name');
				if(!tab_name) tab_name = 'bbc_save_current_tab';
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
			window.bbc_save_current_tab();
		}, 2000);
		$('body').on('click', '.bbc_save_current_tab a', function(event) {
			var tab_name = $(this).parents('.bbc_save_current_tab').data('tab_name');
			if(!tab_name) tab_name = 'bbc_save_current_tab';
			if (tab_name) 
			{
				localStorage.setItem(tab_name,$(this).attr('aria-controls'));
			}
		});
	});