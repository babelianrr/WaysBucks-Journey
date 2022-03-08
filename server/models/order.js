'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      order.belongsTo(models.beverage, {
        as: "beverages",
        foreignKey: {
          name: "beverageId",
        },
      })
      order.belongsTo(models.topping, {
        as: "toppings",
        foreignKey: {
          name: "toppingId",
        },
      })
      order.belongsTo(models.user, {
        as: "userOrder",
        foreignKey: {
          name: "userId",
        },
      })
    }
  };
  order.init({
    userId: DataTypes.INTEGER,
    beverageId: DataTypes.INTEGER,
    qty: DataTypes.INTEGER,
    toppingId: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return order;
};