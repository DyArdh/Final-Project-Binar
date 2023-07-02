// cache
const NodeCache = require('node-cache');

const cache = new NodeCache({ stdTTL: 259200 });

// require
const { getAirports } = require('../utils/services/airport.service');

module.exports = {
  index: async (req, res, next) => {
    try {
      // setting cache
      const cachedData = cache.get(req.url);

      if (cachedData) {
        return res.status(200).json({
          status: true,
          message: 'success!',
          data: { airports: cachedData },
        });
      }

      // set data to cache
      const airports = await getAirports();
      cache.set(req.url, airports);

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
