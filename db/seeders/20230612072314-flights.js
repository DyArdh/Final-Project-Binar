'use strict';
const randomString = require('randomstring');
const moment = require('moment');
const momentRandom = require('moment-random');

const { Airline } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const generateFlight = async (
      depatureAirport,
      arrivalAirport,
      departureTerminal,
      duration,
      price,
      flightInformation,
      classId,
      flightType
    ) => {
      const randomDate = momentRandom(20230801, 20230706);
      const flightDuration = moment.duration(duration, 'minutes');
      const getAirlines = await Airline.findAll();
      const randomAirline = getAirlines[Math.floor(Math.random() * getAirlines.length)];

      const data = {
        departure_time: moment(randomDate).format('HH:mm'),
        arrival_time: moment(randomDate).add(duration, 'minutes').format('HH:mm'),
        departure_date: moment(randomDate).format('YYYY-MM-DD'),
        arrival_date: moment(randomDate).add(duration, 'minutes').format('YYYY-MM-DD'),
        price: price,
        departure_terminal: departureTerminal,
        flight_number: `${randomAirline.airline_code} - ${randomString.generate({
          length: 3,
          charset: 'numeric',
        })}`,
        class_id: classId,
        duration: `${flightDuration.hours()}:${flightDuration.minutes()}:${flightDuration.milliseconds()}`,
        airline_id: randomAirline.id,
        departure_airport_code: depatureAirport,
        arrival_airport_code: arrivalAirport,
        information_flights_id: flightInformation,
        type_flight_id: flightType,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      return data;
    };

    const flight = [];

    for (let i = 0; i < 5; i++) {
      flight.push(await generateFlight('CGK', 'DPS', 'Terminal 1A', 110, 712000, 1, 1, 1));
      flight.push(await generateFlight('CGK', 'DPS', 'Terminal 1A', 110, 2653700, 1, 3, 1));
      flight.push(await generateFlight('CGK', 'DPS', 'Terminal 1A', 110, 12148500, 1, 4, 1));
      flight.push(await generateFlight('CGK', 'SUB', 'Terminal 1A', 85, 761800, 1, 1, 1));
      flight.push(await generateFlight('CGK', 'SUB', 'Terminal 1A', 90, 1800000, 1, 3, 1));
      flight.push(await generateFlight('CGK', 'SIN', 'Terminal 1A', 105, 1022500, 1, 1, 1));
      flight.push(await generateFlight('CGK', 'HND', 'Terminal 1A', 445, 9843300, 1, 1, 1));
      flight.push(await generateFlight('CGK', 'DXB', 'Terminal 1A', 1090, 12289000, 1, 1, 1));
      flight.push(await generateFlight('CGK', 'DRW', 'Terminal 1A', 1400, 25809400, 1, 1, 1));
      flight.push(await generateFlight('CGK', 'CAN', 'Terminal 1A', 925, 2015000, 1, 1, 1));
    }

    await queryInterface.bulkInsert('Flights', flight);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Flights', null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  },
};
