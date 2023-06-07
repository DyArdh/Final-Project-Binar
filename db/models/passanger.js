'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Passanger extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // relasi one-to-many -> booking
      Passanger.belongsTo(models.Booking, { foreignKey: 'booking_id', as: 'booking' });
    }
  }
  Passanger.init(
    {
      name: DataTypes.STRING,
      surname: DataTypes.STRING,
      gender: DataTypes.BOOLEAN,
      valid_until: DataTypes.DATE,
      country_publication: DataTypes.STRING,
      ktp_passport: DataTypes.STRING,
      citizenship: DataTypes.STRING,
      bod: DataTypes.DATE,
      passanger_type: DataTypes.STRING,
      seat: DataTypes.STRING,
      booking_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Passanger',
    }
  );
  return Passanger;
};
