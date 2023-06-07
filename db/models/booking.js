'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // relasi one-to-many -> booking
      Booking.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });

      // relasi one-to-many -> passanger
      Booking.hasMany(models.Passanger, { foreignKey: 'booking_id', as: 'passangers' });

      // relasi one-to-many -> flight
      Booking.belongsTo(models.Flight, { foreignKey: 'flight_id', as: 'flight' });
    }
  }
  Booking.init(
    {
      status: DataTypes.STRING,
      class: DataTypes.STRING,
      payment_status: DataTypes.BOOLEAN,
      total_price: DataTypes.INTEGER,
      exp: DataTypes.DATE,
      flight_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Booking',
    }
  );
  return Booking;
};
