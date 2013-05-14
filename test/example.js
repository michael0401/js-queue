require('../index');
var test = require('tape');

test('js-queue', function(t) {	
	var Q = queueUtils.Queue();
	
	t.plan(5);
	t.equal(typeof Q.max, 'function');
	
	// exercise the QUEUE object	
	(function() {
		var i
		, count = 0
		, waitfunc = function (num1, num2) {
			setTimeout(function() {
				if (count === 10) {
					t.equal(true, true);
					if(num1 === 10 && num2 === 20){
						t.equal(true, true);
					}
				} else if (count === 11) {
					t.equal(true, false);
				}
				count += 1;
				Q.finish();
			}, 1000);
		};
		for (i=0; i<11; i += 1) { Q.submit(waitfunc, i, i*2); }
		Q.max(3).after(function(argu1,argu2, argu3) {
			if(argu1 === 1 && argu2 === 2 && argu3 ===3){
			      t.equal(true, true);
			  }
		}, [1,2,3]);	
		Q.clear();
		for (i=0; i<11; i += 1) { Q.submit(waitfunc, i, i*2); }
		Q.run();
	}());
	
});

