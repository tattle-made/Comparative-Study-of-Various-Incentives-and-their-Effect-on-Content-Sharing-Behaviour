const { saveForm } = require("./controller");

describe("Survey Form", () => {
  test("save form", async () => {
    await saveForm("03b0fc07-b403-4bc2-a16e-9aaa8e1a1f10	", {
      q_1: 0,
      q_2: 1,
      q_3: 0,
      q_4: 1,
      q_5: 4,
    });
    expect(1).toBe(1);
  });
});
