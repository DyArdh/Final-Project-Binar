'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Passenger extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // relasi one-to-many -> booking
      Passenger.belongsTo(models.Booking, { foreignKey: 'booking_code', as: 'booking' });
    }
  }
  Passenger.init(
    {
      name: DataTypes.STRING,
      surname: DataTypes.STRING,
      gender: DataTypes.BOOLEAN,
      valid_until: DataTypes.DATE,
      country_publication: DataTypes.STRING,
      ktp_passport: DataTypes.STRING,
      citizenship: DataTypes.STRING,
      bod: DataTypes.DATE,
      passenger_type: DataTypes.STRING,
      seat: DataTypes.STRING,
      booking_code: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Passenger',
    }
  );
  return Passenger;
};
