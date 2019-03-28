'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    type: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    PlayerId: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    budgetLeft: DataTypes.INTEGER
  }, {});
  Transaction.associate = function (models) {
    // associations can be defined here
    Transaction.belongsTo(models.User)
    Transaction.belongsTo(models.Player)
  };
  return Transaction;
};