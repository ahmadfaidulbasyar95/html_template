_Bbc(function($){
		window.iframe_auto_height = function() {
			$('.iframe_auto_height').each(function(index, el) {
				var h1 = $(this).contents().find('html').height();
				var h2 = $(this).contents().find('body').height();
				var h = (h1 > h2) ? h1 : h2 ;
				$(this).height(h + 10);
			});
		};
		setInterval(function() {
			window.iframe_auto_height();
		}, 2000);
	});