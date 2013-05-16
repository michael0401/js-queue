/* ===================================================
 * js-queue.js v0.01
 * https://github.com/rranauro/boxspringjs
 * ===================================================
 * Copyright 2013 Incite Advisors, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

/*jslint newcap: false, node: true, vars: true, white: true, nomen: true  */
/*global */


(function(global) {
	"use strict";
	
	var Queue = function() {
		this.Pending = [];
		this.Running = [];
		this.cleared = false;
		this.hold = false;
		this.afterFunc = function () { return; };
		this.afterFuncArgs = [];
		this.depth = 1;
		return this;		
	};
	
	Queue.prototype.submit = function (func) {
		var i
		, args = [];
		// any arguments to submit after func are the arguments to func. Conver them to array.
		for (i=1; i < arguments.length; i += 1) {
			args.push(arguments[i]);
		}
		// the queue will dequeue func with argument args
		this.Pending.push({ 'func': func, 'args': args });
		return this;		
	};

	// What it does: Called by the application to start the queue running. 
	// cycle method continuously calls it while there are still jobs pending.
	Queue.prototype.run = function () {
		var nextJob = {};

		if (this.hold === true) { return; }
		if ((this.Pending.length > 0) // remaining jobs
				&& (this.Running.length < this.depth)) { // more capacity available
			this.Running.push({});
			this.cycle();
			nextJob = this.Pending.shift();
			try {
				nextJob.func.apply(this, nextJob.args);
			} catch (e) {
				throw e;
			}
		} 
		return this;
	};

	// What it does: We need some space between the last dequeue and the next attempt to run a job; or else
	// we can get a race.
	Queue.prototype.cycle = function () {
		var local = this;
		
		setTimeout(function () {
			local.run();
			if (local.Pending.length > 0) { 
				local.cycle(); 
			}
		}, 100);
	};
	// What this does: Called by the application when the job finishes. If the queue is empty, 
	// run the 'afterFunc', if one was supplied.
	Queue.prototype.finish = function () {
		this.Running.pop();
		if (this.Pending.length === 0 && this.Running.length === 0) {
			this.afterFunc.apply(this, this.afterFuncArgs);
		}
		return this;		
	};
	
	Queue.prototype.max = function (depth) {
		if (depth) {
			this.depth = parseInt(depth, 10);
		}
		return this;		
	};

	Queue.prototype.after = function (func, args) {
		if (func && typeof func === 'function') {
			this.afterFunc = func;
			this.afterFuncArgs = args;
		}
		return this;
	};

	Queue.prototype.suspend = function () {
		this.hold = true;
		return this;
	};
	
	Queue.prototype.resume = function () {
		this.hold = false;
		return this;
	};
	
	Queue.prototype.pending = function () {
		return this.Pending.length;
	};
	
	Queue.prototype.running = function () {
		return this.Running.length;
	};
	
	Queue.prototype.clear = function () {
		while (this.Pending.length > 0) {
			this.Pending.pop();
		}
		this.cleared = true;
		this.afterFunc(this.afterFuncArgs);
		return this;		
	};

	var queue = function () {
		return new Queue();
	};

	if (typeof exports !== 'undefined') {
		if (typeof module !== 'undefined' && module.exports) {
	      exports = module.exports = queue;
	    }
		exports.queue = queue;
	} else {
		global.queue = queue;
	}
	
}(this));


