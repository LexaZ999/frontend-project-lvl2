const plain = (astDiff) => {
  const formater = (data) => {
    const result = data.flatMap((elem) => {
      const {
        value1, value2, leafPath, status, children,
      } = elem;
      const oldValue = (typeof value1 === 'string') ? `'${value1}'` : value1;
      const newValue = (typeof value2 === 'string') ? `'${value2}'` : value2;
      if (status === 'nested') return formater(children);
      if (status === 'add') {
        return `Property '${leafPath}' was added with value: ${newValue}`;
      }
      if (status === 'del') {
        return `Property '${leafPath}' was removed`;
      }
      if (status === 'changed') {
        return `Property '${leafPath}' was updated. From ${oldValue} to ${newValue}`;
      }
      if (status === 'added nested') {
        return `Property '${leafPath}' was added with value: [complex value]`;
      }
      if (status === 'nested changed to value') {
        return `Property '${leafPath}' was updated. From [complex value] to ${newValue}`;
      }
      if (status === 'value changed to nested') {
        return `Property '${leafPath}' was updated. From ${oldValue} to [complex value]`;
      }
      if (status === 'deleted nested') {
        return `Property '${leafPath}' was removed`;
      }
      return [];
    });
    return result;
  };
  return `${formater(astDiff).filter((elem) => elem).join('\n')}`;
};
export default plain;
