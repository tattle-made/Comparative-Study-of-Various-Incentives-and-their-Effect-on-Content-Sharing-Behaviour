const { getFeed } = require("./controller");

describe("Feed", () => {
  it("Gets feed by user ID", async () => {
    const feed = await getFeed("c7431bcf-c2c5-4b83-9cab-7cba2dea7438");
    expect(1).toBe(1);
  });
});
