'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Airlines',
      [
        {
          name: 'Garuda Indonesia',
          logo_url: 'https://ik.imagekit.io/c2q0mtcms/Final_Project/airlines/garuda-indonesia.png',
          airline_code: 'GA',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Batik Air',
          logo_url: 'https://ik.imagekit.io/c2q0mtcms/Final_Project/airlines/batik-air.png',
          airline_code: 'BA',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Scoot',
          logo_url: 'https://ik.imagekit.io/c2q0mtcms/Final_Project/airlines/scoot.png',
          airline_code: 'TR',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Singapore Airlines',
          logo_url:
            'https://ik.imagekit.io/c2q0mtcms/Final_Project/airlines/singapore-airlines.png',
          airline_code: 'SQ',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Qatar Airways',
          logo_url: 'https://ik.imagekit.io/c2q0mtcms/Final_Project/airlines/qatar-airlines.png',
          airline_code: 'QR',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Airlines', null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  },
};
