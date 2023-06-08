'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Information_Flights',
      [
        {
          baggage_capacity: 20,
          cabin_capacity: 0,
          flight_entertainment: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          baggage_capacity: 21,
          cabin_capacity: 15,
          flight_entertainment: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          baggage_capacity: 30,
          cabin_capacity: 12,
          flight_entertainment: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          baggage_capacity: 50,
          cabin_capacity: 10,
          flight_entertainment: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          baggage_capacity: 50,
          cabin_capacity: 20,
          flight_entertainment: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Information_Flights', null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  },
};
