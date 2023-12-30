import { render, screen } from "@testing-library/react";
import Week from "./Week";

test("always renders 7 days", () => {
  render(<Week />);
  expect(screen.getAllByRole("button").length).toBe(7);
});
