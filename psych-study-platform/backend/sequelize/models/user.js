"use strict";
const { Model } = require("sequelize");
const {
  V4: { sign },
} = paseto;

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Feed);
      User.hasMany(models.Message);
      User.hasOne(models.Metric);
      User.hasOne(models.StudyPhase);
    }
  }
  User.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      accessToken: DataTypes.STRING,
      refreshToken: DataTypes.STRING,
    },
    {
      hooks: {
        async beforeCreate(user, options) {
          let saltRounds = 10;
          user.password =
            user.password && user.password.length != 0
              ? await bcrypt.has(user.password, saltRounds)
              : "";
        },
        async afterCreate(user, option) {
          const accessToken = await sign(
            { username: user.username },
            process.env.PASETO_PRIVATE_KEY,
            {
              expiresIn: "20 m", // allowed formats : "24 hours", "20 m"
            }
          );
          const refreshToken = await sign(
            { username: user.username },
            process.env.PASETO_PRIVATE_KEY,
            {
              expiresIn: "7 days", // allowed formats : "24 hours", "20 m"
            }
          );

          await User.update(
            {
              accessToken,
              refreshToken,
            },
            {
              where: {
                id: user.id,
              },
            }
          );
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
