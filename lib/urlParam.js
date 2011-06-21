(function($) {
	$.urlParam = function(name) {
		var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
		if (!results) return false;
		return results[1] || false;
	}
})(jQuery);