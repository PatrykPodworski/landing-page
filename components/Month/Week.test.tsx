import { render, screen } from "@testing-library/react";
import Week from "./Week";

describe("always renders 7 days", () => {
  it.each([
    [0, 0, 0],
    [6, 6, 6],
    [0, 6, 3],
    [1, 6, 1],
    [0, 3, 0],
  ])(
    "when startDay is %i and endDay is %i, activeDay is %i",
    (startDay, endDay, activeDay) => {
      render(
        <Week startDay={startDay} endDay={endDay} activeDay={activeDay} />
      );
      expect(screen.getAllByTestId("day").length).toBe(7);
    }
  );
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
    expect(() => {
      render(<Week startDay={startDay} endDay={endDay} />);
    }).toThrow();
  });
});

describe("throws error when activeDay is not between startDay and endDay", () => {
  it.each([
    [0, 5, 6],
    [1, 6, 0],
  ])(
    "when startDay is %i, endDay is %i, and activeDay is %i",
    (startDay, endDay, activeDay) => {
      expect(() => {
        render(
          <Week startDay={startDay} endDay={endDay} activeDay={activeDay} />
        );
      }).toThrow();
    }
  );
});
