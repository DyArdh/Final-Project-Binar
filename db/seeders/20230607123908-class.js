'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Classes',
      [
        {
          name: 'Economy',
          description: 'Class Economy',
          seat_capacity: 64,
        },
        {
          name: 'Premium Economy',
          description: 'Class Premium Economy',
          seat_capacity: 64,
        },
        {
          name: 'Business',
          description: 'Class Business',
          seat_capacity: 64,
        },
        {
          name: 'First Class',
          description: 'Class First Class',
          seat_capacity: 64,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Classes', null, {});
  },
};
