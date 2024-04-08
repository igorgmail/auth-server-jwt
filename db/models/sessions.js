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
      onDelete: 'CASCADE',
    },
    user_id: {
      allowNull: false,
      unique: true,
      type: DataTypes.INTEGER,
    },
    refresh_token: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    finger_print: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_ip: {
      type: DataTypes.TEXT,
    },
  };
  Sessions.init(attributes, {
    sequelize,
    modelName: 'Sessions',
  });
  return Sessions;
};
