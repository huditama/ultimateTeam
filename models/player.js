'use strict';
module.exports = (sequelize, DataTypes) => {
  const Player = sequelize.define('Player', {
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    attack: DataTypes.INTEGER,
    defence: DataTypes.INTEGER
  }, {});
  Player.associate = function(models) {
    // associations can be defined here
    Player.belongsToMany(models.Club, {through: models.ClubPlayer})
    Player.belongsToMany(models.User, {through: models.Transaction})
  };
  return Player;
};