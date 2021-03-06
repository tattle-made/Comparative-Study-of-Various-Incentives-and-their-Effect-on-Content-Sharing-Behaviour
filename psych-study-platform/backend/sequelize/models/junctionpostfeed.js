"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class JunctionPostFeed extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  JunctionPostFeed.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      postId: {
        type: DataTypes.UUID,
        references: {
          model: "Post",
          key: "id",
        },
      },
      feedId: {
        type: DataTypes.UUID,
        references: {
          model: "Feed",
          key: "id",
        },
      },
      order: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "JunctionPostFeed",
    }
  );
  return JunctionPostFeed;
};
