require('../index');
var test = require('tape');

test('js-queue', function(t) {	
	var Q = queueUtils.Queue();
	
	t.plan(3);
	t.equal(typeof Q.max, 'function');
	
	// exercise the QUEUE object	
	(function() {
		var i
		, count = 0
		, waitfunc = function () {
			setTimeout(function() {
				if (count === 10) {
					t.equal(true, true);
				} else if (count === 11) {
					t.equal(true, false);
				}
				count += 1;
				Q.finish();
			}, 1000);
		};
		for (i=0; i<11; i += 1) { Q.submit(waitfunc); }
		Q.max(3).after(function() {
			t.equal(true, true)
		});	
		Q.run();
	}());
	
});

