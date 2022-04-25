const { User } = require("../../sequelize/models");
const {
  createUser,
  loginUser,
  refreshToken,
  logoutUser,
} = require("./controller");
const {
  UserCreationError,
  IncorrectPasswordError,
  InvalidRefreshTokenError,
} = require("./errors");

describe("User Authentication", () => {
  beforeAll(() => {});

  afterAll(async () => {
    await User.destroy({
      where: {
        username: "test_user_a",
      },
    });
  });

  it("should create a new user", async () => {
    const user = await createUser({
      username: "test_user_a",
      password: "test_user_a_pw",
      role: "PARTICIPANT",
    });
    console.log(user.toJSON());
    expect(user.username).toBe("test_user_a");
    expect(typeof user.id).toBe("string");
  });

  it("should not create a new user with existing username", async () => {
    try {
      const user = await createUser({
        username: "test_user_a",
        password: "test_user_a_pw_2",
        role: "PARTICIPANT",
      });
    } catch (err) {
      expect(err instanceof UserCreationError).toBe(true);
    }
  });

  it("should generate and refresh tokens", async () => {
    const user = await loginUser({
      username: "test_user_a",
      password: "test_user_a_pw",
    });
    expect(user).toHaveProperty("role");
    expect(user).toHaveProperty("accessToken");
    expect(user).toHaveProperty("refreshToken");
    const refreshTokenVar = user.refreshToken;

    expect(async () => {
      await refreshToken("wrong_token");
    }).rejects.toThrowError(InvalidRefreshTokenError);

    const newToken = await refreshToken(refreshTokenVar);
    expect(newToken).toHaveProperty("accessToken");
    expect(newToken).not.toHaveProperty("refreshToken");
    expect(newToken.username).toBe("test_user_a");
  });

  it("should not allow login with wrong username,password", async () => {
    await expect(async () => {
      await loginUser({
        username: "test_user_a",
        password: "wrong_password",
      });
    }).rejects.toThrowError(IncorrectPasswordError);
  });

  it("logout should set refreshToken to null", async () => {
    const user = await User.findOne({
      where: {
        username: "test_user_a",
      },
    });
    const refreshToken = user.refreshToken;
    await logoutUser(refreshToken);
    const updatedUser = User.findOne({
      where: {
        username: "test_user_a",
      },
    });
    expect(updatedUser.refreshToken).toBe(undefined);
  });
});
