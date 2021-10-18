const jsonFormatter = (astDiff) => {
  const formater = (data) => {
    const result = data.flatMap((elem) => {
      const {
        value1, value2, children, leafPath, status,
      } = elem;
      const getObjData = (action) => {
        if (value1 === undefined) {
          return {
            leafPath,
            action,
            newValue: value2,
          };
        }
        if (value2 === undefined) {
          return {
            leafPath,
            action,
            oldValue: value1,
          };
        }
        return {
          leafPath,
          action,
          oldValue: value1,
          newValue: value2,
        };
      };
      if (status === 'nested'
      || status === 'added nested'
      || status === 'nested changed to value'
      || status === 'deleted nested'
      || status === 'value changed to nested') {
        return formater(children);
      }
      if (status === 'add') {
        return getObjData('added');
      }
      if (status === 'del') {
        return getObjData('removed');
      }
      if (status === 'changed') {
        return getObjData('updated');
      }
      if (status === 'unchanged') {
        return getObjData('unchanged');
      }
      throw new Error(`unknown file type: '${status}'!`);
    });
    return result;
  };
  const structureObject = formater(astDiff).filter((elem) => elem);
  return JSON.stringify(structureObject, null, 2);
};
export default jsonFormatter;
