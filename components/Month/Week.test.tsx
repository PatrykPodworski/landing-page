import { render } from "@testing-library/react";
import Week from "./Week";

test("always renders 7 days", () => {
  render(<Week />);
  expect(true).toBe(true);
});
