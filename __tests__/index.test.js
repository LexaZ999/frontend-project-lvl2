import gendiff from '../index.js';
import readFile from '../src/readFile.js';

test('gendiff stylish', () => {
  expect(gendiff('file1.json', 'file2.json'))
    .toEqual(readFile('stylish expected file.txt'));

  expect(gendiff('file1.yml', 'file2.yml'))
    .toEqual(readFile('stylish expected file.txt'));
});

test('gendiff plain', () => {
  expect(gendiff('file1.json', 'file2.json', 'plain'))
    .toEqual(readFile('plain expected file.txt'));

  expect(gendiff('file1.yml', 'file2.yml', 'plain'))
    .toEqual(readFile('plain expected file.txt'));
});

test('gendiff json', () => {
  expect(gendiff('file1.json', 'file2.json', 'json'))
    .toEqual(readFile('json expected file.json'));

  expect(gendiff('file1.yml', 'file2.yml', 'json'))
    .toEqual(readFile('json expected file.json'));
});
