'use strict';
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  const GroupUser = sequelize.define('GroupUser', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      field: 'id'
    },
    group_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'group_id'
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'user_id'
    },
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
    tableName: 'group_users',
  });
  GroupUser.associate = function(models) {
    // associations can be defined here
  };
  return GroupUser;
};