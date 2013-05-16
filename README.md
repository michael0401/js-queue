#js-queue.js

Handy methods for adding queue functionality to any Javascript object.

##Download

The source code is available for download from [GitHub](https://github.com/rranauro/js-queue). 
Besides that, you can also install using Node Package Manager [npm](https://npmjs.org):

    npm install js-queue

##Documentation

* [submit](#submit)
* [finish](#finish)
* [max](#max)
* [after](#after)
* [suspend](#suspend)
* [resume](#resume)
* [pending](#pending)
* [running](#running)
* [clear](#clear)


Initialize and return a queue object, which contains one __running array__ (stores the jobs being processed) and one __pending array__ (stores the jobs waiting to be processed). 

__Example:__

    var queue = require('js-queue');
    
<a name="submit" />
### submit(function, argument1, argument2, argument3...)

Add a function and its arguments to the pending array of the queue. There can be only one argument, more than one arguments or no argument.

__Example:__

    var waitfunc = function (num) 
    {
    		if (num === 10) {
					t.equal(true, true);
				}				
				Q.finish();
		};
    
    for (var i=0; i<11; i++) 
    { 
        Q.submit(waitfunc, i); 
    }

<a name="finish" />
### finish()

Remove a function from running array of the queue. 
Called by the application when the job finishes. If the queue is empty, run the 'afterFunc', if one was supplied.

__Example:__

    The one above.
    
<a name="max" />
### max(number)

Set the maximum number of jobs that can be process at the same time. The number of jobs in running array must be smaller than it.

__Example:__

    Q.max(3);
    
<a name="after" />
### after(function, argument_array)

Set the function that is to be called when all the jobs finishes and the argument array that contains all the arguments this function needs.

__Example:__

    var tempFunc = function(argu1,argu2,argu3) {
  	   ....
		}
		Q.after(tempFunc,[10,11,12]);
    
<a name="run" />
### run()

Start the queue running.

__Example:__

    Q.run();
  
<a name="suspend" />
### suspend()

Set the stop indicator of the queue to true.

__Example:__

    Q.suspend();

<a name="resume" />
### resume()

Set the stop indicator of the queue to false.

__Example:__

    Q.resume();
  
<a name="pending" />
### pending()

Return the length of the pending array.

__Example:__

    Q.pending();
  
<a name="running" />
### running()

Return the length of the running array.

__Example:__

    Q.running();
  
<a name="clear" />
### clear()

Empty the pending array and call the function that is to be called when all jobs finishes.

__Example:__

    Q.clear();
  
