// cache
const NodeCache = require('node-cache');

const cache = new NodeCache({ stdTTL: 259200 });

const { getAllClass } = require('../utils/services/class.service');

module.exports = {
  getAllClass: async (req, res, next) => {
    try {
      // setting cache
      const cachedData = cache.get(req.url);

      if (cachedData) {
        return res.status(200).json({
          status: true,
          message: 'success!',
          data: {
            classes: cachedData,
          },
        });
      }
      // set data to cache
      const classes = await getAllClass();
      cache.set(req.url, classes);

      return res.status(200).json({
        statu: true,
        message: 'success',
        data: { classes },
      });
    } catch (error) {
      next(error);
    }
    return null;
  },
};
