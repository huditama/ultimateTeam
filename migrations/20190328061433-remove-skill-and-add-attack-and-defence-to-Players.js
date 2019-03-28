'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.removeColumn('Players', 'skill')
      .then(() => {
        return queryInterface.addColumn('Players', 'attack', Sequelize.INTEGER)
      })
      .then(() => {
        return queryInterface.addColumn('Players', 'defence', Sequelize.INTEGER)
      })
  },

  down: (queryInterface, Sequelize) => {
    /*ƒ
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.addColumn('Players', 'skill', Sequelize.INTEGER)
      .then(() => {
        return queryInterface.removeColumn('Players', 'attack')
      })
      .then(() => {
        return queryInterface.removeColumn('Players', 'defence')
      })
  }
};
