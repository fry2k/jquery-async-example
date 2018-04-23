/**
 * jQuery loader
 * we append this script inline to our html header that we didn't have a blocking js resource.
 * each inline javascript block which uses jQuery have to be wrapped inside a dom ready block like $(function(){});
 */
(function(window) {
	'use strict';
	var domQueue = [];
	var dom = {
		/**
		 * recode document ready function which pushes every function to the local queue
		 *
		 * @param {function} f - function
		 * @returns {{ready: Function}}
		 */
		ready: function(f) {
			if(typeof f === 'function') {
				domQueue.push(f);
			}
			// return dom object in order to support jQuery(document).ready()
			return dom;
		}
	};

	// reference for the window.setInterval
	var timer = false;

	/**
	 * check each 25ms if jQuery is loaded and trigger all stored dom ready functions from our queue
	 */
	function initialized() {
		if (typeof window.jQuery.fn === 'undefined') {
			// seems like jQuery isn't loaded right now. just quit.
			return false;
		}
		if (timer !== false) {
			// clear the interval. will execute our queue only once
			window.clearInterval(timer);
		}
		// jQuery is loaded, trigger all stored items from the dom ready queue
		window.jQuery(function() {
			for(var i= 0, l=domQueue.length; i<l; i++) {
				domQueue[i]();
			}
		});
	}

	/**
	 * map $ and jQuery to the dom.ready() function if jQuery isn't loaded.
	 * supports the following inline calls like:
	 * <ul>
	 *	<li>$(function(){...})</li>
 	 *	<li>jQuery(function(){...})</li>
	 *	<li>$('document').ready(function(){...})</li>
	 *	<li>jQuery('document').ready(function(){...})</li>
	 * </ul>
	 */
	if (typeof window.jQuery === 'undefined'){
		window.$ = window.jQuery = dom.ready;
		timer = window.setInterval(initialized, 25);
	}
})(window);
