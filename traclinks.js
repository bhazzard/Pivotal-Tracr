(function($) {
	addTracLinks(2000);
	
	$(".storyPreviewButtons a").live("click", function() {
		addTracLinks(500);
	});
	
	$(".storyDetailsButton input[value=Save]").live("click", function() {
		addTracLinks(500);
	});
	
	$(".storyPreviewHeader").live("mouseup", function() {
		addTracLinks();
	});
	
	chrome.extension.onRequest.addListener(function(request, sender, callback) {
		if (request.action == "optionsSet") {
			addTracLinks();
		}
	});
	
	function addTracLinks(delay) {
		delay = delay || 0;
		chrome.extension.sendRequest({ action: "getOptions" }, function(options) {
			if (options.tracUrl) {
				setTimeout(function() {
					$(".storyPreviewText span:not(.storyLabels):not(.tracLink)").each(function() {
						var text = $(this).text();
						var tracLinkHtml = "<a target='_blank' href='" + options.tracUrl + "/ticket/$1'>#$1</a>";
						if (text.match(/#([0-9]+)/)) {
							$(this).addClass("tracLink");
						}
						var previewHtml = text.replace(/#([0-9]+)/, tracLinkHtml);
						$(this).html(previewHtml);
					});
				}, delay);
			}
		});
	}
})(jQuery);