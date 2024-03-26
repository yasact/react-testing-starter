import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import TermsAndConditions from "../../src/components/TermsAndConditions";

describe("TermsAndConditions", () => {
  it("should render with correct text ", () => {
    render(<TermsAndConditions />);
    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Terms & Conditions");

    const checkBox = screen.getByRole("checkbox");
    expect(checkBox).toBeInTheDocument();
    expect(checkBox).not.toBeChecked();

    const button = screen.getByRole("button", { name: /submit/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/submit/i);
    expect(button).toBeDisabled();
  });
  it("should enable the button when the checkbox is checked", async () => {
    render(<TermsAndConditions />);
    const checkBox = screen.getByRole("checkbox");
    const user = userEvent.setup();
    await user.click(checkBox);

    expect(screen.getByRole("button")).toBeEnabled();
  });
});
