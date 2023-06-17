const { getAllClass } = require('../utils/services/class.service');

module.exports = {
  getAllClass: async (req, res, next) => {
    try {
      const classes = await getAllClass();

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
