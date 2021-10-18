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
      if (status === 'deleted nested') {
        const tab = (substatus === 'del') ? space : minus;
        return getStr(tab, 'children');
      }
      if (status === 'added nested') {
        const tab = (substatus === 'add') ? space : plus;
        return getStr(tab, 'children');
      }
      if (status === 'del') {
        const tab = (substatus === 'del') ? space : minus;
        return getStr(tab, value1);
      }
      if (status === 'add') {
        const tab = (substatus === 'add') ? space : plus;
        return getStr(tab, value2);
      }
      if (status === 'nested') return getStr(space, 'children');
      if (status === 'nested changed to value') {
        return `${getStr(minus, 'children')}\n ${getStr(plus, value2)}`;
      }
      if (status === 'value changed to nested') {
        return `${getStr(minus, value1)}\n ${getStr(plus, 'children')}`;
      }
      if (status === 'changed') {
        return `${getStr(minus, value1)}\n ${getStr(plus, value2)}`;
      }
      if (status === 'unchanged') return getStr(space, value1);
      return [];
    });
    return `\n ${result.join('\n ')}`;
  };
  return `{${formater(astDiff)}\n}`;
};
export default stylish;
