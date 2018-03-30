var { spawn } = require('child_process')
var request = require('request')
var test = require('tape')
var env, child
test = beforeEach(test, function before (assert) {
  env = Object.assign({}, process.env, {PORT: 5000})
  child = spawn('node', ['index.js'], {env})
  assert.end()
})
test = afterEach(test, function after (assert) {
  child.kill()
  assert.end()
})

test('Get /', (t) => {
  t.plan(4)
  // Wait until the server is ready
  child.stdout.on('data', _ => {
    // Make a request to our app
    request.get('http://127.0.0.1:5000', (error, response, body) => {
      // No error
      t.false(error)
      // Successful response
      t.equal(response.statusCode, 200)
      // Assert content check
      t.notEqual(body.indexOf('<title>PiPlant</title>'), -1)
      t.notEqual(body.indexOf('piplant'), -1)
      t.end()
    })
  })
})

test('Post /', (t) => {
  t.plan(3)
  // Wait until the server is ready
  child.stdout.on('data', _ => {
    // Make a request to our app
    request.post('http://127.0.0.1:5000', (error, response) => {
      // No error
      t.false(error)
      // Successful response
      t.equal(response.statusCode, 200)
      // Assert content checks
      t.equal(response.body, 'PiPlantPortal: POST Recieved')
      t.end()
    })
  })
})

function beforeEach (test, handler) {
  return (name, listener) => {
    test(name, (assert) => {
      var _end = assert.end
      assert.end = () => {
        assert.end = _end
        listener(assert)
      }
      handler(assert)
    })
  }
}
function afterEach (test, handler) {
  return (name, listener) => {
    test(name, (assert) => {
      var _end = assert.end
      assert.end = () => {
        assert.end = _end
        handler(assert)
      }
      listener(assert)
    })
  }
}
