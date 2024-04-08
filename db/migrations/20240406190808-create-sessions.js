'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const attributes = {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        allowNull: false,
        unique: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      refresh_token: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      finger_print: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      user_ip: {
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    };
    await queryInterface.createTable('Sessions', attributes);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Sessions');
  },
};
