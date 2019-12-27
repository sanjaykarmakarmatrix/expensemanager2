'use strict';
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      field: 'id'
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'name'
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'email'
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'image'
    },
    status: {
      type: DataTypes.ENUM('0','1'),
      allowNull: false,
      defaultValue: '1',
      field: 'status'
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'created_at'
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'updated_at'
    }
  }, {
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,

    // don't delete database entries but set the newly added attribute deletedAt
    // to the current date (when deletion was done). paranoid will only work if
    // timestamps are enabled
    //paranoid: true,

    // don't use camelcase for automatically added attributes but underscore style
    // so updatedAt will be updated_at
    underscored: true,

    // disable the modification of tablenames; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,

    // define the table's name
    tableName: 'groups',
  });

  Group.associate = function(models) {
    // associations can be defined here
  };

  Group.createGroup = function (formData) {
    return this.create({
      name: formData.name,
      created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
      updated_at: moment().format("YYYY-MM-DD HH:mm:ss")
    });
  }


  return Group;
};