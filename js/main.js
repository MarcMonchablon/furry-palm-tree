(function () {
    var scrollEventCounter = 0;
    var debouncedCallCounter = 0;

    var domStuff = {};

    $(document).ready(function() {
	$(document).on('scroll', onScrollHandler);
	
	domStuff.scrollEventCounter = $('#scroll-event-counter');
	domStuff.debouncedCallCounter = $('#debounced-call-counter');

	$('#reset-button').click(resetCounter);
    });


    function onScrollHandler(scrollEvent) {
	console.log('onScrollHandler !');
	console.log(scrollEvent);
	incrementScrollEventCounter();
    }

    function incrementScrollEventCounter() {
	domStuff.scrollEventCounter.html(++scrollEventCounter);
    }

    function incrementDebouncedCallCounter() {
	domStuff.debouncedCallCounter.html(++debouncedCallCounter);
    }

    function resetCounter() {
	scrollEventCounter = 0;
	debouncedCallCounter = 0;

	domStuff.scrollEventCounter.html(scrollEventCounter);
    }
})();
