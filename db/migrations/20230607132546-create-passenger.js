'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Passengers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      surname: {
        type: Sequelize.STRING,
      },
      gender: {
        type: Sequelize.BOOLEAN,
      },
      valid_until: {
        type: Sequelize.DATE,
      },
      country_publication: {
        type: Sequelize.STRING,
      },
      ktp_passport: {
        type: Sequelize.STRING,
      },
      citizenship: {
        type: Sequelize.STRING,
      },
      bod: {
        type: Sequelize.DATE,
      },
      passenger_type: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      seat: {
        type: Sequelize.STRING,
      },
      booking_code: {
        allowNull: false,
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('Passengers');
  },
};
