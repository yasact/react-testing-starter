import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import SearchBox from "../../src/components/SearchBox";

// 入力してenter押したらonChangeが呼ばれる
describe("SearchBox", () => {
  it("calls onChange when enter is pressed", async () => {
    const onChange = vi.fn();
    render(<SearchBox onChange={onChange} />);
    const input = screen.getByRole("textbox");
    const user = userEvent.setup();
    await user.type(input, "hello{enter}");
    expect(onChange).toHaveBeenCalledWith("hello");
  });
});
