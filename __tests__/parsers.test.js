import parsers from '../src/parsers.js';
// import readFile from '../src/readFile.js';

test('parsers', () => {
  const fileJson = { parser: 'json' };
  const fileYaml = { parser: 'yaml' };
  const fileYml = { parser: 'yml' };

  expect(parsers('parsers/json.json')).toEqual(fileJson);
  expect(parsers('parsers/yaml.yaml')).toEqual(fileYaml);
  expect(parsers('parsers/yml.yml')).toEqual(fileYml);
});
