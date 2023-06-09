const { Airline, Class } = require('../../db/models');

module.exports = {
  getAirlines: async () => {
    const airlines = await Airline.findAll({
      attributes: ['name', 'logo_url', 'airline_code'],
      include: [
        {
          model: Class,
          as: 'class',
          attributes: ['name', 'description', 'seat_capacity'],
          through: {
            attributes: [],
          },
        },
      ],
    });
    return airlines;
  },

  getAirline: async (id) => {
    const airline = await Airline.findOne(
      {
        attributes: ['name', 'logo_url', 'airline_code'],
        include: [
          {
            model: Class,
            as: 'airlines',
            attributes: ['name', 'description', 'seat_capacity'],
            through: {
              attributes: [],
            },
          },
        ],
      },
      { where: { id } },
    );

    return airline;
  },
};
