"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsToMany(models.Feed, { through: models.JunctionPostFeed });
      Post.hasMany(models.PostMetric, {
        foreignKey: "post",
      });
    }
  }
  Post.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      postNumber: DataTypes.INTEGER,
      informationType: DataTypes.ENUM(
        "PLAUSIBLE",
        "IMPLAUSIBLE",
        "TRUE",
        "FALSE",
        "WHOLESOME"
      ),
      headlineText: DataTypes.STRING,
      readMoreText: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
