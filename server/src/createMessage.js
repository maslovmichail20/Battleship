'use strict';

const createMessage = (type, needData) => {
  const methods = {
    successfulCreate() {
      const { id, gameStatus } = needData;
      return JSON.stringify({ type, id, gameStatus });
    },
    unsuccessfulCreate() {
      return JSON.stringify({ type });
    },
    progressResult() {
      const { gameStatus, enemyMatrix } = needData;
      return JSON.stringify({ type, gameStatus, enemyMatrix });
    },
    progressChange() {
      const { gameStatus, matrix } = needData;
      return JSON.stringify({ type, gameStatus, matrix });
    },
    victory() {
      const { enemyMatrix, gameStatus } = needData;
      return JSON.stringify({ type, enemyMatrix, gameStatus });
    },
    defeat() {
      const { matrix, gameStatus } = needData;
      return JSON.stringify({ type, matrix, gameStatus });
    }
  };
  
  return methods[type]();
};

module.exports = createMessage;