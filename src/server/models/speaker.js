'use strict';
module.exports = function(sequelize, DataTypes) {
  var Speaker = sequelize.define('Speaker', {
    first_name: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false
    },
    twitter: {
      type: DataTypes.STRING,
      required: false,
    },
    linkedin: {
      type: DataTypes.STRING,
      required: false,
    },
    email: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    topic: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false
    },
    speaking_date: {
      type: DataTypes.DATE,
      required: false,
      allowNull: true,
      validate: {
        isDate: true
      }
    },
    github: {
      type: DataTypes.STRING,
      required: false,
    },
    upVotes: {
      type: DataTypes.INTEGER,
      required: false,
      allowNull: false,
      defaultValue: 0
    },
    downVotes: {
      type: DataTypes.INTEGER,
      required: false,
      allowNull: false,
      defaultValue: 0
    },
    company: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      required: false,
      allowNull: true
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Speaker;
};
