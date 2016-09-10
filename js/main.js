(function () {
    // ===  PARAMETERS ===
    var topThreshold = 100; // value in pixel
    var throttleInterval = 500;

    // ===  INIT  ====
    var scrollEventCounter = 0;
    var scrollHandlerCallCounter = 0;

    var domStuff = {};
    var yOffsetPrevious = 0;


    var shouldShowHeader = true;


    $(document).ready(function() {
	var throttledScrollEventHandler = _.throttle(onScrollHandler, 
						     throttleInterval,
						     {trailing: true});

	$(document).on('scroll', function(scrollEvent) {
	    incrementScrollEventCounter();
	    throttledScrollEventHandler(scrollEvent);
	});
	
	domStuff.scrollEventCounter = $('#scroll-event-counter');
	domStuff.scrollHandlerCallCounter = $('#scroll-handler-call-counter');
	domStuff.headerState = $('#header-state');

	$('#reset-button').click(resetCounter);
    });


    // ====================
    // ===  MAIN LOGIC  ===
    // ====================

    function onScrollHandler(scrollEvent) {
	var yOffset = window.pageYOffset;
	
	if (isOnPageTop(yOffset) || (yOffset < yOffsetPrevious)) {
	    showHeader();
	} else {
	    hideHeader();
	}

	yOffsetPrevious = yOffset;
	incrementScrollHandlerCallCounter();
    }

    function isOnPageTop(yOffset) {
	return yOffset <= topThreshold;
    }


    // ==========================
    // ===  DOM MANIPULATION  ===
    // ==========================

    function showHeader() {
	console.log('SHOW header');
	domStuff.headerState.html('SHOW');
    }

    function hideHeader() {
	console.log('HIDE header');
	domStuff.headerState.html('HIDE');
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
