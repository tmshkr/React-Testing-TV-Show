import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "./App";
import { fetchShow as mockFetchShow } from "./api/fetchShow";
import { mockData } from "./data/mockData";

// mock the async function
jest.mock("./api/fetchShow");

it("displays a list of dropdown options when clicking on 'Select a season'", async () => {
  mockFetchShow.mockResolvedValueOnce(mockData);
  const { findByText } = render(<App />);
  const button = await findByText("Select a season");
  userEvent.click(button);
  await waitFor(() => {
    expect(
      document.querySelectorAll(".Dropdown-option").length
    ).toBeGreaterThan(0);
  });
});

it("displays a season's episodes after selecting a season", async () => {
  mockFetchShow.mockResolvedValueOnce(mockData);
  const { findByText } = render(<App />);
  const button = await findByText("Select a season");
  userEvent.click(button);
  await waitFor(() => {
    expect(
      document.querySelectorAll(".Dropdown-option").length
    ).toBeGreaterThan(0);
  });

  const seasonButton = await findByText("Season 1");
  userEvent.click(seasonButton);

  await waitFor(() => {
    expect(document.querySelectorAll(".episode").length).toBeGreaterThan(0);
  });
});
