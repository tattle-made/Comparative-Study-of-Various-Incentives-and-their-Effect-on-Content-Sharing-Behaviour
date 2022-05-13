"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Metric extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Metric.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      type: DataTypes.ENUM("MONETARY", "VANITY"),
      user: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      points: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "Metric",
    }
  );
  return Metric;
};
