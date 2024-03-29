import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import TagList from "../../src/components/TagList";

describe("TagList", () => {
  it("should render tags", async () => {
    render(<TagList />);

    // const listItems = await screen.getAllByRole("listitem");
    const listItems = await screen.findAllByRole("listitem");
    expect(listItems.length).toBeGreaterThan(0);
  });
});
