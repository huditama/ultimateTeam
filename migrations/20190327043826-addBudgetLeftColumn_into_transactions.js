'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.addColumn('Transactions', 'budgetLeft', { type: Sequelize. INTEGER })
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.removeColumn('Transactions', 'budgetLeft')
  }
};
