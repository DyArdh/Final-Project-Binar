'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // setup data
    const informationsRaw = require('./data/informastionFlights.json');
    const informations = informationsRaw.map((information) => {
      return {
        ...information,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    await queryInterface.bulkInsert('Information_Flights', informations, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Information_Flights', null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  },
};
