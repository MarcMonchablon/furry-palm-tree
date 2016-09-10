(function () {
    var scrollEventCounter = 0;
    var scrollHandlerCallCounter = 0;

    var domStuff = {};

    $(document).ready(function() {
	var throttleInterval = 500;
	var throttledScrollEventHandler = _.throttle(onScrollHandler, 
						     throttleInterval,
						     {trailing: true});

	$(document).on('scroll', function(scrollEvent) {
	    incrementScrollEventCounter();
	    throttledScrollEventHandler(scrollEvent);
	});
	
	domStuff.scrollEventCounter = $('#scroll-event-counter');
	domStuff.scrollHandlerCallCounter = $('#scroll-handler-call-counter');

	$('#reset-button').click(resetCounter);
    });


    function onScrollHandler(scrollEvent) {
	console.log('onScrollHandler !');
	console.log(scrollEvent);

	incrementScrollHandlerCallCounter();
    }

    function incrementScrollEventCounter() {
	domStuff.scrollEventCounter.html(++scrollEventCounter);
    }

    function incrementScrollHandlerCallCounter() {
	domStuff.scrollHandlerCallCounter.html(++scrollHandlerCallCounter);
    }

    function resetCounter() {
	scrollEventCounter = 0;
	scrollHandlerCallCounter = 0;

	domStuff.scrollEventCounter.html(scrollEventCounter);
	domStuff.scrollHandlerCallCounter.html(scrollHandlerCallCounter);
    }
})();
