'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    email: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        required: true,
        allowNull: false
    },
    cohort: {
        type: DataTypes.STRING,
        allowNull: true
    },
    picture: {
        type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User;
};