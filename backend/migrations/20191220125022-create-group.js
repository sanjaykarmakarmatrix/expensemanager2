'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('groups', {
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
      image: {
        type: Sequelize.STRING(255),
        allowNull: true,
        field: 'image'
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
    return queryInterface.dropTable('groups');
  }
};