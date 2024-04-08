'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Sessions', [
      {
        user_id: 1,
        refresh_token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imlnb3IzQG1haWwucnUiLCJyb2xlIjoidXNlciIsImlhdCI6MTcxMjU3MzE4NCwiZXhwIjoxNzE1MTY1MTg0fQ.5KNBaeJu2Ew9jBOncXK15TB53g5zWyxH3eDLry9IMSU',
        finger_print: '2c976009cad100ed74f462db0a1e56ed',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 2,
        refresh_token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imlnb3IzQG1haWwucnUiLCJyb2xlIjoidXNlciIsImlhdCI6MTcxMjU3MzE4NCwiZXhwIjoxNzE1MTY1MTg0fQ.5KNBaeJu2Ew9jBOncXK15TB53g5zWyxH3eDLry9IMSU',
        finger_print: '2c976009cad100ed74f462db0a1e56ed',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Sessions', null, {});
  },
};
