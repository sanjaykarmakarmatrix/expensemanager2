'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('group_users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        field: 'id'
      },
      group_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'group_id'
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'user_id'
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('group_users');
  }
};