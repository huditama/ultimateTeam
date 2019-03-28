'use strict';
module.exports = (sequelize, DataTypes) => {
  const Club = sequelize.define('Club', {
    name: {
      type: DataTypes.STRING,
      validate: {
        checkEmpty(name) {
          if (!name) throw new Error('Club name is required!')
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {});
  Club.associate = function (models) {
    // associations can be defined here
    Club.belongsTo(models.User)


    
    Club.belongsToMany(models.Player, { through: models.ClubPlayer })
  };
  return Club;
};