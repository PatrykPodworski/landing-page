import { render, screen } from "@testing-library/react";
import Month from "./Month";

describe("renders correct number of weeks", () => {
  it.each([
    // [numberOfDays, startDay, expectedWeeks]
    [28, 0, 4],
    [28, 1, 5],
    [28, 6, 5],
    [29, 0, 5],
    [29, 6, 5],
    [30, 0, 5],
    [30, 5, 5],
    [30, 6, 6],
    [31, 0, 5],
    [31, 4, 5],
    [31, 5, 6],
    [31, 6, 6],
  ])(
    "when numberOfDays is %i and startDay is %i, renders %i weeks and correct number of days",
    (numberOfDays, startDay, expectedWeeks) => {
      render(<Month numberOfDays={numberOfDays} startDay={startDay} />);
      expect(screen.getAllByTestId("week").length).toBe(expectedWeeks);
      expect(
        screen
          .getAllByTestId("day")
          .filter((x) => !x.className.includes("invisible")).length
      ).toBe(numberOfDays);
    }
  );
});

describe("label the days correctly", () => {
  it.each([
    // [numberOfDays, startDay, expectedMin, expectedMax]
    [28, 0, 1, 28],
    [31, 6, 1, 31],
  ])(
    "when numberOfDays is %i and startDay is %i, renders days from %i to %i",
    (numberOfDays, startDay, expectedMin, expectedMax) => {
      render(<Month numberOfDays={numberOfDays} startDay={startDay} />);

      const days = screen
        .getAllByTestId("day")
        .filter((x) => !x.className.includes("invisible"));
      expect(days.at(0)?.textContent).toBe(expectedMin.toString());
      expect(days.at(-1)?.textContent).toBe(expectedMax.toString());
    }
  );
});
