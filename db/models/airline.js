'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Airline extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // relasi one-to-many -> flight
      Airline.hasMany(models.Flight, { foreignKey: 'airline_id', as: 'flights' });
    }
  }
  Airline.init(
    {
      name: DataTypes.STRING,
      logo_url: DataTypes.STRING,
      airline_code: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Airline',
    }
  );
  return Airline;
};
