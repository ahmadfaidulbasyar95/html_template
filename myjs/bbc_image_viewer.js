_Bbc(function($){

		$('body').append(''+
			'<div class="modal fade" id="bbc_image_viewer" style="overflow: hidden;">'+
				'<button type="button" class="close" data-dismiss="modal" aria-hidden="true" style="padding: 10px; position: fixed;right: 0;">X</button>'+
				'<div style="margin: 10vh 10%; position: fixed; width: 80%; height: 80vh;">'+
					'<img src="" class="image" style="width: 100%; height: 100%; object-fit: contain; position: relative;">'+
				'</div>'+
				'<div style="position: fixed; bottom: 0; right: 0; padding: 10px">'+
					'<i class="btn fa fa-plus fa-2x"></i>'+
					'<br>'+
					'<i class="btn fa fa-minus fa-2x"></i>'+
				'</div>'+
			'</div>'+
			'');

		$('body').on('click', '.bbc_image_viewer', function(event) {
			$('#bbc_image_viewer').modal('show');
			$('#bbc_image_viewer .image').data('scale', '1').attr('src', $(this).attr('src')).removeClass('zoom').css({
				top:       '0',
				left:      '0',
				transform: 'scale(1)'
			});
		});

		$('body').on('mousedown touchstart', '#bbc_image_viewer .image', function(e) {
			if (e.type == 'mousedown') e.preventDefault();
			if (e.type == 'touchstart') e = e.originalEvent.touches[0];
			if (!$(this).hasClass('draggable')) 
			{
				$(this).css('transition', '0.1s');
				$(this).addClass('draggable');
				$(this).data('drg_h', $(this).outerHeight() );
				$(this).data('drg_w', $(this).outerWidth() );
				$(this).data('pos_y', $(this).offset().top + $(this).data('drg_h') - e.pageY );
				$(this).data('pos_x', $(this).offset().left + $(this).data('drg_w') - e.pageX );
			}
		});

		$('body').on('mouseup touchend', '#bbc_image_viewer .image', function(e) {
			if (e.type == 'mouseup') e.preventDefault();
			$(this).removeClass('draggable')
		});

		$('body').on('mousemove touchmove', '#bbc_image_viewer .image', function(e) {
			if (e.type == 'mousemove') e.preventDefault();
			if (e.type == 'touchmove') e = e.originalEvent.touches[0];
			if ($(this).hasClass('draggable')) 
			{
				$(this).offset({
					top:e.pageY + $(this).data('pos_y') - $(this).data('drg_h'),
					left:e.pageX + $(this).data('pos_x') - $(this).data('drg_w')
				})
			}
		});

		$('body').on('dblclick doubletap', '#bbc_image_viewer .image', function(e) {
			$(this).toggleClass('zoom');
			$(this).css('transition', '0.5s');
			if ($(this).hasClass('zoom')) 
			{
				$(this).data('scale', '1.6');
				$(this).css('transform', 'scale(1.6)');
			}else
			{
				$(this).data('scale', '1');
				$(this).css('transform', 'scale(1)');
			}
		});

		$('body').on('click', '#bbc_image_viewer .fa-plus', function(event) {
			var scale = parseFloat($('#bbc_image_viewer .image').data('scale')) + 0.1;
			$('#bbc_image_viewer .image').data('scale', scale).css('transform','scale('+scale+')').addClass('zoom');
		});

		$('body').on('click', '#bbc_image_viewer .fa-minus', function(event) {
			var scale = parseFloat($('#bbc_image_viewer .image').data('scale')) - 0.1;
			$('#bbc_image_viewer .image').data('scale', scale).css('transform','scale('+scale+')').addClass('zoom');
		});

	});