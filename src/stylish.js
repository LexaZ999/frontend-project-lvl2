import getValue from './getValue.js';

const stylish = (astDiff) => {
  const formater = (data) => {
    const space = ' ';
    const minus = '-';
    const plus = '+';

    const result = data.flatMap((elem) => {
      const numberOfSpaces = 4;
      const indent = getValue(elem, 'depth') * numberOfSpaces;
      const children = 'children';
      const value1 = getValue(elem, 'value1');
      const value2 = getValue(elem, 'value2');

      const getStr = (marker, value) => {
        if (value === 'children') {
          return `${space.repeat(indent)} ${marker} ${getValue(elem, 'key')}: {${formater(getValue(elem, 'children'))}\n${space.repeat(indent + 4)}}`;
        }
        return `${space.repeat(indent)} ${marker} ${getValue(elem, 'key')}: ${value}`;
      };

      if (getValue(elem, 'status') === 'nested') {
        return getStr(space, children);
      }

      if (getValue(elem, 'status') === 'deleted nested') {
        const tab = (getValue(elem, 'substatus') === 'del') ? space : minus;
        return getStr(tab, children);
      }

      if (getValue(elem, 'status') === 'nested changed to value') {
        return `${getStr(minus, children)}\n ${getStr(plus, value2)}`;
      }

      if (getValue(elem, 'status') === 'added nested') {
        const tab = (getValue(elem, 'substatus') === 'add') ? space : plus;
        return getStr(tab, children);
      }

      if (getValue(elem, 'status') === 'del') {
        const tab = (getValue(elem, 'substatus') === 'del') ? space : minus;
        return getStr(tab, value1);
      }

      if (getValue(elem, 'status') === 'add') {
        const tab = (getValue(elem, 'substatus') === 'add') ? space : plus;
        return getStr(tab, value2);
      }

      if (getValue(elem, 'status') === 'changed') {
        return `${getStr(minus, value1)}\n ${getStr(plus, value2)}`;
      }

      return getStr(space, value1);
    });
    return `\n ${result.join('\n ')}`;
  };

  return `{${formater(astDiff)}\n}`;
};

export default stylish;
