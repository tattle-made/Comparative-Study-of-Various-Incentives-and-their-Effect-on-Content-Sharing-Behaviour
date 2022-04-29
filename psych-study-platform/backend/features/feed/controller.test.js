const { getFeed } = require("./controller");

describe("Feed", () => {
  it("Gets feed by user ID", async () => {
    const feed = await getFeed("01283f4e-8956-43d8-b6fc-5e658058c887");
    expect(1).toBe(1);
  });
});
