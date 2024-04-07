'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sessions extends Model {
    static associate({ Users }) {
      // define association here
      this.belongsTo(Users, { foreignKey: 'user_id' });
    }
  }

  const attributes = {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    user_id: {
      allowNull: false,
      unique: true,
      type: DataTypes.INTEGER,
    },
    refresh_token: {
      type: DataTypes.TEXT,
      unique: true,
      allowNull: false,
    },
    finger_print: {
      type: DataTypes.TEXT,
      unique: true,
      allowNull: false,
    },
  };
  Sessions.init(attributes, {
    sequelize,
    modelName: 'Sessions',
  });
  return Sessions;
};
