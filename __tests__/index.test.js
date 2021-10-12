import gendiff from '../index.js';
import readFile from '../src/readFile.js';

test('gendiff stylish', () => {
  expect(gendiff('__fixtures__/file1.json', '__fixtures__/file2.json'))
    .toEqual(readFile('__fixtures__/stylish expected file.txt'));

  expect(gendiff('__fixtures__/file1.yml', '__fixtures__/file2.yml'))
    .toEqual(readFile('__fixtures__/stylish expected file.txt'));
});

test('gendiff plain', () => {
  expect(gendiff('__fixtures__/file1.json', '__fixtures__/file2.json', 'plain'))
    .toEqual(readFile('__fixtures__/plain expected file.txt'));

  expect(gendiff('__fixtures__/file1.yml', '__fixtures__/file2.yml', 'plain'))
    .toEqual(readFile('__fixtures__/plain expected file.txt'));
});

test('gendiff json', () => {
  expect(gendiff('__fixtures__/file1.json', '__fixtures__/file2.json', 'json'))
    .toEqual(readFile('__fixtures__/json expected file.json'));

  expect(gendiff('__fixtures__/file1.yml', '__fixtures__/file2.yml', 'json'))
    .toEqual(readFile('__fixtures__/json expected file.json'));
});
