
var assert = require('assert')

describe('LogTrace', function() {

  it('log file and line number', function(done) {

    console.info = function() {
      assert.equal(arguments[1], 'INFO')
      assert.equal(arguments[2], __filename + ':' + 18)
      assert.equal(arguments[3], 'caramel')
      done()
    }
    
    var LogTrace = require('../')
    var logger = new LogTrace()

    logger.info('caramel')

  })
})

