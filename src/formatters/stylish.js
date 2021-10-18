const space = ' ';
const minus = '-';
const plus = '+';

const stylish = (astDiff) => {
  const formater = (data) => {
    const result = data.flatMap((elem) => {
      const {
        value1, value2, substatus, status, depth, key, children,
      } = elem;
      const numberOfSpaces = 4;
      const indent = depth * numberOfSpaces;

      const getStr = (marker, value) => {
        if (value === 'children') {
          return `${space.repeat(indent)} ${marker} ${key}: {${formater(children)}\n${space.repeat(indent + 4)}}`;
        }
        return `${space.repeat(indent)} ${marker} ${key}: ${value}`;
      };

      const handleByStatus1 = (value, action, marker, subAction) => {
        if (status === action) {
          const tab = (substatus === subAction) ? space : marker;
          return getStr(tab, value);
        }
        return [];
      };
      const handleByStatus2 = (value, action) => {
        if (status === action) {
          return getStr(space, value);
        }
        return [];
      };
      const handleByStatus3 = (val1, val2, action) => {
        if (status === action) {
          return `${getStr(minus, val1)}\n ${getStr(plus, val2)}`;
        }
        return [];
      };
      const processedCells = [];
      processedCells.push(handleByStatus1('children', 'deleted nested', minus, 'del'));
      processedCells.push(handleByStatus1('children', 'added nested', plus, 'add'));
      processedCells.push(handleByStatus1(value1, 'del', minus, 'del'));
      processedCells.push(handleByStatus1(value2, 'add', plus, 'add'));
      processedCells.push(handleByStatus2('children', 'nested'));
      processedCells.push(handleByStatus3('children', value2, 'nested changed to value'));
      processedCells.push(handleByStatus3(value1, 'children', 'value changed to nested'));
      processedCells.push(handleByStatus3(value1, value2, 'changed'));
      processedCells.push(handleByStatus2(value1, 'unchanged'));

      const cell = processedCells.filter((element) => !Array.isArray(element));
      return cell;
    });
    return `\n ${result.join('\n ')}`;
  };
  return `{${formater(astDiff)}\n}`;
};
export default stylish;
