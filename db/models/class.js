'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Class extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // relasi one-to-one -> flight
      Class.hasOne(models.Flight, { foreignKey: 'class_id', as: 'flight' });
    }
  }
  Class.init(
    {
      name: DataTypes.STRING,
      seat_capacity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Class',
    }
  );
  return Class;
};
