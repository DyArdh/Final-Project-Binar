'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Type_Flights',
      [
        {
          name: 'Domestic',
          description: 'Local Flights',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'International',
          description: 'International Flights',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Type_Flights', null, {});
  },
};
