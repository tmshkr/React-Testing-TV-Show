import React from "react";
import { render } from "@testing-library/react";

import Episodes from "./Episodes";
import { formatSeasons } from "../utils/formatSeasons";
import { mockData } from "../data/mockData";

it("renders without crashing", () => {
  render(<Episodes episodes={[]} />);
});

const formattedSeasons = formatSeasons(mockData._embedded.episodes);

it("renders a season of episodes", () => {
  render(<Episodes episodes={formattedSeasons["Season 1"]} />);
  expect(document.querySelectorAll(".episode").length).toBe(8);
});

it("parses the episodes' summaries", () => {
  render(<Episodes episodes={formattedSeasons["Season 1"]} />);
  expect(
    document.querySelectorAll(".episode > .episode-info > p:nth-of-type(2)")
      .length
  ).toBe(8);
});
