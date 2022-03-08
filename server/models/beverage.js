'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class beverage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      beverage.hasMany(models.transaction, {
        as: "beverages",
        foreignKey: {
          name: "beverageId",
        },
      })
    }
  }
  beverage.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'beverage',
  });
  return beverage;
};