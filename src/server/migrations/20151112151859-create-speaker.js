'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Speakers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      first_name: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false
      },
      last_name: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false
      },
      twitter: {
        type: Sequelize.STRING,
        required: false,
      },
      linkedin: {
        type: Sequelize.STRING,
        required: false,
      },
      email: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      topic: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false
      },
      speaking_date: {
        type: Sequelize.DATE,
        required: false,
        allowNull: true,
        validate: {
          isDate: true
        }
      },
      github: {
        type: Sequelize.STRING,
        required: false,
      },
      upVotes: {
        type: Sequelize.INTEGER,
        required: false,
        allowNull: false,
        defaultValue: 0
      },
      downVotes: {
        type: Sequelize.INTEGER,
        required: false,
        allowNull: false,
        defaultValue: 0
      },
      company: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false
      },
      role: {
        type: Sequelize.STRING,
        required: false,
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
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Speakers');
  }
};
