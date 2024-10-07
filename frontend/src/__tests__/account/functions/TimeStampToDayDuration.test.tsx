import TimeStampToDayDuration from "../../../features/account/helpers/TimeStampToDayDuration";

describe("TimeStampToDayDuration", () => {
  it("should return a number", () => {
    let start = new Date("2024/09/15");
    let end = new Date("2024/09/16");
    expect(typeof TimeStampToDayDuration(start, end)).toBe("number");
  });

  it("inversed dates should return a positive number", () => {
    let start = new Date("2024/09/18");
    let end = new Date("2024/09/16");
    expect(TimeStampToDayDuration(start, end)).toBeGreaterThan(0);
  });

  it("returns more than 0 days", () => {
    let start = new Date("2024/09/15");
    let end = new Date("2024/09/15");
    expect(TimeStampToDayDuration(start, end)).toBeGreaterThan(0);
  });

  it("returns 3 days", () => {
    let start = new Date("2024/09/15");
    let end = new Date("2024/09/18");
    expect(TimeStampToDayDuration(start, end)).toBe(3);
  });
});
