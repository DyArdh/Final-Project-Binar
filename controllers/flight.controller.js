const { getFlightByFilter } = require('../utils/services/flight.service');
const flightSchema = require('../utils/validations/flight.schema');

module.exports = {
  getFlightByFilter: async (req, res, next) => {
    try {
      const { sort, type } = req.query;
      const { error, value } = flightSchema.validate(req.body);

      if (error) {
        return res.status(400).json({
          status: false,
          message: error.details[0].message,
          data: null,
        });
      }

      const filter = await getFlightByFilter(value, sort, type);

      return res.status(200).json({
        status: true,
        message: 'success',
        data: { filter },
      });
    } catch (error) {
      next(error);
    }
    return null;
  },
};
