_Bbc(function($){	
		var FileUploaderProgress = function (file,d_url,s_progress,callback,i_name) {
			this.file            = file;
			this.url             = d_url;
			this.progress        = s_progress;
			this.callback        = callback;
			this.i_name          = i_name;
			window.file_uploader = this;
		};

		FileUploaderProgress.prototype.getType = function() {
			return this.file.type;
		};
		FileUploaderProgress.prototype.getSize = function() {
			return this.file.size;
		};
		FileUploaderProgress.prototype.getName = function() {
			return this.file.name;
		};
		FileUploaderProgress.prototype.doUpload = function () {
			var that     = this;
			var formData = new FormData();

			// add assoc key values, this will be posts values
			if (that.i_name) {
				formData.append(that.i_name, this.file, this.getName());
			}else{
				formData.append("file", this.file, this.getName());
			}

			$.ajax({
				type: "POST",
				url: that.url,
				xhr: function () {
					var myXhr = $.ajaxSettings.xhr();
					if (myXhr.upload) {
						myXhr.upload.addEventListener('progress', that.progressHandling, false);
					}
					return myXhr;
				},
				success: function (data) {
					if (that.callback) {
						window[that.callback](data);
					}
				},
				error: function (error) {
					// handle error
				},
				async: true,
				data: formData,
				cache: false,
				contentType: false,
				processData: false,
				timeout: 60000
			});
		};

		FileUploaderProgress.prototype.progressHandling = function (event) {
			var that = window.file_uploader;
			if (that.progress) 
			{
				var percent = 0;
				var position = event.loaded || event.position;
				var total = event.total;
				var progress_bar_id = that.progress;
				if (event.lengthComputable) {
					percent = Math.ceil(position / total * 100);
				}
				// update progressbars classes so it fits your code
				$(progress_bar_id + " .progress-bar").css("width", +percent + "%");
				$(progress_bar_id + " .status").text(percent + "%");
				if (percent == 100) 
				{
					$(progress_bar_id).addClass('success');
				}
			}
		};

		$('body').on('change', '.file_uploader', function(event) {
			var file       = $(this)[0].files[0];
			var d_url      = $(this).data('url');
			var s_progress = $(this).data('progress');
			var callback   = $(this).data('callback');
			var i_name       = $(this).attr('name');
			
			if (!d_url) d_url = window.location.href;

			if (s_progress) 
			{
				$(s_progress).html('<span class="status">0%</span><div class="progress-bar"></div>');
			}

	    var upload = new FileUploaderProgress(file,d_url,s_progress,callback,i_name);

	    // maby check size or type here with upload.getSize() and upload.getType()

	    // execute upload
	    upload.doUpload();
		});
	});