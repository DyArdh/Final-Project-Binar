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
          airline_code: 'GA - 301',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Garuda Indonesia',
          logo_url: 'https://ik.imagekit.io/c2q0mtcms/Final_Project/airlines/garuda-indonesia.png',
          airline_code: 'GA - 451',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Garuda Indonesia',
          logo_url: 'https://ik.imagekit.io/c2q0mtcms/Final_Project/airlines/garuda-indonesia.png',
          airline_code: 'GA - 125',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Garuda Indonesia',
          logo_url: 'https://ik.imagekit.io/c2q0mtcms/Final_Project/airlines/garuda-indonesia.png',
          airline_code: 'GA - 543',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Batik Air',
          logo_url: 'https://ik.imagekit.io/c2q0mtcms/Final_Project/airlines/batik-air.png',
          airline_code: 'BA - 432',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Batik Air',
          logo_url: 'https://ik.imagekit.io/c2q0mtcms/Final_Project/airlines/batik-air.png',
          airline_code: 'BA - 654',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Batik Air',
          logo_url: 'https://ik.imagekit.io/c2q0mtcms/Final_Project/airlines/batik-air.png',
          airline_code: 'BA - 876',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Batik Air',
          logo_url: 'https://ik.imagekit.io/c2q0mtcms/Final_Project/airlines/batik-air.png',
          airline_code: 'BA - 453',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Scoot',
          logo_url: 'https://ik.imagekit.io/c2q0mtcms/Final_Project/airlines/scoot.png',
          airline_code: 'TR - 654',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Scoot',
          logo_url: 'https://ik.imagekit.io/c2q0mtcms/Final_Project/airlines/scoot.png',
          airline_code: 'TR - 654',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Scoot',
          logo_url: 'https://ik.imagekit.io/c2q0mtcms/Final_Project/airlines/scoot.png',
          airline_code: 'TR - 395',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Scoot',
          logo_url: 'https://ik.imagekit.io/c2q0mtcms/Final_Project/airlines/scoot.png',
          airline_code: 'TR - 643',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Singapore Airlines',
          logo_url:
            'https://ik.imagekit.io/c2q0mtcms/Final_Project/airlines/singapore-airlines.png',
          airline_code: 'SQ - 546',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Singapore Airlines',
          logo_url:
            'https://ik.imagekit.io/c2q0mtcms/Final_Project/airlines/singapore-airlines.png',
          airline_code: 'SQ - 423',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Singapore Airlines',
          logo_url:
            'https://ik.imagekit.io/c2q0mtcms/Final_Project/airlines/singapore-airlines.png',
          airline_code: 'SQ - 857',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Singapore Airlines',
          logo_url:
            'https://ik.imagekit.io/c2q0mtcms/Final_Project/airlines/singapore-airlines.png',
          airline_code: 'SQ - 754',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Qatar Airways',
          logo_url: 'https://ik.imagekit.io/c2q0mtcms/Final_Project/airlines/qatar-airlines.png',
          airline_code: 'SQ - 214',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Qatar Airways',
          logo_url: 'https://ik.imagekit.io/c2q0mtcms/Final_Project/airlines/qatar-airlines.png',
          airline_code: 'SQ - 765',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Qatar Airways',
          logo_url: 'https://ik.imagekit.io/c2q0mtcms/Final_Project/airlines/qatar-airlines.png',
          airline_code: 'SQ - 836',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Qatar Airways',
          logo_url: 'https://ik.imagekit.io/c2q0mtcms/Final_Project/airlines/qatar-airlines.png',
          airline_code: 'SQ - 746',
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
