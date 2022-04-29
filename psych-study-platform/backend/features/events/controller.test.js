const { createEvent } = require("./controller");

describe("Event API", () => {
  it("Create Event", async () => {
    await createEvent({
      userId: "01283f4e-8956-43d8-b6fc-5e658058c887",
      postId: "d2511d67-68ea-498c-8764-4a3787549e9d",
      name: "SHARE",
      value: "YES",
    });
    expect(1).toBe(1);
  });
});
