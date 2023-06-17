// cache
const NodeCache = require('node-cache');

const cache = new NodeCache({ stdTTL: 259200 });
const { getAirlines, getAirline } = require('../utils/services/airline.service');

module.exports = {
  getAirlines: async (req, res, next) => {
    try {
      // setting cache
      const cachedData = cache.get(req.url);

      if (cachedData) {
        return res.status(200).json({
          status: true,
          message: 'success!',
          data: {
            airlines: cachedData,
          },
        });
      }

      // set data to cache
      const airlines = await getAirlines();
      cache.set(req.url, airlines);

      return res.status(200).json({
        status: true,
        message: 'success!',
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
