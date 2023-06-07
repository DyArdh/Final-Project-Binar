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
        },
        {
          name: 'International',
          description: 'International Flights',
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Type_Flights', null, {});
  },
};
