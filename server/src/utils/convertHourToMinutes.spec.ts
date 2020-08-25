import convertHourToMinutes from "./convertHourToMinutes";

describe('Convert hour in minutes', () => {
  test("should transform hour into 8:00 format in minutes", () => {
    expect(convertHourToMinutes('8:00')).toBe(480)
  });
})