
var LOG_LEVELS_HIERARCHY = {
  'DEBUG': 1,
  'INFO': 2,
  'WARN': 3,
  'ERROR': 4
}

var STACK_DEPTH_LOOKUP = 3 

function LogTrace() {

  Object.defineProperty(this, '__stack', {
    get: function() {
      var orig = Error.prepareStackTrace;
      Error.prepareStackTrace = function(_, stack) {
        return stack;
      };
      var err = new Error;
      Error.captureStackTrace(err, arguments.callee);
      var stack = err.stack;
      Error.prepareStackTrace = orig;
      return stack;
    }
  });

  Object.defineProperty(this, '__caller_info', {
    get: function() {
      var callerStack = this.__stack
      return {
        line: callerStack[STACK_DEPTH_LOOKUP].getLineNumber(),
        file: callerStack[STACK_DEPTH_LOOKUP].getFileName(),
        functionName: callerStack[STACK_DEPTH_LOOKUP].getFunctionName()
      }
    }
  });
}

LogTrace.prototype._shouldLog = function(level) {
  var referenceLevel = LOG_LEVELS_HIERARCHY[process.env.LOG_LEVEL] || 2
  return LOG_LEVELS_HIERARCHY[level] >= referenceLevel
}

LogTrace.prototype._logPrefixArray = function(level) {
  var callerInfo = this.__caller_info
  return [(new Date()).toISOString(), level, callerInfo.file + ':' + callerInfo.line]
}

LogTrace.prototype.debug = wrap('DEBUG', console.log)
LogTrace.prototype.info  = wrap('INFO', console.info)
LogTrace.prototype.warn  = wrap('WARN', console.warn)
LogTrace.prototype.error = wrap('ERROR', console.error)

function wrap(level, consoleFunc) {
  return function() {
    if(this._shouldLog(level)) {
      var args = this._logPrefixArray(level)
      for(var i in arguments) {
        args.push(arguments[i])
      }
      consoleFunc.apply(console, args)
    }
  }
}

module.exports = LogTrace
