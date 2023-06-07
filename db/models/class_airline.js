'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Class_Airline extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Class_Airline.init(
    {
      class_id: DataTypes.INTEGER,
      airline_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Class_Airline',
    }
  );
  return Class_Airline;
};
