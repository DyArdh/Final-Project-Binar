'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Information_Flight extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // relasi one-to-many -> flight
      Information_Flight.hasMany(models.Flight, {
        foreignKey: 'information_flights_id',
        as: 'flight',
      });
    }
  }
  Information_Flight.init(
    {
      baggage_capacity: DataTypes.INTEGER,
      cabin_capacity: DataTypes.INTEGER,
      flight_entertaiment: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Information_Flight',
    }
  );
  return Information_Flight;
};
