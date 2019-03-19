$(document).ready(function() {
	window.ratio = function(s) {
		if(s == undefined) s = 'body';
		$(s).find('[ratio]').each(function(index, el) {
			var ratio = $(this).attr('ratio').split(':');
			if (ratio.length == 2) {
				ratio[0] = parseFloat(ratio[0]);
				ratio[1] = parseFloat(ratio[1]);
				$(this).addClass('ratio');
				$(this).wrap('<div class="ratio_wrap" style="padding-top:'+100/ratio[0]*ratio[1]+'%"></div>');
			}
		});
	}
	$('body').append('<style type="text/css"> .ratio_wrap {width: 100%; position: relative; } .ratio {position: absolute; top: 0; left: 0; bottom: 0; right: 0; width: 100%; height: 100%;} </style>');
	window.ratio();
});