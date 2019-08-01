(function() {
	window.addEventListener('load', function() { 
		
		window.select_autocomplete = function(element,index) 
		{
			if (!element.hasClass('loaded'))
			{
				element.addClass('ac_'+index).addClass('loaded').attr('data-index', index);

				var max_item           = element.data('max_item');
				var max_item_show      = element.data('max_item_show');
				if(!max_item) max_item = 10;
				if(max_item_show==undefined) max_item_show = 3000;

				var delay        = $(this).data('delay');
				if(!delay) delay = 400;

				var required    = (element.attr('required')) ? 'required="required"' : '';
				var placeholder = (element.attr('placeholder')) ? 'placeholder="'+element.attr('placeholder')+'"' : '';
				
				$('<div class="select_autocomplete_results ac_'+index+'" data-index="'+index+'" style="position: absolute; display: none;"> <input type="text" '+required+' '+placeholder+' class="'+element.attr('class').replace('select_autocomplete','').replace('loaded','')+' select_autocomplete_filter" data-max_item="'+max_item+'" data-max_item_show="'+max_item_show+'" data-delay="'+delay+'" data-index="'+index+'" > <div class="list-group item_group" style="display: none;"> </div> </div>').insertAfter(element);

				element.find('optgroup').each(function(idx, el) {
					$(this).data('id', idx+1);
				});

				element.find('optgroup option').each(function(idx, el) {
					var label_parent = $(this).parent('optgroup');
					var label        = label_parent.attr('label');

					if (label) {
						$(this).data('label_group', '<h5 class="text-center"><b>'+label+'</b></h5>');
					}else{
						$(this).data('label_group', '<br>');
					}
					$(this).data('label_group_id', label_parent.data('id'));
				});

				element.trigger('change');
			}
		}

		$('body').on('click focusin', '.select_autocomplete', function(event) {
			event.preventDefault();
			var index = $(this).data('index');
			$('.select_autocomplete_results.ac_'+index).fadeIn(1);
			setTimeout(function() {
				$('.select_autocomplete_filter.ac_'+index).focus();
				if ($('.select_autocomplete_results.ac_'+index+' .item_group a.item').length >= 1) 
				{
					$('.select_autocomplete_results.ac_'+index+' .item_group').fadeIn(100);
				}else {
					setTimeout(function() {
						$('.select_autocomplete_filter.ac_'+index).trigger('keyup');
					}, 500);
				}
			}, 2);
		});

		$('body').append('<style type="text/css"> .select_autocomplete optgroup , .select_autocomplete option {display: none; } </style>');

		$('body').on('change', '.select_autocomplete', function(event) {
			var index = $(this).data('index');

			$('.select_autocomplete_filter.ac_'+index).blur();

			if ($(this).data('callback')) 
			{
				window[$(this).data('callback')]($(this));
			}
		});

		$('body').on('mouseenter', '.select_autocomplete_results .item_group .item', function(event) {
			$(this).addClass('active').siblings('.item').removeClass('active');
		});

		$('body').on('keydown', '.select_autocomplete_filter', function(event) {
			var result = $('.select_autocomplete_results.ac_'+$(this).data('index'));

			if (result.find('a.item').length >= 1) 
			{
				if (event.which==13) 
				{
					event.preventDefault();
					result.find('a.item.active').trigger('click');
				}else
				if (event.which==38) 
				{
					if (result.find('a.item.active').prev('a.item').length >= 1) 
					{
						event.preventDefault();
						result.find('a.item.active').removeClass('active').prev('a.item').addClass('active');
					}else
					if (result.find('a.item.active').prev('br,h5').prev('a.item').length >= 1) 
					{
						event.preventDefault();
						result.find('a.item.active').removeClass('active').prev('br,h5').prev('a.item').addClass('active');
					}
				}else
				if (event.which==40) 
				{
					if (result.find('a.item.active').next('a.item').length >= 1) 
					{
						event.preventDefault();
						result.find('a.item.active').removeClass('active').next('a.item').addClass('active');
					}else
					if (result.find('a.item.active').next('br,h5').next('a.item').length >= 1) 
					{
						event.preventDefault();
						result.find('a.item.active').removeClass('active').next('br,h5').next('a.item').addClass('active');
					}
				}
			}
		});

		var select_autocomplete_delay ;
		$('body').on('keyup', '.select_autocomplete_filter', function(event) {
			var element = $(this);
			var value   = element.val();

			clearTimeout(select_autocomplete_delay);

			select_autocomplete_delay = setTimeout(function() {
				if (element.data('last_input') != value) 
				{
					var max_item          = element.data('max_item');
					var max_item_show     = element.data('max_item_show');
					var index             = element.data('index');
					var found             = 0;
					var data_item         = '';
					var label_parent_show = [];

					element.data('last_input', value);
					
					$('.select_autocomplete.ac_'+index+' option').filter(function(idx) {
						var r = false;
						if (value && found < max_item || !value && found < max_item_show) 
						{
							r = ($(this).html().toLowerCase().search(value.toLowerCase()) != -1 && $(this).attr('value')) ? true : false;
							if (r) 
							{
								found += 1;
							}
						}
						return r;
					}).each(function(idx, el) {
						var active    = (idx == 0) ? 'active' : '';
						var item_html = $(this).html();
						if ($('.select_autocomplete.ac_'+index).data('display_function')) {
							item_html = window[$('.select_autocomplete.ac_'+index).data('display_function')](item_html);
						}
						if ($(this).data('label_group_id') && $(this).data('label_group')) {
							if ($.inArray($(this).data('label_group_id'), label_parent_show)==-1) {
								data_item += $(this).data('label_group');
								label_parent_show.push($(this).data('label_group_id'));
							}
						}
						data_item += '<a href="#" class="list-group-item item '+active+'" value="'+$(this).attr('value')+'">'+item_html+'</a>';
					});

					if (found == 0) 
					{
						$('.select_autocomplete_results.ac_'+index+' .item_group').fadeOut(200);
						setTimeout(function() {
							$('.select_autocomplete_results.ac_'+index+' .item_group').html(data_item);
						}, 300);
					}else
					{
						$('.select_autocomplete_results.ac_'+index+' .item_group').html(data_item);
						$('.select_autocomplete_results.ac_'+index+' .item_group').fadeIn(200);
					}
				}
			}, element.data('delay'));
		});

		$('body').on('click', '.select_autocomplete_results a.item', function(event) {
			event.preventDefault();
			var index = $(this).parents('.select_autocomplete_results').data('index');
			if (!$(this).hasClass('active')) 
			{
				$(this).parents('.select_autocomplete_results').find('a.item.active').removeClass('active');
				$(this).addClass('active');
			}
			$('.select_autocomplete_filter.ac_'+index).data('last_input', $(this).html());
			$('.select_autocomplete.ac_'+index).val($(this).attr('value')).trigger('change');
		});

		$('body').on('focusout', '.select_autocomplete_filter', function(event) {
			var index = $(this).data('index');

			if ($('.select_autocomplete.ac_'+index).val()) 
			{
				$(this).val($('.select_autocomplete.ac_'+index).find('option[value="'+$('.select_autocomplete.ac_'+index).val()+'"]').html());
			}else
			{
				$(this).val('');
			}

			setTimeout(function() {
				$('.select_autocomplete_results.ac_'+index+' .item_group').fadeOut(500);
				$('.select_autocomplete_results.ac_'+index).fadeOut(500);
			}, 200);
		});

		$('.select_autocomplete').each(function(index, el) {
			window.select_autocomplete($(this),index);
		});

	}, false);
})();