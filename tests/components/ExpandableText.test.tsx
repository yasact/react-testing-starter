import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import ExpandableText from "../../src/components/ExpandableText";

// 入力文字が255より小さい場合は、そのまま表示する
// 入力文字が256以上の場合は、255文字まで表示して、Show Moreボタンを表示する

describe("ExpandableText", () => {
  //   const limit = 255;
  //   const longText = "a".repeat(limit + 1);
  //   const truncatedText = longText.substring(0, limit) + "...";
  const limit = 255;
  const longText = "a".repeat(limit + 1);
  const truncatedText = longText.substring(0, limit) + "...";
  it("should render text when text is less than 255 characters", () => {
    render(<ExpandableText text="Hello, World!" />);
    screen.debug();
    const article = screen.getByRole("article");
    expect(article).toBeInTheDocument();
    expect(article).toHaveTextContent(/Hello, World!/i);
  });
  it("should Show more button when text is more than 255 characters", () => {
    render(<ExpandableText text={longText} />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/Show More/i);
  });
  //   入力文字が256文字以上で、ボタンがあって、ボタンをクリックしたら、全文が表示される
  it("should show full text when Show More button is clicked", async () => {
    render(<ExpandableText text={longText} />);
    const button = screen.getByRole("button");
    const user = userEvent.setup();
    await user.click(button);

    expect(screen.getByText(longText)).toBeInTheDocument();
    expect(button).toHaveTextContent(/Show Less/i);
  });
  // show lessボタンをクリックしたら、255文字までになる
  it("should show 255 characters when Show Less button is clicked", async () => {
    render(<ExpandableText text={longText} />);
    const showMoreButton = screen.getByRole("button", { name: /more/i });
    const user = userEvent.setup();
    await user.click(showMoreButton);

    const showLessButton = screen.getByRole("button", { name: /less/i });
    await user.click(showLessButton);

    expect(screen.getByText(truncatedText)).toBeInTheDocument();

    expect(showMoreButton).toHaveTextContent(/more/i);
  });
});
