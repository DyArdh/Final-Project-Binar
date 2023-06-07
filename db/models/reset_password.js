'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reset_Password extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // relasi one-to-many -> user
      Reset_Password.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    }
  }
  Reset_Password.init(
    {
      token: DataTypes.STRING,
      exp: DataTypes.DATE,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Reset_Password',
    }
  );
  return Reset_Password;
};
