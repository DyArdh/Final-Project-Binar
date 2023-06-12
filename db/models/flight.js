'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Flight extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // relasi one-to-many -> booking
      Flight.hasMany(models.Booking, { foreignKey: 'flight_id', as: 'bookings' });

      // relasi one-to-one -> type_flight
      Flight.belongsTo(models.Type_Flight, { foreignKey: 'type_flight_id', as: 'type_flight' });

      // relasi one-to-many -> information_flight
      Flight.belongsTo(models.Information_Flight, {
        foreignKey: 'information_flights_id',
        as: 'information_flight',
      });

      // relasi one-to-many -> airline
      Flight.belongsTo(models.Airline, {
        foreignKey: 'airline_id',
        as: 'airline',
      });

      // relasi one-to-many -> airport
      Flight.belongsTo(models.Airport, {
        foreignKey: 'departure_airport_code',
        as: 'departure_airport',
      });
      Flight.belongsTo(models.Airport, {
        foreignKey: 'arrival_airport_code',
        as: 'arrival_airport',
      });

      // relasi one-to-many(spesial) own
      Flight.belongsTo(models.Flight, { foreignKey: 'return_flight_id', as: 'return_flight' });

      // relasi one-to-one -> class
      Flight.belongsTo(models.Class, { foreignKey: 'class_id', as: 'class' });
    }
  }
  Flight.init(
    {
      departure_time: DataTypes.TIME,
      arrival_time: DataTypes.TIME,
      departure_date: DataTypes.DATEONLY,
      arrival_date: DataTypes.DATEONLY,
      price: DataTypes.INTEGER,
      flight_number: DataTypes.STRING,
      class_id: DataTypes.INTEGER,
      duration: DataTypes.STRING,
      airline_id: DataTypes.INTEGER,
      departure_airport_code: DataTypes.STRING,
      arrival_airport_code: DataTypes.STRING,
      return_flight_id: DataTypes.INTEGER,
      information_flights_id: DataTypes.INTEGER,
      type_flight_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Flight',
    }
  );
  return Flight;
};
