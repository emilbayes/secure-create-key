var createKey = require('.')
var test = require('tape')
var exec = require('child_process').exec

test('read 16 bytes', function (assert) {
  createKey(16, function (err, key) {
    assert.error(err)
    assert.ok(key.length === 16)
    assert.end()
  })
})

test('input args', function (assert) {
  assert.throws(_ => createKey())
  assert.throws(_ => createKey(-1))
  assert.throws(_ => createKey(''))
  assert.throws(_ => createKey(0))
  assert.throws(_ => createKey(0, 2))
  assert.end()
})

test('destroy', function (assert) {
  var destroy = createKey(16, function (err, key) {
    assert.ok(key)
    assert.ok(Buffer.isBuffer(key), 'should still be Buffer')
    assert.end()
  })

  destroy()
})

test('read-only', function (assert) {
  exec(`node -e 'require(".")(1, function (err, key) { key[0] = 0 })'`, function (err, stdout, stderr) {
    assert.ok(err, 'should be killed by os')
    assert.end()
  })
})

test('use after destroy', function (assert) {
  exec(`node -e 'var destroy = require(".")(1, function (err, key) {
    console.log(key[0])
    destroy()
    key[0]
  })'`, function (err, stdout, stderr) {
    assert.ok(/.*\n$/.test(stdout), 'should read first byte')
    assert.ok(err, 'should be killed by os')
    assert.end()
  })
})
