// Assuming there's a sum function to test

import {strict as assert} from 'node:assert';
import test from 'node:test';

export const sum = (a: number, b: number) => {
  return a + b;
};

test('adds 1 + 2 to equal 3', () => {
  assert.strictEqual(sum(1, 2), 3);
});
