import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Toaster } from "react-hot-toast";
import ToastDemo from "../../src/components/ToastDemo";

describe("Toast Demo", () => {
  it("should render a toast", async () => {
    render(
      <div>
        <ToastDemo />
        <Toaster />
      </div>
    );
    const button = screen.getByRole("button");
    const user = userEvent.setup();
    await user.click(button);

    const toast = await screen.findByText(/success/i);
    expect(toast).toBeInTheDocument();
  });
});
