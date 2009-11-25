(function($) {

	$.fn.simple_accordion = function(params) {
		
		jQuery.extend(jQuery.easing, {
			easeOutQuart: function (x, t, b, c, d) {
				return -c * ((t=t/d-1)*t*t*t - 1) + b;
			}
		});
		
		// merge default and user parameters
		params = $.extend({attribute:'rel', active:'active', before:'', after:'', custom_easing:'easeOutQuart'}, params);

		// traverse all nodes
	    return this.each(function() {

	        var $this = $(this);
			
			$this.bind('click', function(e) {
				
				e.preventDefault();

				$this_link = $(this);

				// If it's already being shown lets hide it and stop
				if ($($this_link.attr('href')).css('display') != 'none')
				{
					$($this_link.attr('href')).slideUp({duration: 500, easing: params.custom_easing});
					$this_link.removeClass(params.active);
					if (params.before)
					{
						$this_link.html(params.before);
					}
				}
				else
				{
					// Lets hide all items that are related before we show the current one
					$('a[' + params.attribute + '*=' + $this_link.attr(params.attribute) + ']').each(function() {
						$this_links = $(this);
						$($this_links.attr('href')).slideUp({duration: 500, easing: params.custom_easing});
						$this_links.removeClass(params.active);
						if (params.before)
						{
							$this_links.html(params.before);
						}
					});
				
					$($this_link.attr('href')).slideDown({duration: 500, easing: params.custom_easing});
					$this_link.addClass(params.active);
					if (params.after)
					{
						$this_link.html(params.after);
					}
				}
			});

	    });

		// allow jQuery chaining
		return this;
	};

})(jQuery);