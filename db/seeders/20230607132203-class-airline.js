'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'ClassAirlines',
      [
        {
          airline_id: 1,
          class_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          airline_id: 2,
          class_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          airline_id: 3,
          class_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          airline_id: 4,
          class_id: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          airline_id: 5,
          class_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          airline_id: 6,
          class_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          airline_id: 7,
          class_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          airline_id: 8,
          class_id: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          airline_id: 9,
          class_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          airline_id: 10,
          class_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          airline_id: 11,
          class_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          airline_id: 12,
          class_id: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          airline_id: 13,
          class_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          airline_id: 14,
          class_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          airline_id: 15,
          class_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          airline_id: 16,
          class_id: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          airline_id: 17,
          class_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          airline_id: 18,
          class_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          airline_id: 19,
          class_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          airline_id: 20,
          class_id: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ClassAirlines', null, {});
  },
};
