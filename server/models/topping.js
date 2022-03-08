'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class topping extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      topping.hasMany(models.transaction, {
        as: "toppings",
        foreignKey: {
          name: "toppingId",
        },
      })
    }
  }
  topping.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'topping',
  });
  return topping;
};