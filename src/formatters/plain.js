import getValue from '../getValue.js';

const plain = (astDiff) => {
  const formater = (data) => {
    const result = data.flatMap((elem) => {
      const val1 = getValue(elem, 'value1');
      const val2 = getValue(elem, 'value2');
      const oldValue = ((val1 === false) || (val1 === true) || (val1 === null))
        ? val1 : `'${val1}'`;
      const newValue = ((val2 === false) || (val2 === true) || (val2 === null))
        ? val2 : `'${val2}'`;
      const name = getValue(elem, 'key');
      let path = `${getValue(elem, 'path')}.${name}`;
      const isValidStatus = (status) => getValue(elem, 'status') === status;
      const getStrPlain = () => {
        let outputString;
        if (isValidStatus('nested')) outputString = formater(getValue(elem, 'children'));
        if (isValidStatus('add')) {
          outputString = `Property '${path}' was added with value: ${newValue}`;
        }
        if (isValidStatus('del')) {
          outputString = `Property '${path}' was removed`;
        }
        if (isValidStatus('changed')) {
          outputString = `Property '${path}' was updated. From ${oldValue} to ${newValue}`;
        }
        if (isValidStatus('added nested')) {
          if (getValue(elem, 'path') === '') path = name;
          outputString = `Property '${path}' was added with value: [complex value]`;
        }
        if (isValidStatus('nested changed to value')) {
          outputString = `Property '${path}' was updated. From [complex value] to ${newValue}`;
        }
        if (isValidStatus('deleted nested')) {
          if (getValue(elem, 'path') === '') path = name;
          outputString = `Property '${path}' was removed`;
        }
        return outputString;
      };
      return getStrPlain();
    });
    return result;
  };
  return `\n${formater(astDiff).filter((elem) => elem).join('\n')}`;
};
export default plain;
