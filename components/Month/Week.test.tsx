import { render, screen } from "@testing-library/react";
import Week from "./Week";
import expectToThrow from "@/utils/expectToThrow";

describe("always renders 7 days", () => {
  it.each([
    [0, 0],
    [6, 6],
    [0, 6],
    [1, 6],
    [0, 3],
  ])("when startDay is %i and endDay is %i", (startDay, endDay) => {
    render(<Week startDay={startDay} endDay={endDay} />);
    expect(screen.getAllByTestId("day").length).toBe(7);
  });
});

describe("throws error when startDay is greater than endDay", () => {
  it.each([
    [1, 0],
    [2, 1],
    [3, 2],
    [4, 3],
    [5, 4],
    [6, 5],
  ])("when startDay is %i and endDay is %i", (startDay, endDay) => {
    expectToThrow(() => {
      render(<Week startDay={startDay} endDay={endDay} />);
    });
  });
});
