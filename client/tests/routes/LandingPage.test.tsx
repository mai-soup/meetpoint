import React from "react";
import { render, screen } from "@testing-library/react";
import LandingPage from "../../src/routes/LandingPage";

test("renders HEYO text", () => {
  render(<LandingPage />);
  const heyoTextElement = screen.getByText(/HEYO/i);
  expect(heyoTextElement).toBeInTheDocument();
});
