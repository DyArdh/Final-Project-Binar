/* eslint-disable camelcase */
const { getNotifByUserId, updateNotifByNotifId } = require('../utils/services/notif.service');

module.exports = {
  index: async (req, res, next) => {
    try {
      const { user } = req;
      const notifications = await getNotifByUserId(user.id);

      return res.status(200).json({
        status: true,
        message: 'success!',
        data: { notifications },
      });
    } catch (error) {
      next(error);
    }
    return null;
  },
  update: async (req, res, next) => {
    try {
      const { notif_id } = req.params;

      const updated = await updateNotifByNotifId(notif_id);
      if (!updated) {
        return res.status(404).json({
          status: false,
          message: `notif with id ${notif_id} is does't exist!`,
          data: null,
        });
      }

      return res.status(200).json({
        status: true,
        message: 'success',
        data: null,
      });
    } catch (error) {
      next(error);
    }
    return null;
  },
};
