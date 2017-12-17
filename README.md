# `secure-create-key`

[![Build Status](https://travis-ci.org/emilbayes/secure-create-key.svg?branch=master)](https://travis-ci.org/emilbayes/secure-create-key)

> Create a symmetric cryptographic key in a secure, read-only Buffer

A piece in the puzzle towards [`secure-key-management`](https://github.com/emilbayes/secure-key-management)

## Usage

```js
var createKey = require('secure-create-key')

var destroy = createKey(32, unction (err, key) {
  if (err) throw err

  // key is create-only, any writes to `key` will kill our program

  // We can use the key as a master key, and derive subkeys for eg. asymmetric purposes

  // Once we're done with the key, let's destroy it
  destroy()

  // Any further access to `key` will kill our program
})
```

**:warning: Warnings:**

* The key is create-only. Any writes to it will crash your program with no mercy
* Once the key is destroyed, any access to it (whether create or write) will
  crash your program with no mercy

## API

### `var destroy = createKey(bytes, cb(err, secureKeyBuf))`

`bytes` must be a safe integer at least 0, and `cb` must be given.

There are currenly no causes of errors, but that might change in the future

Note that the `secureKeyBuf` looks like a normal `Buffer`, but has some extra
properties. You can read more about
[Secure Buffers on `secure-key-management`](https://github.com/emilbayes/secure-key-management#secure-buffers)
Be wary about using any of the default Buffer operations on this Secure Buffer.

To explicitly release the key and it's content, call the returned `destroy`
method, which will safely wipe the key from memory and mark it for no access,
to prevent any accidental misuse.

## Install

```sh
npm install secure-create-key
```

## License

[ISC](LICENSE)
