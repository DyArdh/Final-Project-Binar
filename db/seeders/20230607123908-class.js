'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Classes',
      [
        {
          name: 'Economy',
          seat_capacity: 64,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Premium Economy',
          seat_capacity: 64,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Business',
          seat_capacity: 64,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'First Class',
          seat_capacity: 64,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Classes', null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  },
};
