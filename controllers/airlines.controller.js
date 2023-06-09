const { getAirlines, getAirline } = require('../utils/services/airlines.service');

module.exports = {
  getAirlines: async (req, res, next) => {
    try {
      const airlines = await getAirlines();

      return res.status(200).json({
        status: true,
        message: 'success',
        data: { airlines },
      });
    } catch (error) {
      next(error);
    }
    return null;
  },

  getAirline: async (req, res, next) => {
    try {
      const { id } = req.params;

      const airline = await getAirline(id);

      return res.status(200).json({
        status: true,
        message: 'success',
        data: { airline },
      });
    } catch (error) {
      next(error);
    }
    return null;
  },
};
