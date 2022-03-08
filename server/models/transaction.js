'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      transaction.belongsTo(models.beverage, {
        as: "beverages",
        foreignKey: {
          name: "beverageId",
        },
      })
      transaction.belongsTo(models.topping, {
        as: "toppings",
        foreignKey: {
          name: "toppingId",
        },
      })
      transaction.belongsTo(models.user, {
        as: "userOrder",
        foreignKey: {
          name: "userId",
        },
      })
    }
  }
  transaction.init({
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.TEXT,
    postal: DataTypes.STRING,
    status: DataTypes.STRING,
    beverageId: DataTypes.INTEGER,
    qty: DataTypes.INTEGER,
    toppingId: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'transaction',
  });
  return transaction;
};