/* eslint-disable camelcase */
const { Op } = require('sequelize');
const { User, Reset_Password } = require('../../db/models');

module.exports = {
  getUserByEmail: async (email) => {
    const user = await User.findOne({
      attributes: [
        'id',
        'name',
        'email',
        'is_active',
        'is_google',
        'otp',
        'phone',
        'role',
        'activation_exp',
      ],
      where: { email },
    });

    return user;
  },

  getUserById: async (id) => {
    const user = await User.findOne({
      attributes: [
        'id',
        'name',
        'email',
        'is_active',
        'is_google',
        'otp',
        'phone',
        'role',
        'activation_exp',
      ],
      where: { id },
    });

    return user;
  },

  createUser: async (data) => {
    const user = await User.create(data);

    return user;
  },

  updateUserByEmail: async (email, data) => {
    await User.update(data, { where: { email } });

    return true;
  },

  getUserByEmailOrPhone: async (emailOrPhone) => {
    const user = await User.findOne({
      attributes: ['id', 'name', 'email', 'is_active', 'is_google', 'phone', 'role', 'password'],
      where: {
        [Op.or]: [{ email: emailOrPhone }, { phone: emailOrPhone }],
      },
    });

    return user;
  },
  getUserByEmailAndPhone: async (email, phone) => {
    const user = await User.findOne({
      attributes: ['id', 'name', 'email', 'is_active', 'is_google', 'phone', 'role'],
      where: {
        [Op.or]: [{ email }, { phone }],
      },
    });

    return user;
  },

  createResetToken: async (userId, token, exp) => {
    const resetToken = await Reset_Password.create({
      token,
      user_id: userId,
      exp,
    });

    return resetToken;
  },

  getResetToken: async (userId) => {
    const resetToken = await Reset_Password.findOne({
      where: {
        user_id: userId,
      },
      order: [['createdAt', 'DESC']],
    });

    return resetToken;
  },
};
