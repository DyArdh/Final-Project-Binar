'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Type_Flight extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // relasi one-to-one -> flight
      Type_Flight.hasOne(models.Flight, { foreignKey: 'type_flight_id', as: 'flight' });
    }
  }
  Type_Flight.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Type_Flight',
    }
  );
  return Type_Flight;
};
