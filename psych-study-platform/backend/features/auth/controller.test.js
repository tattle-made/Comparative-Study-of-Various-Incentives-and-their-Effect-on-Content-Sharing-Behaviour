const { User, sequelize } = require("../../sequelize/models");
const { createUser, loginUser } = require("./controller");
const { UserCreationError, IncorrectPasswordError } = require("./errors");

/**
 * This script requires you to run the seeder script
 * run  : npx sequelize-cli db:seed --name SCRIPT_NAME
 * before running the test suite
 **/
describe("User Authentication", () => {
  beforeAll(() => {});

  afterAll(() => {});

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

  it("should login a user and return accessToken", async () => {
    const user = await loginUser({
      username: "test_user_a",
      password: "test_user_a_pw",
    });
    expect(user).toHaveProperty("accessToken");
  });

  it("should not allow login with wrong username,password", async () => {
    const user = await loginUser({
      username: "test_user_a",
      password: "wrong_password",
    });
    expect(() => {}).toThrow(IncorrectPasswordError);
  });

  //   it("should refresh token",  () => {});

  //   it("should logout user",  () => {});
});
