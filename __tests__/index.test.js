import gendiff from '../index.js';
import readFile from '../src/readFile.js';

test('gendiff', () => {
  expect(gendiff('__fixtures__/file1.json', '__fixtures__/file2.json'))
    .toEqual(readFile('__fixtures__/expected_file.txt'));

  expect(gendiff('__fixtures__/file1.yml', '__fixtures__/file2.yml'))
    .toEqual(readFile('__fixtures__/expected_file.txt'));
});
