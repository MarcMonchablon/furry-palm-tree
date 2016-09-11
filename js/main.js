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
/*	var throttledScrollEventHandler = _.throttle(onScrollHandler, 
						     throttleInterval,
						     {leading: true});  */

	var throttledScrollEventHandler = throttle(onScrollHandler, 
						   throttleInterval);

	$(document).on('scroll', function(scrollEvent) {
	    incrementScrollEventCounter();
	    throttledScrollEventHandler(scrollEvent);
	});
	
	domStuff.scrollEventCounter = $('#scroll-event-counter');
	domStuff.scrollHandlerCallCounter = $('#scroll-handler-call-counter');
	domStuff.headerState = $('#header-state');
	domStuff.header = $('#main-header');

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
	domStuff.header.removeClass('hide');
	domStuff.header.addClass('show');
    }

    function hideHeader() {
	console.log('HIDE header');
	domStuff.headerState.html('HIDE');
	domStuff.header.removeClass('show');
	domStuff.header.addClass('hide');
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


    // ==========================
    // ===  Throttle          ===
    // ==========================

    /** take a function, an interval (in milliseconds)
        return a function 

     * TODO: Add the possibility to add a delay before first call
     * TODO: Add a 'flush' and a 'cancel' method.
     */
    function throttle(fn, interval) {
	// TODO : corriger les bugs !
	var timeoutId;

	var resultFn = function() {
	    if (timeoutId) return;

	    fn.apply(null, arguments);    
	    timeoutId = window.setTimeout(function() {
		timeoutId = undefined;
	    }, interval);
	};

	resultFn.prototype = {
	    cancel: function() {
		if (timeoutId) {
		    window.clearTimeout(timeoutId);
		}
	    }
	};

	return resultFn;
    } 


    /* 
     
     var tfoo = throttle(foo, 300);

     tfoo();  // do stuff
     tfoo()  // nothing
     // ... time pass
     // tfoo finally execute

     tfoo()  // do stuff
     tfoo()  // nothing
     tfoo.flush() // execute function, and stop/reset counter.

     tfoo() // do stuff
     tfoo() // nothing
     tfoo.cancel()
     // tfoo won't execute ever.
     

     
     

     */

})();
