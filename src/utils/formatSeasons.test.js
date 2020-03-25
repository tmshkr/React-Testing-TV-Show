import { formatSeasons } from "./formatSeasons";
import { mockData } from "../data/mockData";

it("returns an object", () => {
  expect(formatSeasons([])).toBeInstanceOf(Object);
});

const formatted = formatSeasons(mockData._embedded.episodes);

it("returns the correct number of seasons", () => {
  expect(Object.keys(formatted).length).toBe(4);
});

it("returns the correct number of episodes", () => {
  const numEpisodes = Object.values(formatted).reduce(
    (a, c) => a + c.length,
    0
  );
  expect(numEpisodes).toBe(26);
});
