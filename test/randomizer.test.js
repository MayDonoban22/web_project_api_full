const randomizer = require("../randomizer");

test("Genera números aleatorios entre 10 y 80 (no incluidos)", () => {
  expect(typeof randomizer()).toBe("number");
  expect(randomizer()).toBeGreaterThan(10);
  expect(randomizer()).toBeLessThan(80);
});