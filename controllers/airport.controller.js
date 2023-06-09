// require
const { getAirports } = require('../utils/services/airport.service');

module.exports = {
  index: async (req, res, next) => {
    try {
      const airports = await getAirports();

      return res.status(200).json({
        status: true,
        message: 'success!',
        data: {
          airports,
        },
      });
    } catch (error) {
      next(error);
    }
    return null;
  },
};
