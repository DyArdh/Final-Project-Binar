'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Class',
      [
        {
          name: 'Economy',
          description: 'Class Economy',
          seat_capacity: 64,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Premium Economy',
          description: 'Class Premium Economy',
          seat_capacity: 64,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Business',
          description: 'Class Business',
          seat_capacity: 64,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'First Class',
          description: 'Class First Class',
          seat_capacity: 64,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Class', null, {});
  },
};
