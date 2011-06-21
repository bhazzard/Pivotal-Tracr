(function($) {
	$(function() {
		chrome.extension.sendRequest({action: "getOptions"}, function(options) {
			showStatus();
		});
	});
	
	$("#openOptionsPage").live("click", function() {
		chrome.extension.sendRequest({action: "openOptionsPage"});
	});
	
	chrome.extension.onRequest.addListener(function(request, sender, callback) {
		if (request.action == "optionsSet") {
			clearStatus();
		}
	});
	
	function showStatus() {
		chrome.extension.sendRequest({action: "getOptions"}, function(options) {
			if (!options.tracUrl) {
				$(".messages .relative #status")
					.append("<div id='tracr'>You need to <a href='#' id='openOptionsPage'>set your Trac URL</a> to start enjoying the Pivotal Tracr extension</div>")
					.removeClass("statusOff");
			}
		});
	}
	
	function clearStatus() {
		chrome.extension.sendRequest({action: "getOptions"}, function(options) {
			if (options.tracUrl) {
				$(".messages .relative #status")
					.remove("#tracr")
					.addClass("statusOff");
			}
		});
	}
})(jQuery);