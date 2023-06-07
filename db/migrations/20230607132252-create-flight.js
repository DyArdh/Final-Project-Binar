'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Flights', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      schedule_departure: {
        type: Sequelize.DATE
      },
      schedule_arrive: {
        type: Sequelize.DATE
      },
      price: {
        type: Sequelize.INTEGER
      },
      departure_terminal: {
        type: Sequelize.STRING
      },
      flight_number: {
        type: Sequelize.STRING
      },
      duration: {
        type: Sequelize.INTEGER
      },
      airline_id: {
        type: Sequelize.INTEGER
      },
      departure_airport_id: {
        type: Sequelize.INTEGER
      },
      arrival_airport_id: {
        type: Sequelize.INTEGER
      },
      transit_airport_id: {
        type: Sequelize.INTEGER
      },
      return_flight_id: {
        type: Sequelize.INTEGER
      },
      information_flights_id: {
        type: Sequelize.INTEGER
      },
      type_flight_id: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Flights');
  }
};