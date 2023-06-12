'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // relasi one-to-many -> notification
      User.hasMany(models.Notification, { foreignKey: 'user_id', as: 'notifications' });

      // relasi one-to-many -> reset_password
      User.hasMany(models.Reset_Password, { foreignKey: 'user_id', as: 'reset_password_tokens' });

      // relasi one-to-many -> booking
      User.hasMany(models.Booking, { foreignKey: 'user_id', as: 'bookings' });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      surname: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: DataTypes.STRING,
      phone: {
        type: DataTypes.STRING,
        unique: true,
      },
      otp: DataTypes.INTEGER,
      is_active: DataTypes.BOOLEAN,
      is_google: DataTypes.BOOLEAN,
      activation_exp: DataTypes.DATE,
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
