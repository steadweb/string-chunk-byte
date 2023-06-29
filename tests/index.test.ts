import { describe, test } from 'node:test';
import fs from 'fs';
import chunk from '../src/index';
import assert from 'node:assert';

describe('chunk', () => {
  test('it should not split a 10 byte string into more than 1 chunk when maxLengthInBytes is 10', () => {
    const chunks = chunk('testing123', 10);

    assert.strictEqual(chunks.length, 1);
    assert.strictEqual(chunks.join(''), 'testing123');
  })

  test('it should split a 10 byte string into 2 chunks when maxLengthInBytes is 5', () => {
    const chunks = chunk('testing123', 5);

    assert.strictEqual(chunks.length, 2);
    assert.strictEqual(chunks.join(''), 'testing123');
  })

  test('it should split a 14 byte string into 2 chunks when maxLengthInBytes is 10', () => {
    const chunks = chunk('this is a test', 10);

    assert.strictEqual(chunks.length, 2);
    assert.strictEqual(chunks.join(''), 'this is a test');
  })

  test('it should split a and support unicode characters into a 5 chunks when maxLengthInBytes is set to 4', () => {
    const chunks = chunk('😂😂😂😂😂', 4);

    assert.strictEqual(chunks.length, 5);
    assert.strictEqual(chunks.join(''), '😂😂😂😂😂');
  })

  test('it should split up a JSON.stringified object', () => {
    const chunks = chunk(JSON.stringify({ test: 'foo', another: 'bar', key: 'baz' }), 10);

    assert.strictEqual(chunks.length, 5);
    assert.deepEqual(JSON.parse(chunks.join('')), { test: 'foo', another: 'bar', key: 'baz' });
  })

  test('it should split a ~1mb string up into ~ten 100kb strings', () => {
    const text = fs.readFileSync('tests/__data__/1mb.txt').toString(); // ~1048575 bytes
    const chunks = chunk(text, 100000);

    assert.strictEqual(chunks.length, 11);
    assert.deepEqual(chunks.join(''), text);
  })

  test('it should split a ~1mb into equal 100kb max chunks', () => {
    const text = fs.readFileSync('tests/__data__/1mb.txt').toString(); // ~1048575 bytes
    const chunks = chunk(text, 100000);

    chunks.forEach(chunk => assert.strictEqual(Buffer.from(chunk).byteLength <= 100000, true))
  })
})