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

      // relasi one-to-many -> passenger
      Booking.hasMany(models.Passenger, { foreignKey: 'booking_code', as: 'passengers' });

      // relasi one-to-many -> flight
      Booking.belongsTo(models.Flight, { foreignKey: 'flight_id', as: 'flight' });
    }
  }
  Booking.init(
    {
      booking_code: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      status: DataTypes.STRING,
      payment_status: DataTypes.BOOLEAN,
      tax: DataTypes.INTEGER,
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
