import getValue from '../getValue.js';

const jsonFormatter = (astDiff) => {
  const formater = (data) => {
    const result = data.flatMap((elem) => {
      const oldValue = getValue(elem, 'value1');
      const newValue = getValue(elem, 'value2');
      const name = getValue(elem, 'key');
      const path = `${getValue(elem, 'path')}.${name}`;
      const isValidStatus = (status) => getValue(elem, 'status') === status;
      const getObjData = (action) => {
        let output;
        if (oldValue === undefined) {
          output = {
            path,
            action,
            newValue,
          };
        }
        if (newValue === undefined) {
          output = {
            path,
            action,
            oldValue,
          };
        }
        output = {
          path,
          action,
          oldValue,
          newValue,
        };
        return output;
      };
      const getStrPlain = () => {
        let outputObj;
        if (isValidStatus('nested')
          || isValidStatus('added nested')
          || isValidStatus('nested changed to value')
          || isValidStatus('deleted nested')) {
          outputObj = formater(getValue(elem, 'children'));
        }
        if (isValidStatus('add')) {
          outputObj = getObjData('added');
        }
        if (isValidStatus('del')) {
          outputObj = getObjData('removed');
        }
        if (isValidStatus('changed')) {
          outputObj = getObjData('updated');
        }
        if (isValidStatus('unchanged')) {
          outputObj = getObjData('unchanged');
        }
        return outputObj;
      };
      return getStrPlain();
    });
    return result;
  };
  const structureObject = formater(astDiff).filter((elem) => elem);
  return JSON.stringify(structureObject, null, 2);
};
export default jsonFormatter;
