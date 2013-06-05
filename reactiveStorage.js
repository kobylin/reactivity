//this function observe changes in Global storage and rerun fn after data changed
function autorun(fn) {
    //1. Get state of Storage before run fn 
    reactiveStorage.begin();
    //2. Run fn
    fn.call();
    //3. Get state of Storage after run fn
    //4. Detect dependency
    //5. Add listener for this dependency (maybe do it in ReactiveStorage). 
    reactiveStorage.end(fn);
}

var ReactiveStorage = function() {
    //storage of variables
    this.storage = {};
    //listeners linked with variables
    this.listeners = {};

    this.requestedHistory = [];
}

ReactiveStorage.prototype = {
    begin: function() {
        //save current state of requested values
        this.requestedHistory = [];
        //return this.requestedHistory;
    },
    end: function(callback) {
        //detect new requested states
        var me = this;
        _.each(_.uniq(me.requestedHistory), function(varName) {
            //attach callback for new requested states
            if (!me.listeners[varName]) {
                me.listeners[varName] = [];
            }
            me.listeners[varName].push(callback);
        });
    },
    get: function(name) {
        //rememer that this value have dependency
        this.requestedHistory.push(name);
        //find value of name and return    
        return this.storage[name];
    },
    set: function(name, value) {
        //1. set new value
        this.storage[name] = value;
        //2. call all listeners linked with this value
        if (this.listeners[name]) {
            var calledListeners = [];
            this.listeners[name].forEach(function(listener) {
                if (calledListeners.indexOf(listener) === -1) {
                    listener.call();
                    calledListeners.push(listener);
                }
            });
        }
    }
};

function template(elementId, data) {
    var rendered = $(elementId).html();
    _.each(data, function(value, name) {
        rendered = rendered.replace('{' + name + '}', value);
    });

    return rendered;
}

reactiveStorage = new ReactiveStorage();
