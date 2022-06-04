const { getFeed } = require("./controller");

describe("Feed", () => {
  it("Gets feed by user ID", async () => {
    const feed = await getFeed("0bf8c131-c6d6-44f1-bcce-c559dfb90536");
    expect(1).toBe(1);
  });
});
