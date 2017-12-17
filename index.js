var sodium = require('sodium-native')
var destroyKey = require('secure-destroy-key')
var assert = require('nanoassert')

module.exports = function (bytes, cb) {
  assert(typeof bytes === 'number', 'bytes must be number')
  assert(Number.isSafeInteger(bytes), 'bytes must be safe integer')
  assert(bytes >= 0, 'bytes must be at least 0')
  assert(typeof cb === 'function', 'cb must be function')

  var key = sodium.sodium_malloc(bytes)

  sodium.randombytes_buf(key)
  sodium.sodium_mprotect_readonly(key)

  process.nextTick(function () {
    return cb(null, key)
  })

  return destroy

  function destroy () {
    destroyKey(key)
  }
}
