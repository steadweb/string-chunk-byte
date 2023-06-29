# string-chunk-byte

This is a 0 dependency package (dev deps only) that splits any text up by bytes rather than string count. Accounts for unicode characters such as Emojis.

## Installation

```
npm install string-chunk-byte
```

## Usage

The `chunk` method accepts two params, the string and the max length in bytes per chunk. An array is returned of of each chunk, to the maximum number of bytes per chunk. This means, the last chunk, potentially, won't hit the maximum.

### `chunk(str: message, maxLengthInBytes: number)`

```typescript
import chunk from 'string-chunk-byte';

const chunks = chunk('This is a test', 10);

console.log(chunks); // returns [ 'This is a ', 'test' ]
```

## Development

`nvm` is recommended. Node 20 should be installed. 

```
nvm use
```

Then install the dev dependencies.

```
npm i
```

## Testing

Run the following command to run unit tests.

```
npm test
```

Should return the following:

```
▶ chunk
  ✔ it should not split a 10 byte string into more than 1 chunk when maxLengthInBytes is 10 (0.6852ms)
  ✔ it should split a 10 byte string into 2 chunks when maxLengthInBytes is 5 (0.1933ms)
  ✔ it should split a 14 byte string into 2 chunks when maxLengthInBytes is 10 (0.176ms)
  ✔ it should split a and support unicode characters into a 5 chunks when maxLengthInBytes is set to 4 (0.2859ms)
  ✔ it should split up a JSON.stringified object (0.9386ms)
  ✔ it should split a ~1mb string up into ~ten 100kb strings (3.9065ms)
  ✔ it should split a ~1mb into equal 100kb max chunks (4.3911ms)
▶ chunk (13.1757ms)

ℹ tests 7
ℹ suites 1
ℹ pass 7
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 0.2855
```