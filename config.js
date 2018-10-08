'use strict';

module.exports = {
	css: [
		'bootstrap-3.3/bootstrap.css', 
		// 'fonts/fontawesome-free-5.0.1.css', 
		// 'fonts/fontawesome-free-5.0.9.css', 
		'fonts/fontawesome-4.7.0.css', 
		'fonts/glyphicon-bootstrap-3.0.css', 
		// 'daterangepicker/daterangepicker.css', 
		// 'datatables-1.10.16/datatables.css', 
		// 'print.js-1.0.37/print.min.css', 
		// 'css/template.css', 
	],
	js: [
		'jquery-3.3.1/jquery-3.3.1.js', 
		'bootstrap-3.3/bootstrap.js', // jquery
		// 'datatables-1.10.16/datatables.js', // jquery
		// 'print.js-1.0.37/print.min.js', 
		// 'moment.js-2.22/moment.js', 
		// 'daterangepicker/daterangepicker.js', // jquery, moment, bootstrap
		// 'js/template.js', 
	],
	source: __dirname+"/", // menentukan doc_root yang akan di compress jika dinamis isikan saja __dirname+"/"
	dest: {
		path: __dirname+ "/template_name/", // menentukan path tujuan
		css: "style_def.css", // menentukan nama hasil compress dari semua css dan scss
		js: "script_def.js" // menentukan nama hasil compress dari semua file js
	},
	jscompress : 2, // 1=uglify, 2=packer
	watch : 1 // 1=recompile when changes, 0=compile only
}