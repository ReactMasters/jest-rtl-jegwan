import data from "./lib/data";

beforeEach(() => {
  data.users.push(
    { id: 1, email: "user1@test.com" },
    { id: 2, email: "user2@test.com" },
    { id: 3, email: "user3@test.com" }
  );
});

afterEach(() => {
  data.users.splice(0);
});

test("spyon", () => {
  const calculator = {
    add: (a: number, b: number) => a + b,
  };

  const spyFn = jest.spyOn(calculator, "add");

  const result = calculator.add(2, 3);

  expect(spyFn).toBeCalledTimes(1);
  expect(spyFn).toBeCalledWith(2, 3);
  expect(result).toBe(5);
});
