_Bbc(function($){

		window.bbc_select_ac = function(element,index) 
		{
			if (!element.hasClass('loaded'))
			{
				element.addClass('ac_'+index).addClass('loaded').attr('data-index', index);

				var max_item           = $(this).data('max_item');
				if(!max_item) max_item = 10;

				var delay        = $(this).data('delay');
				if(!delay) delay = 400;

				var required    = (element.attr('required')) ? 'required="required"' : '';
				var placeholder = (element.attr('placeholder')) ? 'placeholder="'+element.attr('placeholder')+'"' : '';
				
				$('<div class="bbc_select_ac_results ac_'+index+'" data-index="'+index+'" style="position: absolute; display: none;"> <input type="text" '+required+' '+placeholder+' class="'+element.attr('class').replace('bbc_select_ac','').replace('loaded','')+' bbc_select_ac_filter" data-max_item="'+max_item+'" data-delay="'+delay+'" data-index="'+index+'" > <div class="list-group item_group" style="display: none;"> </div> </div>').insertAfter(element);

				element.find('option').data('label_group', '');

				element.find('optgroup option:first-child()').each(function(index, el) {
					var label = $(this).parent('optgroup').attr('label');

					if (label) {
						$(this).data('label_group', '<h5 class="text-center"><b>'+label+'</b></h5>');
					}else{
						$(this).data('label_group', '<br>');
					}
				});

				element.trigger('change');
			}
		}

		$('body').on('click', '.bbc_select_ac', function(event) {
			var index = $(this).data('index');
			$('.bbc_select_ac_results.ac_'+index).fadeIn(1);
			setTimeout(function() {
				$('.bbc_select_ac_filter.ac_'+index).focus();
				if ($('.bbc_select_ac_results.ac_'+index+' .item_group a.item').length >= 1) 
				{
					$('.bbc_select_ac_results.ac_'+index+' .item_group').fadeIn(100);
				}else {
					setTimeout(function() {
						$('.bbc_select_ac_filter.ac_'+index).trigger('keyup');
					}, 500);
				}
			}, 2);
		});

		$('body').append('<style type="text/css"> .bbc_select_ac optgroup , .bbc_select_ac option {display: none; } </style>');

		$('body').on('change', '.bbc_select_ac', function(event) {
			var index = $(this).data('index');

			$('.bbc_select_ac_filter.ac_'+index).blur();

			if ($(this).data('callback')) 
			{
				window[$(this).data('callback')]($(this));
			}
		});

		$('body').on('mouseenter', '.bbc_select_ac_results .item_group .item', function(event) {
			$(this).addClass('active').siblings('.item').removeClass('active');
		});

		$('body').on('keydown', '.bbc_select_ac_filter', function(event) {
			var result = $('.bbc_select_ac_results.ac_'+$(this).data('index'));

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

		var bbc_select_ac_delay ;
		$('body').on('keyup', '.bbc_select_ac_filter', function(event) {
			var element = $(this);
			var value   = element.val();

			clearTimeout(bbc_select_ac_delay);

			bbc_select_ac_delay = setTimeout(function() {
				if (element.data('last_input') != value) 
				{
					var max_item  = element.data('max_item');
					var index     = element.data('index');
					var found     = 0;
					var data_item = '';

					element.data('last_input', value);
					
					$('.bbc_select_ac.ac_'+index+' option').filter(function(idx) {
						var r = false;
						if (found < max_item || !value && found < 3000) 
						{
							r = ($(this).html().toLowerCase().search(value.toLowerCase()) != -1 && $(this).attr('value')) ? true : false;
							if (r) 
							{
								found += 1;
							}
						}
						return r;
					}).each(function(idx, el) {
						var active = (idx==0) ? 'active' : '';
						data_item += $(this).data('label_group');
						data_item += '<a href="#" class="list-group-item item '+active+'" value="'+$(this).attr('value')+'">'+$(this).html()+'</a>';
					});

					if (found == 0) 
					{
						$('.bbc_select_ac_results.ac_'+index+' .item_group').fadeOut(200);
						setTimeout(function() {
							$('.bbc_select_ac_results.ac_'+index+' .item_group').html(data_item);
						}, 300);
					}else
					{
						$('.bbc_select_ac_results.ac_'+index+' .item_group').html(data_item);
						$('.bbc_select_ac_results.ac_'+index+' .item_group').fadeIn(200);
					}
				}
			}, element.data('delay'));
		});

		$('body').on('click', '.bbc_select_ac_results a.item', function(event) {
			event.preventDefault();
			var index = $(this).parents('.bbc_select_ac_results').data('index');
			if (!$(this).hasClass('active')) 
			{
				$(this).parents('.bbc_select_ac_results').find('a.item.active').removeClass('active');
				$(this).addClass('active');
			}
			$('.bbc_select_ac_filter.ac_'+index).data('last_input', $(this).html());
			$('.bbc_select_ac.ac_'+index).val($(this).attr('value')).trigger('change');
		});

		$('body').on('focusout', '.bbc_select_ac_filter', function(event) {
			var index = $(this).data('index');

			if ($('.bbc_select_ac.ac_'+index).val()) 
			{
				$(this).val($('.bbc_select_ac.ac_'+index).find('option[value="'+$('.bbc_select_ac.ac_'+index).val()+'"]').html());
			}else
			{
				$(this).val('');
			}

			setTimeout(function() {
				$('.bbc_select_ac_results.ac_'+index+' .item_group').fadeOut(500);
				$('.bbc_select_ac_results.ac_'+index).fadeOut(500);
			}, 200);
		});

		$('.bbc_select_ac').each(function(index, el) {
			window.bbc_select_ac($(this),index);
		});
	});