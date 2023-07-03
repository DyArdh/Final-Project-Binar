const Joi = require('joi');
const { Notification } = require('../../db/models');

module.exports = {
  getNotifByUserId: async (userId, limit = 10) => {
    const notifications = await Notification.findAll({
      where: {
        user_id: userId,
      },
      limit,
      order: [['createdAt', 'DESC']],
    });
    return notifications;
  },
  createNotif: async (userId, data) => {
    const schema = Joi.object({
      title: Joi.string().required(),
      body: Joi.string().required(),
      notif_type: Joi.string().required(),
    });

    const { error, value } = schema.validate(data);

    if (error) {
      throw new Error(`Data tidak valid. Error: ${error.message}`);
    }

    // get value
    const { title, body, notif_type: notifType } = value;

    // store data
    const notification = await Notification.create({
      title,
      body,
      notif_type: notifType,
      is_read: false,
      user_id: userId,
    });

    return notification;
  },
  updateNotifByNotifId: async (notifId) => {
    const notif = await Notification.update({ is_read: true }, { where: { id: notifId } });

    if (notif[0] === 0) {
      return false;
    }

    return true;
  },
};
