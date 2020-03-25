import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "./App";
import { fetchShow as mockFetchShow } from "./api/fetchShow";
import { mockData } from "./data/mockData";

// mock the async function
jest.mock("./api/fetchShow");
mockFetchShow.mockResolvedValue(mockData);

it("displays a list of dropdown options when clicking on 'Select a season'", async () => {
  const { findByText } = render(<App />);
  userEvent.click(await findByText("Select a season"));
  await waitFor(() => {
    expect(document.querySelectorAll(".Dropdown-option").length).toBe(4);
  });
});

it("displays a season's episodes after selecting a season", async () => {
  const { findByText } = render(<App />);
  userEvent.click(await findByText("Select a season"));
  await waitFor(() => {
    expect(
      document.querySelectorAll(".Dropdown-option").length
    ).toBeGreaterThan(0);
  });

  userEvent.click(await findByText("Season 1"));

  await waitFor(() => {
    expect(document.querySelectorAll(".episode").length).toBe(8);
  });
});

it("changes a season's episodes after selecting a new season", async () => {
  const { findByText } = render(<App />);
  userEvent.click(await findByText("Select a season"));
  await waitFor(() => {
    expect(document.querySelectorAll(".Dropdown-option").length).toBe(4);
  });

  userEvent.click(await findByText("Season 1"));

  await waitFor(() => {
    expect(document.querySelectorAll(".episode").length).toBe(8);
  });

  userEvent.click(await findByText("Season 1"));
  userEvent.click(await findByText("Season 4"));

  await waitFor(() => {
    expect(document.querySelectorAll(".episode").length).toBe(1);
  });
});
