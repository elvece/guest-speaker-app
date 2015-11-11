'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
      type: Sequelize.STRING,
      required: true,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    admin: {
      type: Sequelize.BOOLEAN, 
      defaultValue: false,
      allowNull: false,
      required: true
    },
    cohort: {
      type: Sequelize.STRING,
      allowNull: true
    },
    picture: {
      type: Sequelize.STRING
    },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
      type: Sequelize.STRING,
      required: true,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    admin: {
      type: Sequelize.BOOLEAN, 
      defaultValue: false,
      allowNull: false,
      required: true
    },
    cohort: {
      type: Sequelize.STRING,
      allowNull: true
    },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });  
  }
};