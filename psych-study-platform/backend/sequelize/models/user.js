"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Feed, {
        foreignKey: "user",
      });
      User.hasMany(models.Message, {
        foreignKey: "user",
      });
      User.hasOne(models.Metric, {
        foreignKey: "user",
      });
      User.hasMany(models.StudyPhase, {
        foreignKey: "user",
      });
      User.hasOne(models.PostMetric, {
        foreignKey: "user",
      });
    }
  }
  User.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: DataTypes.STRING,
      role: DataTypes.ENUM("PARTICIPANT", "MANAGER"),
      refreshToken: DataTypes.STRING,
    },
    {
      hooks: {
        async beforeCreate(user, options) {
          let saltRounds = 10;
          user.password =
            user.password && user.password.length != 0
              ? await bcrypt.hash(user.password, saltRounds)
              : "";
        },
      },
      sequelize,
      modelName: "User",
    }
  );

  User.makeBareBones = (userId) => {
    return {
      id: userId,
    };
  };

  return User;
};
