'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        field: 'id'
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: true,
        field: 'name'
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: true,
        field: 'email'
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: true,
        field: 'password'
      },
      status: {
        type: Sequelize.ENUM('0','1'),
        allowNull: false,
        defaultValue: '1',
        field: 'status'
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE,
        field: 'created_at'
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        field: 'updated_at'
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};