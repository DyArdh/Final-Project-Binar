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
        },
        {
          name: 'Garuda Indonesia',
          logo_url: 'https://ik.imagekit.io/c2q0mtcms/Final_Project/airlines/garuda-indonesia.png',
          airline_code: 'GA - 451',
        },
        {
          name: 'Garuda Indonesia',
          logo_url: 'https://ik.imagekit.io/c2q0mtcms/Final_Project/airlines/garuda-indonesia.png',
          airline_code: 'GA - 125',
        },
        {
          name: 'Garuda Indonesia',
          logo_url: 'https://ik.imagekit.io/c2q0mtcms/Final_Project/airlines/garuda-indonesia.png',
          airline_code: 'GA - 543',
        },
        {
          name: 'Batik Air',
          logo_url: 'https://ik.imagekit.io/c2q0mtcms/Final_Project/airlines/batik-air.png',
          airline_code: 'BA - 432',
        },
        {
          name: 'Batik Air',
          logo_url: 'https://ik.imagekit.io/c2q0mtcms/Final_Project/airlines/batik-air.png',
          airline_code: 'BA - 654',
        },
        {
          name: 'Batik Air',
          logo_url: 'https://ik.imagekit.io/c2q0mtcms/Final_Project/airlines/batik-air.png',
          airline_code: 'BA - 876',
        },
        {
          name: 'Batik Air',
          logo_url: 'https://ik.imagekit.io/c2q0mtcms/Final_Project/airlines/batik-air.png',
          airline_code: 'BA - 453',
        },
        {
          name: 'Scoot',
          logo_url: 'https://ik.imagekit.io/c2q0mtcms/Final_Project/airlines/scoot.png',
          airline_code: 'TR - 654',
        },
        {
          name: 'Scoot',
          logo_url: 'https://ik.imagekit.io/c2q0mtcms/Final_Project/airlines/scoot.png',
          airline_code: 'TR - 654',
        },
        {
          name: 'Scoot',
          logo_url: 'https://ik.imagekit.io/c2q0mtcms/Final_Project/airlines/scoot.png',
          airline_code: 'TR - 395',
        },
        {
          name: 'Scoot',
          logo_url: 'https://ik.imagekit.io/c2q0mtcms/Final_Project/airlines/scoot.png',
          airline_code: 'TR - 643',
        },
        {
          name: 'Singapore Airlines',
          logo_url:
            'https://ik.imagekit.io/c2q0mtcms/Final_Project/airlines/singapore-airlines.png',
          airline_code: 'SQ - 546',
        },
        {
          name: 'Singapore Airlines',
          logo_url:
            'https://ik.imagekit.io/c2q0mtcms/Final_Project/airlines/singapore-airlines.png',
          airline_code: 'SQ - 423',
        },
        {
          name: 'Singapore Airlines',
          logo_url:
            'https://ik.imagekit.io/c2q0mtcms/Final_Project/airlines/singapore-airlines.png',
          airline_code: 'SQ - 857',
        },
        {
          name: 'Singapore Airlines',
          logo_url:
            'https://ik.imagekit.io/c2q0mtcms/Final_Project/airlines/singapore-airlines.png',
          airline_code: 'SQ - 754',
        },
        {
          name: 'Qatar Airways',
          logo_url: 'https://ik.imagekit.io/c2q0mtcms/Final_Project/airlines/qatar-airlines.png',
          airline_code: 'SQ - 214',
        },
        {
          name: 'Qatar Airways',
          logo_url: 'https://ik.imagekit.io/c2q0mtcms/Final_Project/airlines/qatar-airlines.png',
          airline_code: 'SQ - 765',
        },
        {
          name: 'Qatar Airways',
          logo_url: 'https://ik.imagekit.io/c2q0mtcms/Final_Project/airlines/qatar-airlines.png',
          airline_code: 'SQ - 836',
        },
        {
          name: 'Qatar Airways',
          logo_url: 'https://ik.imagekit.io/c2q0mtcms/Final_Project/airlines/qatar-airlines.png',
          airline_code: 'SQ - 746',
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Airlines', null, {});
  },
};
