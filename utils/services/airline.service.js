const { Airline } = require('../../db/models');

module.exports = {
  getAirlines: async () => {
    const airlines = await Airline.findAll({
      attributes: ['name', 'logo_url', 'airline_code'],
    });
    return airlines;
  },

  getAirline: async (id) => {
    const airline = await Airline.findOne(
      {
        attributes: ['name', 'logo_url', 'airline_code'],
      },
      { where: { id } },
    );

    return airline;
  },
};
