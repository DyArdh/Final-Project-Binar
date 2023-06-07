'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // relasi one-to-many -> User
      Notification.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    }
  }
  Notification.init(
    {
      title: DataTypes.STRING,
      body: DataTypes.STRING,
      notif_type: DataTypes.STRING,
      is_read: DataTypes.BOOLEAN,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Notification',
    }
  );
  return Notification;
};
