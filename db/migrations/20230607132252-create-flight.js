'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Flights', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      departure_time: {
        type: Sequelize.TIME,
      },
      arrival_time: {
        type: Sequelize.TIME,
      },
      departure_date: {
        type: Sequelize.DATEONLY,
      },
      arrival_date: {
        type: Sequelize.DATEONLY,
      },
      price: {
        type: Sequelize.INTEGER,
      },
      departure_terminal: {
        type: Sequelize.STRING,
      },
      flight_number: {
        type: Sequelize.STRING,
      },
      class_id: {
        type: Sequelize.INTEGER,
      },
      duration: {
        type: Sequelize.STRING,
      },
      airline_id: {
        type: Sequelize.INTEGER,
      },
      departure_airport_code: {
        type: Sequelize.STRING,
      },
      arrival_airport_code: {
        type: Sequelize.STRING,
      },
      return_flight_id: {
        type: Sequelize.INTEGER,
      },
      information_flights_id: {
        type: Sequelize.INTEGER,
      },
      type_flight_id: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Flights');
  },
};
