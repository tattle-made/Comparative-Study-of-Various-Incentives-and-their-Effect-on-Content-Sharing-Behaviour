"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PostMetric extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PostMetric.init(
    {
      id: {
        primaryKey: true,
        unique: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      user: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      post: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: DataTypes.STRING,
      value: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "PostMetric",
    }
  );
  return PostMetric;
};
