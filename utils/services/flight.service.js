/* eslint-disable camelcase */
const {
  Airline,
  Airport,
  Class,
  Flight,
  Information_Flight,
  Type_Flight,
} = require('../../db/models');

module.exports = {
  getFlights: async () => {
    const flights = await Flight.findAll({
      limit: 100,
      order: [['id', 'DESC']],
      include: [
        {
          model: Information_Flight,
          as: 'information_flight',
          attributes: ['baggage_capacity', 'cabin_capacity', 'flight_entertainment'],
        },
        {
          model: Type_Flight,
          as: 'type_flight',
          attributes: ['name', 'description'],
        },
        {
          model: Airline,
          as: 'airline',
          attributes: ['name', 'logo_url', 'airline_code'],
        },
        {
          model: Class,
          as: 'class',
          attributes: ['name', 'seat_capacity'],
        },
        {
          model: Airport,
          as: 'departure_airport',
          attributes: ['name', 'continent', 'airport_code', 'city', 'country'],
        },
        {
          model: Airport,
          as: 'arrival_airport',
          attributes: ['name', 'continent', 'airport_code', 'city', 'country'],
        },
      ],
    });

    return flights;
  },

  getFlightByFilter: async (from) => {
    const flights = await Flight.findAll({
      include: [
        {
          model: Information_Flight,
          as: 'information_flight',
          attributes: ['baggage_capacity', 'cabin_capacity', 'flight_entertainment'],
        },
        {
          model: Type_Flight,
          as: 'type_flight',
          attributes: ['name', 'description'],
        },
        {
          model: Airline,
          as: 'airline',
          attributes: ['name', 'logo_url', 'airline_code'],
        },
        {
          model: Class,
          as: 'class',
          attributes: ['name', 'seat_capacity'],
        },
        {
          model: Airport,
          as: 'departure_airport',
          attributes: ['name', 'continent', 'airport_code', 'city', 'country'],
          where: { name: from },
        },
        {
          model: Airport,
          as: 'arrival_airport',
          attributes: ['name', 'continent', 'airport_code', 'city', 'country'],
        },
      ],
    });

    return flights;
  },
};
