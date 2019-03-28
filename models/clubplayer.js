'use strict';
module.exports = (sequelize, DataTypes) => {
  const ClubPlayer = sequelize.define('ClubPlayer', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    ClubId: DataTypes.INTEGER,
    PlayerId: DataTypes.INTEGER
  }, {});
  ClubPlayer.associate = function (models) {
    // associations can be defined here
    ClubPlayer.belongsTo(models.Club)
    ClubPlayer.belongsTo(models.Player)
  };
  return ClubPlayer;
};