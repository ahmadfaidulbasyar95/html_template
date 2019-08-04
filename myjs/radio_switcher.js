(function() {
	window.addEventListener('load', function() { 
		$('.radio_switcher').on('change', '[data-switch]', function(event) {
			var elem = $(this);
			var par  = elem.parents('.radio_switcher');
			par.find('[data-switch]:not(:checked)').each(function(index, el) {
				$($(this).data('switch')).fadeOut(50);
			});
			setTimeout(function() {
				$(par.find('[data-switch]:checked').data('switch')).fadeIn(50);
			}, 50);
		});
		$('.radio_switcher').each(function(index, el) {
			$(this).find('[data-switch]').first().trigger('change');
		});
	}, false);
})();