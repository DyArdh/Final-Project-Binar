const { getFlights } = require('../utils/services/flight.service');

module.exports = {
  getFlights: async (req, res, next) => {
    try {
      const flights = await getFlights();

      return res.status(200).json({
        status: true,
        message: 'success',
        data: { flights },
      });
    } catch (error) {
      next(error);
    }
    return null;
  },
};
