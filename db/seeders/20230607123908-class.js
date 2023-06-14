'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // setup data
    const classesRaw = require('./data/classes.json');
    const classes = classesRaw.map((classData) => {
      return {
        ...classData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });
    await queryInterface.bulkInsert('Classes', classes, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Classes', null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  },
};
