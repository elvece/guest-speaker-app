'use strict';
module.exports = function(sequelize, DataTypes) {
  var Speaker = sequelize.define('Speaker', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    twitter: DataTypes.STRING,
    linkedin: DataTypes.STRING,
    date_speaking: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Speaker;
};