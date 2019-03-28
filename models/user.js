'use strict';
const bcrypt = require('bcrypt')
const Op = require('sequelize').Op
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    first_name: {
      type: DataTypes.STRING,
      validate: {
        checkEmpty(firstName) {
          if (!firstName) throw new Error('First name is required!')
        }
      }
    },
    last_name: {
      type: DataTypes.STRING,
      validate: {
        checkEmpty(firstName) {
          if (!firstName) throw new Error('Last name is required!')
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'Invalid email format!'
        },
        isUnique(email) {
          return User
            .findOne({
              where: {
                email: email,
                id: {
                  [Op.ne]: this.id
                }
              }
            })
            .then((findOneUser) => {
              if (findOneUser) throw new Error('Email is already registered! Please try another one.')
            })
        }
      },
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        checkEmpty(password) {
          if (!password) throw new Error('Password is required!')
        }
      }
    },
    budget: {
      type: DataTypes.INTEGER,
      min: {
        args: 0,
        msg: 'Budget insufficient!'
      }
    },
    ClubId: DataTypes.INTEGER,
    profit: DataTypes.INTEGER
  }, {
      hooks: {
        beforeCreate: (user) => {
          //HASH PASSWORD
          const salt = bcrypt.genSaltSync();
          user.password = bcrypt.hashSync(user.password, salt)

          //RE-FORMAT DETAILS
          user.first_name = user.first_name[0].toUpperCase() + user.first_name.slice(1).toLowerCase()
          user.last_name = user.last_name[0].toUpperCase() + user.last_name.slice(1).toLowerCase()
          user.email = user.email.toLowerCase()
        }
      }
    });
  User.associate = function (models) {
    // associations can be defined here
    User.hasOne(models.Club)
    User.belongsToMany(models.Player, { through: models.Transaction })
  };

  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  }

  User.prototype.getFullName = function() {
    return `${this.first_name} ${this.last_name}`
  }
  return User;
};
