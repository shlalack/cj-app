import { getValueType } from "./helpers";

test("gets number type from integer", () => {
  expect(getValueType("0")).toBe("number");
  expect(getValueType("13456")).toBe("number");
});

test("gets number type from float", () => {
  expect(getValueType("13.456")).toBe("number");
  expect(getValueType("0.456")).toBe("number");
  expect(getValueType("0.456")).toBe("number");
});
test("gets string type from strings", () => {
  expect(getValueType("a0ann\n uu1")).toBe("string");
  expect(getValueType("a0ann\n uu1")).toBe("string");
  expect(getValueType("001h")).toBe("string");
  expect(getValueType("0.1a")).toBe("string");
  expect(getValueType("0_")).toBe("string");
  expect(getValueType("1_0")).toBe("string");
});
