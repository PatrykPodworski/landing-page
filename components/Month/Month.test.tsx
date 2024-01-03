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
