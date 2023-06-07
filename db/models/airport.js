'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Airport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // relasi one-to-many -> flight
      Airport.hasMany(models.Flight, {
        foreignKey: 'departure_airport_id',
        as: 'flights_departure',
      });
      Airport.hasMany(models.Flight, {
        foreignKey: 'arrival_airport_id',
        as: 'flights_arrival',
      });
      Airport.hasMany(models.Flight, {
        foreignKey: 'transit_airport_id',
        as: 'flights_transit',
      });
    }
  }
  Airport.init(
    {
      name: DataTypes.STRING,
      continent: DataTypes.STRING,
      city: DataTypes.STRING,
      country: DataTypes.STRING,
      is_international: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Airport',
    }
  );
  return Airport;
};
