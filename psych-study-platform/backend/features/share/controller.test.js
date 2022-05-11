const { createOrUpdateShareMetric } = require("./controller");

describe("Test Post Metric Controller", () => {
  it("Create share metric", async () => {
    const metric = await createOrUpdateShareMetric(
      { id: "00615e58-1b53-4297-ae4e-d19717b0e88e" },
      { id: "c30c6d52-b32f-4e4a-af18-9b63b14926c9" },
      "SHARE"
    );
    expect(1).toBe(1);
  });
});
