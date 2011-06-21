(function($) {
	$(function() {
		$(".toggleExpandedButton").live("click", function() {
			chrome.extension.sendRequest({ action: "getOptions" }, function(options) {
				if (options.tracUrl) {
					addButton();
				}
			});
		});
		
		$(".addToTracButton").live("click", function() {
			var element = $(this);
			chrome.extension.sendRequest({ action: "getOptions" }, function(options) {
				var newTicketWindow = options.tracUrl + "/newticket?";
				var params = {};
				params.summary = element
					.closest('.storyDetailElement')
					.siblings('.storyPreviewHeader')
					.find(".titleInputField")
					.val();
				params.description = element
					.closest(".storyDetailElement")
					.find(".descriptionArea")
					.val();
				newTicketWindow += $.param(params);
				window.open(newTicketWindow);
			});
			return false;
		});
	});
	
	function addButton() {
		var lastDiv = $(".buttons div:last");
		
		var newDiv = lastDiv.clone(true);
		
		newDiv.find("input")
			.attr("value", "Add to trac")
			.removeAttr("id")
			.addClass("addToTracButton");
			
		newDiv.insertAfter(lastDiv);
	}
})(jQuery);