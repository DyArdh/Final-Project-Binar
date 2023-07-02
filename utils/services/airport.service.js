const { Airport } = require('../../db/models');

module.exports = {
  getAirports: async () => {
    const airports = await Airport.findAll({
      attributes: ['airport_code', 'name', 'city', 'continent', 'country', 'is_international'],
    });

    return airports;
  },
};
