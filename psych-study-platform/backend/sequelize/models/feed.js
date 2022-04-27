"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Feed extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Feed.belongsTo(models.User);
      Feed.belongsToMany(models.Post, { through: models.JunctionPostFeed });
    }
  }
  Feed.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      user: {
        type: DataTypes.STRING,
      },
      visited: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Feed",
    }
  );
  return Feed;
};
