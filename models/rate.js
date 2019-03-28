'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rate = sequelize.define('Rate', {
    sell_rate: DataTypes.FLOAT
  }, {});
  Rate.associate = function(models) {
    // associations can be defined here
  };
  return Rate;
};